import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { LOADER_CONFIG, type LoaderStatus } from "@/config/loader";

type LoaderContextValue = {
  isAppReady: boolean;
  isInitialBoot: boolean;
  isLoaderVisible: boolean;
  /** Whether the boot video should play (false on desktop) */
  shouldPlayBootVideo: boolean;
  progress: number;
  status: LoaderStatus;
  startLoading: (reason?: string) => void;
  finishLoading: () => void;
  completeBootVideo: () => void;
  markLoadingReady: (source: string) => void;
  reportLoadingProgress: (source: string, progress: number) => void;
};

const LoaderContext = createContext<LoaderContextValue | null>(null);

function isHardRefresh() {
  try {
    const navigation = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    return navigation?.type === "reload";
  } catch {
    return false;
  }
}

function hasCompletedBoot() {
  try {
    return sessionStorage.getItem(LOADER_CONFIG.sessionStorageKey) === "1";
  } catch {
    return false;
  }
}

/** Desktop = fine pointer, no touch, not coarse */
function detectIsDesktop(): boolean {
  if (typeof window === "undefined") return true;
  const fine = window.matchMedia("(pointer: fine)").matches;
  const noTouch = !("ontouchstart" in window) && navigator.maxTouchPoints === 0;
  return fine && noTouch;
}

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [isDesktop] = useState(() => detectIsDesktop());
  const [isInitialBoot] = useState(
    () => isHardRefresh() || !hasCompletedBoot(),
  );
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoComplete, setVideoComplete] = useState(false);
  const [miniElapsed, setMiniElapsed] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);
  const [manualLoading, setManualLoading] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);
  const [resourceProgress, setResourceProgress] = useState<Record<string, number>>(
    {},
  );
  const [readySources, setReadySources] = useState<Record<string, boolean>>({});
  const manualLoadingTimerRef = useRef<number | null>(null);

  /** On desktop, boot video is disabled — treat as already complete */
  const shouldPlayBootVideo = !isDesktop;

  const reportLoadingProgress = useCallback((source: string, progress: number) => {
    const nextProgress = Math.min(1, Math.max(0, progress));
    setResourceProgress((current) => {
      const previous = current[source];
      if (
        previous !== undefined &&
        nextProgress !== 0 &&
        nextProgress !== 1 &&
        Math.abs(previous - nextProgress) < 0.02
      ) {
        return current;
      }
      return { ...current, [source]: nextProgress };
    });
  }, []);

  const reportProgress = useCallback(
    (source: string, nextProgress: number) => {
      if (isInitialBoot && source === "boot-video") {
        setVideoProgress(nextProgress);
      }
      reportLoadingProgress(source, nextProgress);
    },
    [isInitialBoot, reportLoadingProgress],
  );

  const completeBoot = useCallback(() => {
    try {
      sessionStorage.setItem(LOADER_CONFIG.sessionStorageKey, "1");
    } catch {
      // The loader still completes when storage is unavailable.
    }
    setIsAppReady(true);
  }, []);

  const completeBootVideo = useCallback(() => {
    setVideoComplete(true);
    reportProgress("boot-video", 1);
  }, [reportProgress]);

  const markLoadingReady = useCallback((source: string) => {
    setReadySources((current) => {
      if (current[source]) return current;
      return { ...current, [source]: true };
    });
  }, []);

  const heroReady = Boolean(readySources["hero-frames"]);

  const resourceReady = LOADER_CONFIG.requiredResources.every(
    (source) => readySources[source],
  );

  // Mini loader timer (non-initial boot)
  useEffect(() => {
    if (isInitialBoot) return;
    const timer = window.setTimeout(
      () => setMiniElapsed(true),
      LOADER_CONFIG.miniDurationMs,
    );
    return () => window.clearTimeout(timer);
  }, [isInitialBoot]);

  // Status rotation
  useEffect(() => {
    if (isAppReady) return;
    const timer = window.setInterval(
      () => setStatusIndex((index) => (index + 1) % LOADER_CONFIG.statuses.length),
      LOADER_CONFIG.statusIntervalMs,
    );
    return () => window.clearInterval(timer);
  }, [isAppReady]);

  // Desktop initial boot: reveal immediately (or very briefly) — no video wait
  useEffect(() => {
    if (isAppReady) return;

    if (isDesktop && isInitialBoot) {
      // Desktop: reveal after hero frames are ready (or after a short grace period)
      if (heroReady) {
        const timer = window.setTimeout(
          completeBoot,
          LOADER_CONFIG.miniRevealDurationMs,
        );
        return () => window.clearTimeout(timer);
      }
      // Fallback: reveal after a short delay even if hero isn't ready yet
      const fallback = window.setTimeout(completeBoot, 800);
      return () => window.clearTimeout(fallback);
    }

    if (!isDesktop && isInitialBoot) {
      // Mobile/touch: wait for video + hero frames
      const canReveal = videoComplete && heroReady;
      if (canReveal) {
        const timer = window.setTimeout(
          completeBoot,
          LOADER_CONFIG.revealDurationMs,
        );
        return () => window.clearTimeout(timer);
      }
      return undefined;
    }

    // Non-initial boot (return visit): use mini loader
    if (miniElapsed) {
      const timer = window.setTimeout(
        completeBoot,
        LOADER_CONFIG.miniRevealDurationMs,
      );
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [
    completeBoot,
    heroReady,
    isDesktop,
    isInitialBoot,
    miniElapsed,
    videoComplete,
    isAppReady,
  ]);

  const startLoading = useCallback((reason?: string) => {
    void reason;
    if (manualLoadingTimerRef.current !== null) {
      window.clearTimeout(manualLoadingTimerRef.current);
    }
    manualLoadingTimerRef.current = window.setTimeout(
      () => setManualLoading(true),
      LOADER_CONFIG.delayedLoaderMs,
    );
  }, []);

  const finishLoading = useCallback(() => {
    if (manualLoadingTimerRef.current !== null) {
      window.clearTimeout(manualLoadingTimerRef.current);
      manualLoadingTimerRef.current = null;
    }
    setManualLoading(false);
  }, []);

  useEffect(
    () => () => {
      if (manualLoadingTimerRef.current !== null) {
        window.clearTimeout(manualLoadingTimerRef.current);
      }
    },
    [],
  );

  const progress = useMemo(() => {
    const values = Object.values(resourceProgress);
    const resources = values.length
      ? values.reduce((sum, value) => sum + value, 0) / values.length
      : 0;

    // Desktop: no video progress component
    if (isDesktop) {
      return Math.min(0.99, resources);
    }
    // Mobile/touch with video
    return isInitialBoot
      ? Math.min(0.99, videoProgress * 0.72 + resources * 0.28)
      : Math.min(0.99, resources);
  }, [isDesktop, isInitialBoot, resourceProgress, videoProgress]);

  const value = useMemo<LoaderContextValue>(
    () => ({
      isAppReady,
      isInitialBoot,
      isLoaderVisible: !isAppReady || manualLoading,
      shouldPlayBootVideo,
      progress,
      status: LOADER_CONFIG.statuses[statusIndex],
      startLoading,
      finishLoading,
      completeBootVideo,
      markLoadingReady,
      reportLoadingProgress: reportProgress,
    }),
    [
      completeBootVideo,
      finishLoading,
      isAppReady,
      isInitialBoot,
      markLoadingReady,
      manualLoading,
      progress,
      reportProgress,
      shouldPlayBootVideo,
      startLoading,
      statusIndex,
    ],
  );

  return (
    <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>
  );
}

export function useLoader() {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader must be used inside LoaderProvider");
  }
  return context;
}

export function useLoadingReporter(source: string) {
  const { reportLoadingProgress } = useLoader();
  return useCallback(
    (progress: number) => reportLoadingProgress(source, progress),
    [reportLoadingProgress, source],
  );
}

export function useLoadingReady(source: string) {
  const { markLoadingReady } = useLoader();
  return useCallback(() => markLoadingReady(source), [markLoadingReady, source]);
}
