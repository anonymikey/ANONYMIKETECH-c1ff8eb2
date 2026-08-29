import { CSSProperties, useEffect, useRef, useState } from "react";
import { FogLayer } from "./FogLayer";
import { GridLayer } from "./GridLayer";
import { HexLayer } from "./HexLayer";
import { ParticleLayer } from "./ParticleLayer";
import { RadarLayer } from "./RadarLayer";
import { StarLayer } from "./StarLayer";
import "./ambient.css";

type SectionName = "hero" | "cinematic" | "synth" | "systems" | "footer";
type AmbientStyle = CSSProperties & Record<`--${string}`, string | number>;

type NavigatorWithConnection = Navigator & {
  connection?: {
    saveData?: boolean;
  };
};

const sectionBrightness: Record<SectionName, number> = {
  hero: 1,
  cinematic: 0.82,
  synth: 1.08,
  systems: 0.78,
  footer: 0.62,
};

function sectionFromElement(element: HTMLElement, index: number): SectionName {
  const value = element.dataset.section || element.id;
  if (value === "cinematic" || value === "synth" || value === "systems" || value === "footer") {
    return value;
  }
  return index === 0 ? "hero" : "systems";
}

export function AmbientEngine() {
  const engineRef = useRef<HTMLDivElement | null>(null);
  const [activeSection, setActiveSection] = useState<SectionName>("hero");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [lightweight, setLightweight] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(pointer: coarse)");
    const connection = (navigator as NavigatorWithConnection).connection;
    const detectDeviceMode = () => {
      const cores = navigator.hardwareConcurrency || 8;
      const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 8;
      setReducedMotion(motionQuery.matches);
      setLightweight(
        cores <= 4 ||
          memory <= 4 ||
          Boolean(connection?.saveData) ||
          pointerQuery.matches,
      );
    };

    detectDeviceMode();
    motionQuery.addEventListener?.("change", detectDeviceMode);
    pointerQuery.addEventListener?.("change", detectDeviceMode);
    return () => {
      motionQuery.removeEventListener?.("change", detectDeviceMode);
      pointerQuery.removeEventListener?.("change", detectDeviceMode);
    };
  }, []);

  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;

    let frame = 0;
    const updateSection = () => {
      frame = 0;
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("main section, footer"),
      );
      const viewportCenter = window.innerHeight * 0.48;
      let closest: SectionName = "hero";
      let closestDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const distance = Math.abs(rect.top + rect.height / 2 - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = sectionFromElement(section, index);
        }
      });

      setActiveSection((previous) => (previous === closest ? previous : closest));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateSection);
    };

    updateSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const engine = engineRef.current;
    if (!engine || reducedMotion || lightweight) return;

    let frame = 0;
    const onPointerMove = (event: PointerEvent) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const x = (event.clientX - window.innerWidth / 2) * 0.025;
        const y = (event.clientY - window.innerHeight / 2) * 0.025;
        engine.style.setProperty("--ambient-pointer-x", `${x.toFixed(2)}px`);
        engine.style.setProperty("--ambient-pointer-y", `${y.toFixed(2)}px`);
        engine.style.setProperty("--ambient-cursor-x", `${event.clientX}px`);
        engine.style.setProperty("--ambient-cursor-y", `${event.clientY}px`);
        engine.classList.add("ambient-engine--pointer-active");
      });
    };
    const onPointerLeave = () => {
      engine.classList.remove("ambient-engine--pointer-active");
      engine.style.setProperty("--ambient-pointer-x", "0px");
      engine.style.setProperty("--ambient-pointer-y", "0px");
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [lightweight, reducedMotion]);

  const style: AmbientStyle = {
    "--ambient-brightness": sectionBrightness[activeSection],
    "--ambient-pointer-x": "0px",
    "--ambient-pointer-y": "0px",
    "--ambient-cursor-x": "50vw",
    "--ambient-cursor-y": "50vh",
  };

  return (
    <div
      ref={engineRef}
      className={`ambient-engine ambient-engine--${activeSection}`}
      data-section={activeSection}
      data-lightweight={lightweight ? "true" : "false"}
      aria-hidden="true"
      style={style}
    >
      <div className="ambient-engine__cursor-light" />
      <StarLayer lightweight={lightweight} reducedMotion={reducedMotion} />
      <ParticleLayer lightweight={lightweight} reducedMotion={reducedMotion} />
      <GridLayer lightweight={lightweight} reducedMotion={reducedMotion} />
      <RadarLayer lightweight={lightweight} reducedMotion={reducedMotion} />
      <HexLayer lightweight={lightweight} reducedMotion={reducedMotion} />
      <FogLayer lightweight={lightweight} reducedMotion={reducedMotion} />
      <div className="ambient-engine__vignette" />
      <div className="ambient-engine__chromatic" />
    </div>
  );
}
