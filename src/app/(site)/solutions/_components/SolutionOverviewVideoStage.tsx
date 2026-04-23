"use client";

import dynamic from "next/dynamic";
import * as React from "react";
import type { SolutionVideoAsset } from "@/config/solutionPages";
import type { APITypes, PlyrOptions, PlyrSource } from "plyr-react";
import styles from "./SolutionOverviewVideoStage.module.css";

const Plyr = dynamic(() => import("plyr-react").then((mod) => mod.Plyr), {
  ssr: false,
});

type SolutionOverviewVideoStageProps = {
  video: SolutionVideoAsset;
};

const PLAYER_OPTIONS: PlyrOptions = {
  controls: [
    "progress",
    "play",
    "current-time",
    "duration",
    "rewind",
    "fast-forward",
    "mute",
    "volume",
    "fullscreen",
  ],
  seekTime: 10,
  clickToPlay: true,
  resetOnEnd: false,
  hideControls: true,
  keyboard: { focused: true, global: false },
  tooltips: { controls: false, seek: true },
  fullscreen: {
    enabled: true,
    fallback: true,
    iosNative: true,
  },
};

function getStageVideo(root: HTMLElement | null): HTMLVideoElement | null {
  const el = root?.querySelector("video");
  return el instanceof HTMLVideoElement ? el : null;
}

export function SolutionOverviewVideoStage({
  video,
}: SolutionOverviewVideoStageProps) {
  const stageRef = React.useRef<HTMLDivElement | null>(null);
  const playerRef = React.useRef<APITypes | null>(null);
  const lastVideoSrcRef = React.useRef<string | null>(null);
  const [hasMounted, setHasMounted] = React.useState(false);
  const [playerReady, setPlayerReady] = React.useState(false);
  const [pendingPlay, setPendingPlay] = React.useState(false);
  const [hasStartedPlayback, setHasStartedPlayback] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  /**
   * Plyr mounts the `<video>` asynchronously after dynamic import + first paint.
   * A single rAF often runs before the element exists, so `playerReady` never
   * flipped true and play was deferred to an effect — outside the user gesture,
   * which browsers block. We poll until the video exists, then listen for readiness.
   */
  React.useEffect(() => {
    if (!hasMounted) return;

    if (lastVideoSrcRef.current !== video.src) {
      lastVideoSrcRef.current = video.src;
      setPlayerReady(false);
      setPendingPlay(false);
      setHasStartedPlayback(false);
    }

    let cancelled = false;
    let rafId = 0;
    let mediaCleanup: (() => void) | undefined;

    const attachWhenFound = () => {
      if (cancelled) return;

      const media = getStageVideo(stageRef.current);
      if (!media) {
        rafId = window.requestAnimationFrame(attachWhenFound);
        return;
      }

      const handleReady = () => {
        if (!cancelled) setPlayerReady(true);
      };

      if (media.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        handleReady();
      }

      media.addEventListener("loadeddata", handleReady);
      media.addEventListener("canplay", handleReady);

      mediaCleanup = () => {
        media.removeEventListener("loadeddata", handleReady);
        media.removeEventListener("canplay", handleReady);
      };
    };

    rafId = window.requestAnimationFrame(attachWhenFound);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(rafId);
      mediaCleanup?.();
    };
  }, [hasMounted, video.src]);

  React.useEffect(() => {
    if (!pendingPlay || !playerReady) return;

    const player = playerRef.current?.plyr;
    if (!player) return;

    setHasStartedPlayback(true);
    void player.play();
    setPendingPlay(false);
  }, [pendingPlay, playerReady]);

  const source = React.useMemo<PlyrSource>(
    () => ({
      type: "video",
      title: video.title,
      poster: video.posterSrc,
      sources: [
        {
          src: video.src,
          type: "video/mp4",
        },
      ],
    }),
    [video.posterSrc, video.src, video.title],
  );

  const showPosterShell = !hasStartedPlayback;

  const handlePosterPlayClick = React.useCallback(() => {
    const media = getStageVideo(stageRef.current);

    if (media) {
      setHasStartedPlayback(true);
      void media.play().catch(() => {
        setHasStartedPlayback(false);
        setPendingPlay(true);
      });
      void playerRef.current?.plyr?.play();
      return;
    }

    setPendingPlay(true);
  }, []);

  return (
    <div ref={stageRef} className={styles.stage}>
      {hasMounted ? (
        <div className={styles.playerShell}>
          <Plyr
            ref={playerRef}
            source={source}
            options={PLAYER_OPTIONS}
            playsInline
            preload="metadata"
            onPlay={() => {
              setHasStartedPlayback(true);
            }}
          />
        </div>
      ) : null}

      <div
        className={`${styles.posterShell} ${showPosterShell ? "" : styles.posterShellHidden}`}
        style={
          video.posterSrc
            ? { backgroundImage: `url("${video.posterSrc}")` }
            : undefined
        }
        aria-hidden={!showPosterShell}
      >
        <div className={styles.posterDimmer} />
        <button
          type="button"
          onClick={handlePosterPlayClick}
          className={styles.posterPlayButton}
          aria-label={`Play ${video.title}`}
        >
          <span className={styles.posterPlayIcon} />
        </button>
      </div>
    </div>
  );
}
