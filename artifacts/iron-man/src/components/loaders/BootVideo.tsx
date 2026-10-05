import { useEffect, useRef } from "react";
import { LOADER_CONFIG } from "@/config/loader";

type Props = {
  active: boolean;
  onProgress: (progress: number) => void;
  onComplete: () => void;
};

export function BootVideo({ active, onProgress, onComplete }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const completedRef = useRef(false);
  const fallbackRef = useRef<number | null>(null);

  const finishVideo = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    onProgress(1);
    onComplete();
  };

  useEffect(() => {
    if (!active) return;
    const video = videoRef.current;
    if (!video) return;
    completedRef.current = false;
    video.currentTime = 0;
    const completionFallback = window.setTimeout(
      finishVideo,
      LOADER_CONFIG.videoDurationMs + LOADER_CONFIG.videoCompletionGraceMs,
    );
    void video.play().catch(() => {
      fallbackRef.current = window.setTimeout(finishVideo, 900);
    });
    return () => {
      window.clearTimeout(completionFallback);
      if (fallbackRef.current !== null) window.clearTimeout(fallbackRef.current);
    };
  }, [active]);

  if (!active) return null;

  return (
    <video
      ref={videoRef}
      className="global-loader__video"
      src={LOADER_CONFIG.videoPath}
      autoPlay
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      onTimeUpdate={(event) => {
        const video = event.currentTarget;
        if (video.duration > 0) {
          const progress = video.currentTime / video.duration;
          onProgress(progress);
        }
      }}
      onLoadedMetadata={(event) => {
        const video = event.currentTarget;
        if (video.duration > 0) onProgress(0);
      }}
      onEnded={finishVideo}
      onError={() => {
        onProgress(0.18);
        fallbackRef.current = window.setTimeout(() => {
          onProgress(1);
          finishVideo();
        }, 900);
      }}
    />
  );
}
