import { useCallback, useEffect, useRef, useState } from "react";
import { BrandMark } from "@/components/ui/Logo";
import { useLoader } from "@/components/loaders/LoaderProvider";
import "./page-transition.css";

type TransitionPhase = "idle" | "exiting" | "entering";
type TransitionKind = "section" | "route";
type Direction = "forward" | "back";

type TransitionState = {
  phase: TransitionPhase;
  kind: TransitionKind;
  direction: Direction;
  label: string;
};

type HistoryState = {
  __anonymiketechIndex?: number;
};

type NavigationDetail = {
  kind: "push";
  url: string;
  index: number;
};

type ScrollToDetail = {
  top: number;
  immediate?: boolean;
};

const HISTORY_KEY = "__anonymiketechIndex";
const NAVIGATION_EVENT = "anonymiketech:navigation";
const SCROLL_STORAGE_KEY = "anonymiketech.scroll.positions";
const EXIT_DURATION = 150;
const DURATIONS: Record<TransitionKind, number> = {
  section: 280,
  route: 460,
};

function wait(duration: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, duration));
}

function getIndex(state: HistoryState | null) {
  return typeof state?.[HISTORY_KEY] === "number" ? state[HISTORY_KEY] : 0;
}

function getTransitionKind(url: URL) {
  return url.pathname === window.location.pathname ? "section" : "route";
}

function getDirection(nextIndex: number, currentIndex: number): Direction {
  return nextIndex >= currentIndex ? "forward" : "back";
}

function isInternalAnchor(anchor: HTMLAnchorElement) {
  return (
    anchor.origin === window.location.origin &&
    !anchor.hasAttribute("download") &&
    anchor.target !== "_blank" &&
    !anchor.pathname.startsWith("/api/")
  );
}

function readScrollPositions() {
  try {
    return JSON.parse(
      sessionStorage.getItem(SCROLL_STORAGE_KEY) ?? "{}",
    ) as Record<string, number>;
  } catch {
    return {};
  }
}

function saveScrollPosition(url: string, top: number) {
  try {
    const positions = readScrollPositions();
    positions[url] = top;
    sessionStorage.setItem(
      SCROLL_STORAGE_KEY,
      JSON.stringify(Object.fromEntries(Object.entries(positions).slice(-20))),
    );
  } catch {
    // Scroll restoration remains best-effort when storage is unavailable.
  }
}

function getSavedScrollPosition(url: string) {
  return readScrollPositions()[url];
}

function scrollToPosition(top: number, immediate = true) {
  window.dispatchEvent(
    new CustomEvent<ScrollToDetail>("anonymiketech:scroll-to", {
      detail: { top, immediate },
    }),
  );
}

function scrollToHash(hash: string) {
  if (!hash) {
    scrollToPosition(0);
    return;
  }
  const id = decodeURIComponent(hash.slice(1));
  const element = document.getElementById(id);
  if (element) {
    const top = element.getBoundingClientRect().top + window.scrollY;
    scrollToPosition(Math.max(0, top - 16), false);
  }
}

async function prefetchRoute(url: URL) {
  if (url.origin !== window.location.origin || url.pathname === window.location.pathname) {
    return;
  }

  const href = url.href;
  const existing = document.querySelector<HTMLLinkElement>(
    `link[rel="prefetch"][href="${CSS.escape(href)}"]`,
  );
  if (existing) return;

  const link = document.createElement("link");
  link.rel = "prefetch";
  link.as = "document";
  link.href = href;
  document.head.appendChild(link);

  try {
    await fetch(href, {
      credentials: "same-origin",
      headers: { Purpose: "prefetch" },
      cache: "force-cache",
    });
  } catch {
    // Navigation still proceeds when a prefetch is unavailable.
  }
}

function TransitionOverlay({ transition }: { transition: TransitionState }) {
  return (
    <div
      className={`page-transition__overlay page-transition__overlay--${transition.phase}`}
      aria-hidden="true"
    >
      <div className="page-transition__grid" />
      <div className="page-transition__scanline" />
      <div className="page-transition__bloom" />
      <div className="page-transition__hud page-transition__hud--top">
        <span>ANONYMIKETECH // TRANSIT</span>
        <span>{transition.direction === "forward" ? "ASCEND" : "RETURN"}</span>
      </div>
      <div className="page-transition__core">
        <span className="page-transition__ring page-transition__ring--outer" />
        <span className="page-transition__ring page-transition__ring--inner" />
        <BrandMark className="page-transition__mark" />
        <span className="page-transition__core-label">{transition.label}</span>
      </div>
      <div className="page-transition__hud page-transition__hud--bottom">
        <span>ROUTE PREFETCH // READY</span>
        <span>CYAN LINK // 0{transition.kind === "route" ? "2" : "1"}</span>
      </div>
    </div>
  );
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const { startLoading, finishLoading } = useLoader();
  const [transition, setTransition] = useState<TransitionState>({
    phase: "idle",
    kind: "section",
    direction: "forward",
    label: "SYSTEM ONLINE",
  });
  const currentUrlRef = useRef(window.location.href);
  const currentIndexRef = useRef(0);
  const runningRef = useRef(false);
  const reducedMotionRef = useRef(false);

  const runTransition = useCallback(
    async (
      urlString: string,
      nextIndex: number,
      navigationType: "push" | "pop",
    ) => {
      if (runningRef.current) return;
      const url = new URL(urlString, window.location.href);
      if (url.href === currentUrlRef.current && navigationType !== "pop") return;

      runningRef.current = true;
      const kind = getTransitionKind(url);
      const direction = getDirection(nextIndex, currentIndexRef.current);
      const duration = reducedMotionRef.current ? 90 : DURATIONS[kind];
      const label = kind === "route" ? "SWITCHING SYSTEMS" : "RECONFIGURING VIEW";

      saveScrollPosition(currentUrlRef.current, window.scrollY);
      startLoading("page-transition");
      setTransition({ phase: "exiting", kind, direction, label });

      await Promise.all([
        wait(reducedMotionRef.current ? 40 : EXIT_DURATION),
        Promise.race([prefetchRoute(url), wait(kind === "route" ? 230 : 60)]),
      ]);

      setTransition({ phase: "entering", kind, direction, label: "SYSTEM ONLINE" });
      currentUrlRef.current = url.href;
      currentIndexRef.current = nextIndex;

      await wait(Math.max(40, duration - (reducedMotionRef.current ? 40 : EXIT_DURATION)));
      setTransition({ phase: "idle", kind, direction, label: "SYSTEM ONLINE" });
      finishLoading();
      runningRef.current = false;

      if (url.hash) {
        scrollToHash(url.hash);
      } else if (navigationType === "pop") {
        scrollToPosition(getSavedScrollPosition(url.href) ?? 0);
      } else {
        scrollToPosition(0);
      }
    },
    [finishLoading, startLoading],
  );

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => {
      reducedMotionRef.current = reducedMotion.matches;
    };
    updateMotion();
    reducedMotion.addEventListener("change", updateMotion);

    const initialState = (window.history.state ?? {}) as HistoryState;
    const initialIndex = getIndex(initialState);
    currentIndexRef.current = initialIndex;
    if (initialState[HISTORY_KEY] === undefined) {
      window.history.replaceState(
        { ...initialState, [HISTORY_KEY]: initialIndex },
        "",
        window.location.href,
      );
    }

    const originalPushState = window.history.pushState.bind(window.history);
    const originalReplaceState = window.history.replaceState.bind(window.history);

    window.history.pushState = ((state: HistoryState | null, title: string, url?: string | URL | null) => {
      const nextIndex = currentIndexRef.current + 1;
      const nextState = { ...(state ?? {}), [HISTORY_KEY]: nextIndex };
      originalPushState(nextState, title, url);
      window.dispatchEvent(
        new CustomEvent<NavigationDetail>(NAVIGATION_EVENT, {
          detail: { kind: "push", url: window.location.href, index: nextIndex },
        }),
      );
    }) as History["pushState"];

    window.history.replaceState = ((state: HistoryState | null, title: string, url?: string | URL | null) => {
      originalReplaceState(
        { ...(state ?? {}), [HISTORY_KEY]: currentIndexRef.current },
        title,
        url,
      );
    }) as History["replaceState"];

    const onNavigation = (event: Event) => {
      const detail = (event as CustomEvent<NavigationDetail>).detail;
      void runTransition(detail.url, detail.index, detail.kind);
    };

    const onPopState = () => {
      const nextIndex = getIndex(window.history.state as HistoryState | null);
      void runTransition(window.location.href, nextIndex, "pop");
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      const target = event.target instanceof Element
        ? event.target.closest<HTMLAnchorElement>("a[href]")
        : null;
      if (!target || !isInternalAnchor(target)) return;
      const url = new URL(target.href, window.location.href);
      if (url.href === window.location.href) return;

      event.preventDefault();
      window.history.pushState({}, "", url.href);
    };

    const prefetchFromTarget = (event: Event) => {
      const target = event.target instanceof Element
        ? event.target.closest<HTMLAnchorElement>("a[href]")
        : null;
      if (!target || !isInternalAnchor(target)) return;
      void prefetchRoute(new URL(target.href, window.location.href));
    };

    const onScrollTo = (event: Event) => {
      const detail = (event as CustomEvent<ScrollToDetail>).detail;
      window.scrollTo({
        top: detail.top,
        behavior: detail.immediate ? "auto" : "smooth",
      });
    };

    document.addEventListener("click", onClick);
    document.addEventListener("pointerover", prefetchFromTarget, { passive: true });
    document.addEventListener("focusin", prefetchFromTarget);
    window.addEventListener(NAVIGATION_EVENT, onNavigation);
    window.addEventListener("popstate", onPopState);
    window.addEventListener("anonymiketech:scroll-to", onScrollTo);
    window.history.scrollRestoration = "manual";

    return () => {
      reducedMotion.removeEventListener("change", updateMotion);
      document.removeEventListener("click", onClick);
      document.removeEventListener("pointerover", prefetchFromTarget);
      document.removeEventListener("focusin", prefetchFromTarget);
      window.removeEventListener(NAVIGATION_EVENT, onNavigation);
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("anonymiketech:scroll-to", onScrollTo);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      window.history.scrollRestoration = "auto";
    };
  }, [runTransition]);

  return (
    <div
      className={`page-transition page-transition--${transition.phase} page-transition--${transition.direction} page-transition--${transition.kind}`}
    >
      <div className="page-transition__content">{children}</div>
      {transition.phase !== "idle" ? (
        <TransitionOverlay transition={transition} />
      ) : null}
    </div>
  );
}