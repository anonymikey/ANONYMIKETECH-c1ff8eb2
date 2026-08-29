import { useEffect, useRef, useState, type CSSProperties } from "react";
import "./global-hud.css";

type Telemetry = {
  cpu: number;
  gpu: number;
  memory: number;
  latency: number;
  sessions: number;
};

const CENTER_MESSAGES = [
  "SYSTEM ONLINE",
  "SCANNING NETWORK",
  "AI MODELS READY",
  "SYNCING MODULES",
  "VERIFYING SECURITY",
  "CLOUD LINK ACTIVE",
  "LOADING DATA STREAM",
];

const INITIAL_TELEMETRY: Telemetry = {
  cpu: 44.6,
  gpu: 68.2,
  memory: 61.7,
  latency: 24.8,
  sessions: 42,
};

function formatClock(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

function bounded(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function sectionName(element: Element | null) {
  if (!element) return "HERO";
  const id = element.id.toLowerCase();
  if (id === "cinematic") return "CINEMATIC";
  if (id === "synth") return "SYNTH";
  if (id === "systems") return "SYSTEMS";
  if (id === "footer") return "FOOTER";
  return "HERO";
}

export function GlobalHUD() {
  const [now, setNow] = useState(() => new Date());
  const [telemetry, setTelemetry] = useState<Telemetry>(INITIAL_TELEMETRY);
  const [centerIndex, setCenterIndex] = useState(0);
  const [centerVisible, setCenterVisible] = useState(true);
  const [currentSection, setCurrentSection] = useState("HERO");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [direction, setDirection] = useState("HOLD");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [lightweight, setLightweight] = useState(false);
  const lastScrollYRef = useRef(0);
  const telemetryTickRef = useRef(0);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);
    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const lowMemoryDevice =
      "deviceMemory" in navigator &&
      typeof (navigator as Navigator & { deviceMemory?: number }).deviceMemory === "number" &&
      ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) <= 4;
    setLightweight(coarsePointer || lowMemoryDevice);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      telemetryTickRef.current += 1;
      const tick = telemetryTickRef.current;
      setTelemetry({
        cpu: bounded(44.6 + Math.sin(tick * 0.82) * 5.2 + Math.cos(tick * 0.19) * 1.3, 35, 57),
        gpu: bounded(68.2 + Math.sin(tick * 0.57 + 1) * 5.1 + Math.cos(tick * 0.13) * 1.1, 55, 80),
        memory: bounded(61.7 + Math.sin(tick * 0.34 + 2) * 3.2 + Math.cos(tick * 0.11) * 0.8, 55, 69),
        latency: bounded(24.8 + Math.sin(tick * 0.91 + 1) * 4.7 + Math.cos(tick * 0.21) * 1.2, 17, 35),
        sessions: Math.round(bounded(42 + Math.sin(tick * 0.41) * 5 + Math.cos(tick * 0.17) * 2, 34, 50)),
      });
    }, reducedMotion ? 3000 : 1500);
    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) {
      setCenterIndex(0);
      setCenterVisible(true);
      return;
    }

    let revealTimer = 0;
    const interval = window.setInterval(() => {
      setCenterVisible(false);
      revealTimer = window.setTimeout(() => {
        setCenterIndex((current) => (current + 1) % CENTER_MESSAGES.length);
        setCenterVisible(true);
      }, 420);
    }, 5200);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(revealTimer);
    };
  }, [reducedMotion]);

  useEffect(() => {
    let frame = 0;

    const updateScrollTelemetry = () => {
      frame = 0;
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.round(bounded((scrollY / maxScroll) * 100, 0, 100));
      const previousScrollY = lastScrollYRef.current;
      const nextDirection =
        scrollY > previousScrollY + 1 ? "DESCENDING" : scrollY < previousScrollY - 1 ? "ASCENDING" : "HOLD";
      lastScrollYRef.current = scrollY;

      const sections = Array.from(document.querySelectorAll("main section, footer"));
      const focusLine = window.innerHeight * 0.38;
      const focusedSection =
        sections.find((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= focusLine && rect.bottom >= focusLine;
        }) ?? sections.reduce<Element | null>((closest, section) => {
          if (!closest) return section;
          const closestDistance = Math.abs(closest.getBoundingClientRect().top - focusLine);
          const sectionDistance = Math.abs(section.getBoundingClientRect().top - focusLine);
          return sectionDistance < closestDistance ? section : closest;
        }, null);

      setScrollProgress(progress);
      setDirection(nextDirection);
      setCurrentSection(sectionName(focusedSection));
    };

    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(updateScrollTelemetry);
    };

    updateScrollTelemetry();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className="global-hud"
      aria-hidden="true"
      data-reduced-motion={reducedMotion}
      data-lightweight={lightweight}
    >
      <div className="global-hud__wash" />
      <div className="global-hud__scan" />
      <span className="global-hud__corner global-hud__corner--tl" />
      <span className="global-hud__corner global-hud__corner--tr" />
      <span className="global-hud__corner global-hud__corner--bl" />
      <span className="global-hud__corner global-hud__corner--br" />

      <section className="global-hud__panel global-hud__panel--top-left">
        <div className="global-hud__eyebrow">
          <strong className="global-hud__brand">ANONYMIKETECH</strong>
          <span>SYSTEM</span>
        </div>
        <div className="global-hud__status-row global-hud__status-row--compact">
          <span className="global-hud__connection">
            <span className="global-hud__indicator" />
            LINK LIVE
          </span>
          <span className="global-hud__clock">{formatClock(now, "UTC")} UTC</span>
        </div>
        <div className="global-hud__status-row">
          <span className="global-hud__detail-label">KENYA / NAIROBI</span>
          <span className="global-hud__clock global-hud__clock--local">{formatClock(now, "Africa/Nairobi")}</span>
        </div>
      </section>

      <section className="global-hud__panel global-hud__panel--top-right">
        <div className="global-hud__panel-title">
          <strong>SYSTEM STATUS</strong>
          <span>OPTIMAL</span>
        </div>
        <div className="global-hud__metric-list">
          <div className="global-hud__detail-row">
            <span className="global-hud__detail-label">CPU LOAD</span>
            <span className="global-hud__metric-value">{telemetry.cpu.toFixed(1)}<span className="global-hud__metric-unit">%</span></span>
          </div>
          <div className="global-hud__detail-row">
            <span className="global-hud__detail-label">GPU LOAD</span>
            <span className="global-hud__metric-value">{telemetry.gpu.toFixed(1)}<span className="global-hud__metric-unit">%</span></span>
          </div>
          <div className="global-hud__detail-row">
            <span className="global-hud__detail-label">MEMORY USAGE</span>
            <span className="global-hud__metric-value">{telemetry.memory.toFixed(1)}<span className="global-hud__metric-unit">%</span></span>
          </div>
          <div className="global-hud__detail-row">
            <span className="global-hud__detail-label">NETWORK LATENCY</span>
            <span className="global-hud__metric-value">{telemetry.latency.toFixed(1)}<span className="global-hud__metric-unit">MS</span></span>
          </div>
        </div>
      </section>

      <div className={`global-hud__center ${centerVisible ? "" : "global-hud__center--hidden"}`}>
        <span className="global-hud__center-line" />
        <span className="global-hud__center-message">{CENTER_MESSAGES[centerIndex]}</span>
        <span className="global-hud__center-line global-hud__center-line--right" />
      </div>

      <section className="global-hud__panel global-hud__panel--bottom-left">
        <div className="global-hud__panel-title">
          <strong>ACTIVE MODULE</strong>
          <span>CORE</span>
        </div>
        <div className="global-hud__detail-list">
          <div className="global-hud__detail-row">
            <span className="global-hud__detail-label">CURRENT SECTION</span>
            <span className="global-hud__detail-value">{currentSection}</span>
          </div>
          <div className="global-hud__detail-row">
            <span className="global-hud__detail-label">SCROLL PROGRESS</span>
            <span className="global-hud__detail-value">{String(scrollProgress).padStart(3, "0")}%</span>
          </div>
          <div className="global-hud__detail-row global-hud__direction">
            <span className="global-hud__detail-label">NAVIGATION</span>
            <span className="global-hud__detail-value global-hud__detail-value--gold">{direction}</span>
          </div>
        </div>
        <div
          className="global-hud__progress"
          style={{ "--hud-progress": scrollProgress / 100 } as CSSProperties}
        >
          <span />
        </div>
      </section>

      <section className="global-hud__panel global-hud__panel--bottom-right">
        <div className="global-hud__panel-title">
          <strong>SYNTH AI</strong>
          <span className="global-hud__connection"><span className="global-hud__status-dot" /> READY</span>
        </div>
        <div className="global-hud__detail-list">
          <div className="global-hud__detail-row">
            <span className="global-hud__detail-label">SERVICES ONLINE</span>
            <span className="global-hud__detail-value">14 / 14</span>
          </div>
          <div className="global-hud__detail-row">
            <span className="global-hud__detail-label">CLOUD NODES</span>
            <span className="global-hud__detail-value">12 / 12</span>
          </div>
          <div className="global-hud__detail-row">
            <span className="global-hud__detail-label">ACTIVE SESSIONS</span>
            <span className="global-hud__detail-value">{String(telemetry.sessions).padStart(3, "0")}</span>
          </div>
        </div>
      </section>
    </div>
  );
}