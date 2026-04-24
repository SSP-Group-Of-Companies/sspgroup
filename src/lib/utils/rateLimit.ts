// src/lib/utils/rateLimit.ts
import "server-only";

/**
 * In-process sliding-window rate limiter.
 *
 * Trade-offs (read before tuning):
 * - State lives inside a single lambda/container instance. On Vercel, concurrent
 *   invocations run on separate instances, so each gets its own counter. This
 *   means a distributed flood across many instances can still exceed the limit,
 *   but any *single* abusive client hammering the same warm instance will be
 *   throttled. Combined with Cloudflare Turnstile in front of every public
 *   submit, this is a meaningful defense-in-depth layer.
 * - For true global rate limiting across every region/instance, migrate the
 *   `RateLimiter` class to a Redis-backed implementation (e.g. @upstash/redis)
 *   with identical method signatures — only the storage changes.
 *
 * Usage:
 *   const limiter = getLimiter("contact-submit", { limit: 5, windowMs: 60_000 });
 *   const { ok, retryAfterSeconds } = limiter.check(ip);
 */

type Bucket = {
  /** Monotonic timestamps (ms since epoch) of hits inside the active window. */
  timestamps: number[];
  /** Soft LRU marker used to prune the oldest bucket when `maxKeys` is exceeded. */
  lastTouched: number;
};

export type RateLimitOptions = {
  /** Maximum number of requests allowed per key inside `windowMs`. */
  limit: number;
  /** Rolling window length in milliseconds. */
  windowMs: number;
  /**
   * Maximum number of distinct keys (IPs) tracked. When exceeded, the
   * least-recently-touched bucket is evicted. Protects against memory growth
   * from keys with long TTLs.
   */
  maxKeys?: number;
};

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  limit: number;
  /**
   * Seconds the client should wait before retrying. 0 when `ok === true`.
   * Useful for `Retry-After` response headers.
   */
  retryAfterSeconds: number;
};

const DEFAULT_MAX_KEYS = 5_000;

class RateLimiter {
  private readonly buckets = new Map<string, Bucket>();
  private readonly limit: number;
  private readonly windowMs: number;
  private readonly maxKeys: number;

  constructor(options: RateLimitOptions) {
    this.limit = Math.max(1, options.limit);
    this.windowMs = Math.max(1_000, options.windowMs);
    this.maxKeys = Math.max(100, options.maxKeys ?? DEFAULT_MAX_KEYS);
  }

  check(key: string): RateLimitResult {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    const existing = this.buckets.get(key);
    const timestamps = (existing?.timestamps ?? []).filter((t) => t > windowStart);

    if (timestamps.length >= this.limit) {
      // Reinsert so this key stays "recent" for LRU eviction, but reject.
      this.buckets.set(key, { timestamps, lastTouched: now });
      const oldest = timestamps[0] ?? now;
      const retryAfterMs = Math.max(0, this.windowMs - (now - oldest));
      return {
        ok: false,
        remaining: 0,
        limit: this.limit,
        retryAfterSeconds: Math.ceil(retryAfterMs / 1000),
      };
    }

    timestamps.push(now);
    this.buckets.set(key, { timestamps, lastTouched: now });

    if (this.buckets.size > this.maxKeys) {
      this.evictOldest();
    }

    return {
      ok: true,
      remaining: Math.max(0, this.limit - timestamps.length),
      limit: this.limit,
      retryAfterSeconds: 0,
    };
  }

  private evictOldest() {
    let oldestKey: string | null = null;
    let oldestTs = Number.POSITIVE_INFINITY;
    for (const [k, v] of this.buckets) {
      if (v.lastTouched < oldestTs) {
        oldestTs = v.lastTouched;
        oldestKey = k;
      }
    }
    if (oldestKey) this.buckets.delete(oldestKey);
  }
}

/* ────────────────────────── Shared instances ─────────────────────────── */

const limiters = new Map<string, RateLimiter>();

/**
 * Returns a process-wide limiter for the given name. Subsequent calls with the
 * same name reuse the same instance (config from the first call wins).
 */
export function getLimiter(name: string, options: RateLimitOptions): RateLimiter {
  let existing = limiters.get(name);
  if (!existing) {
    existing = new RateLimiter(options);
    limiters.set(name, existing);
  }
  return existing;
}

/**
 * Resolves the request's originating IP from common edge/proxy headers.
 * Falls back to "unknown" when nothing is available — which then becomes a
 * shared bucket for all anonymous requests (acceptable because it's rare and
 * still throttles anonymous bursts).
 */
export function getClientIp(headers: Headers): string {
  const cf = headers.get("cf-connecting-ip");
  if (cf) return cf.trim();

  const vercelForwarded = headers.get("x-real-ip");
  if (vercelForwarded) return vercelForwarded.trim();

  const xff = headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }

  return "unknown";
}

/**
 * Convenience helper: check a limiter and build the response payload expected
 * by route handlers. Returns `null` when the request is allowed.
 */
export function enforceRateLimit(
  name: string,
  options: RateLimitOptions,
  headers: Headers,
): { retryAfterSeconds: number } | null {
  const limiter = getLimiter(name, options);
  const key = getClientIp(headers);
  const result = limiter.check(key);
  if (result.ok) return null;
  return { retryAfterSeconds: result.retryAfterSeconds };
}
