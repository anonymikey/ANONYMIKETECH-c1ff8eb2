export const LOADER_CONFIG = {
  videoPath: "/boot-sequence.mp4",
  videoDurationMs: 5000,
  videoCompletionGraceMs: 450,
  requiredResources: ["hero-frames", "cinematic-frames"] as const,
  miniDurationMs: 1100,
  miniRevealDurationMs: 320,
  revealDurationMs: 850,
  delayedLoaderMs: 250,
  statusIntervalMs: 1150,
  sessionStorageKey: "anonymiketech.boot.completed",
  statuses: [
    "SYSTEM INITIALIZING",
    "LOADING UI ENGINE",
    "CONNECTING SYNTH AI",
    "VERIFYING MODULES",
    "LOADING SERVICES",
    "INITIALIZING CLOUD CORE",
    "PREPARING PORTFOLIO",
    "SYSTEM ONLINE",
  ],
} as const;

export type LoaderStatus = (typeof LOADER_CONFIG.statuses)[number];