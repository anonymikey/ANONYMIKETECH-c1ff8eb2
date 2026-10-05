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
  return null;
}