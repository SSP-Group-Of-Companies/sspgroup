"use client";

/**
 * Catches fatal errors raised above every route layout (including failures in
 * the root layout itself). Must render a full <html>/<body> tree because it
 * replaces the root layout when it mounts.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          minHeight: "100dvh",
          margin: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          background: "linear-gradient(180deg, #f5f7fa 0%, #ffffff 60%, #ffffff 100%)",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
          color: "rgba(12, 23, 38, 0.94)",
        }}
      >
        <main
          role="main"
          style={{
            width: "100%",
            maxWidth: "560px",
            background: "#ffffff",
            border: "1px solid rgba(15, 23, 42, 0.08)",
            borderRadius: "28px",
            padding: "40px 32px",
            boxShadow: "0 1px 3px rgba(15, 23, 42, 0.06), 0 12px 48px rgba(15, 23, 42, 0.04)",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#64748b",
            }}
          >
            SSP Group — System error
          </p>
          <h1
            style={{
              margin: "12px 0 0",
              fontSize: "1.6rem",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              fontWeight: 600,
              color: "#0f172a",
            }}
          >
            Something went wrong on our end.
          </h1>
          <p
            style={{
              margin: "14px 0 0",
              fontSize: "15px",
              lineHeight: 1.75,
              color: "#475569",
            }}
          >
            We&rsquo;ve logged the issue and our team will look into it. In the meantime, you can
            try again or return to the homepage.
          </p>

          {error?.digest ? (
            <p
              style={{
                margin: "12px 0 0",
                fontSize: "12px",
                color: "#94a3b8",
              }}
            >
              Reference:{" "}
              <span
                style={{
                  fontFamily:
                    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                }}
              >
                {error.digest}
              </span>
            </p>
          ) : null}

          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "28px" }}>
            <button
              type="button"
              onClick={() => reset()}
              style={{
                display: "inline-flex",
                height: "44px",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 20px",
                borderRadius: "12px",
                border: 0,
                background: "#0f172a",
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            {/*
              Intentionally a plain button with window.location instead of
              <Link />: global-error replaces the root layout, so the Next.js
              client router isn't guaranteed to be mounted. A full navigation is
              the safe fallback.
            */}
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") window.location.href = "/";
              }}
              style={{
                display: "inline-flex",
                height: "44px",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 20px",
                borderRadius: "12px",
                border: "1px solid rgba(15, 23, 42, 0.12)",
                background: "#ffffff",
                color: "#334155",
                fontSize: "14px",
                fontWeight: 600,
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              Go to homepage
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
