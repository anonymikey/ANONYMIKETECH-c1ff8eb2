import { ArrowUpRight, Sparkle } from "@phosphor-icons/react";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { HudFrame } from "@/components/ui/HudFrame";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const capabilities = ["REASONING", "AUTOMATION", "CONTEXT"];

const workflowSteps = [
  { label: "USER REQUEST", status: "active" as const },
  { label: "CONTEXT ANALYSIS", status: "active" as const },
  { label: "PLANNING", status: "active" as const },
  { label: "ARCHITECTURE", status: "building" as const },
  { label: "CODE GENERATION", status: "building" as const },
  { label: "VALIDATION", status: "building" as const },
  { label: "TESTING", status: "queued" as const },
  { label: "DEPLOYMENT", status: "queued" as const },
];

const modules = [
  { name: "CORE ENGINE", status: "IN DEVELOPMENT", progress: 42 },
  { name: "CODE INTELLIGENCE", status: "IN DEVELOPMENT", progress: 28 },
  { name: "VISION", status: "PLANNED", progress: 0 },
  { name: "AUTONOMOUS WORKFLOWS", status: "PLANNED", progress: 0 },
  { name: "DEPLOYMENT AGENT", status: "PLANNED", progress: 0 },
  { name: "SEARCH + DOCS", status: "PLANNED", progress: 0 },
];

export function SynthSection() {
  return (
    <section
      id="synth"
      className="relative isolate overflow-hidden border-t border-white/5 bg-background px-6 py-24 md:px-10 md:py-36"
    >
      <div className="synth-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="synth-scanline pointer-events-none absolute inset-x-0 top-0 h-px bg-accent/60" />
      <div className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-accent/[0.07] blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-cyan-300/[0.04] blur-3xl" />

      <div className="pointer-events-none absolute left-6 top-8 text-accent md:left-10 md:top-12">
        <HudFrame corner="tl" size={26} />
      </div>
      <div className="pointer-events-none absolute right-6 top-8 text-accent md:right-10 md:top-12">
        <HudFrame corner="tr" size={26} />
      </div>
      <div className="pointer-events-none absolute bottom-8 left-6 text-accent md:bottom-12 md:left-10">
        <HudFrame corner="bl" size={26} />
      </div>
      <div className="pointer-events-none absolute bottom-8 right-6 text-accent md:bottom-12 md:right-10">
        <HudFrame corner="br" size={26} />
      </div>

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-16 md:grid-cols-[1fr_0.9fr] md:gap-20">
        <AnimatedSection className="flex flex-col gap-7">
          <AnimatedItem>
            <EyebrowBadge>
              <Sparkle size={12} weight="fill" />
              SYNTH // IN DEVELOPMENT
            </EyebrowBadge>
          </AnimatedItem>

          <AnimatedItem>
            <h2 className="max-w-[11ch] font-sans text-5xl font-semibold leading-[0.9] tracking-tighter text-foreground md:text-7xl lg:text-8xl">
              Meet
              <br />
              <span className="text-accent">SYNTH.</span>
            </h2>
          </AnimatedItem>

          <AnimatedItem>
            <p className="max-w-[48ch] font-sans text-base leading-relaxed text-zinc-400 md:text-lg">
              An AI agent taking shape inside ANONYMIKETECH. SYNTH is being
              designed to turn context into momentum &mdash; helping ideas
              become actions, workflows, and better decisions.
            </p>
          </AnimatedItem>

          <AnimatedItem>
            <div className="flex flex-wrap gap-2">
              {capabilities.map((capability) => (
                <span
                  key={capability}
                  className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.24em] text-zinc-400"
                >
                  {capability}
                </span>
              ))}
            </div>
          </AnimatedItem>

          <AnimatedItem>
            <a
              href="#synth-workflow"
              data-cursor-magnet
              className="group inline-flex items-center gap-2 self-start rounded-full border border-accent/35 bg-accent/[0.08] px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-accent backdrop-blur-md transition-all duration-200 hover:bg-accent/[0.14] active:translate-y-[1px]"
            >
              Follow the build
              <ArrowUpRight
                size={14}
                weight="bold"
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </AnimatedItem>
        </AnimatedSection>

        <AnimatedSection className="relative">
          <AnimatedItem>
            <div data-synth className="synth-console cursor-reactive-card relative mx-auto max-w-[560px] overflow-hidden rounded-[28px] border border-white/10 bg-[#101012]/80 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl md:p-7">
              <div className="mb-8 flex items-center justify-between border-b border-white/8 pb-4 font-mono text-[10px] uppercase tracking-[0.26em]">
                <span className="flex items-center gap-2 text-zinc-300">
                  <span className="synth-blink inline-block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_rgba(212,162,47,0.9)]" />
                  SYNTH CORE
                </span>
                <span className="text-accent">BUILDING</span>
              </div>

              <div className="relative mx-auto mb-8 flex aspect-square w-full max-w-[300px] items-center justify-center">
                <div className="synth-orbit synth-orbit-one absolute inset-[8%] rounded-full border border-accent/25" />
                <div className="synth-orbit synth-orbit-two absolute inset-[18%] rounded-full border border-dashed border-cyan-200/20" />
                <div className="synth-orbit synth-orbit-three absolute inset-[30%] rounded-full border border-accent/20" />
                <div className="synth-node synth-node-one absolute left-[13%] top-[30%] h-2 w-2 rounded-full bg-cyan-200 shadow-[0_0_16px_rgba(165,243,252,0.95)]" />
                <div className="synth-node synth-node-two absolute right-[17%] top-[20%] h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_14px_rgba(212,162,47,0.9)]" />
                <div className="synth-node synth-node-three absolute bottom-[19%] right-[22%] h-2 w-2 rounded-full bg-accent shadow-[0_0_16px_rgba(212,162,47,0.9)]" />
                <div className="synth-core relative flex h-32 w-32 items-center justify-center rounded-full border border-accent/60 bg-accent/[0.08] shadow-[0_0_80px_rgba(212,162,47,0.18)] md:h-40 md:w-40">
                  <div className="synth-core-inner flex h-20 w-20 items-center justify-center rounded-full border border-accent/40 bg-background/80 md:h-24 md:w-24">
                    <span className="font-mono text-2xl font-semibold tracking-[-0.08em] text-accent md:text-3xl">
                      SY
                    </span>
                  </div>
                </div>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.35em] text-zinc-500">
                  Neural interface / 001
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 border-y border-white/8 py-4 text-center font-mono">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-500">Status</p>
                  <p className="mt-1 text-xs text-accent">WARM</p>
                </div>
                <div className="border-x border-white/8">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-500">Phase</p>
                  <p className="mt-1 text-xs text-foreground">01 / 04</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-500">Signal</p>
                  <p className="mt-1 text-xs text-cyan-200">SYNCED</p>
                </div>
              </div>

              <div className="mt-5 space-y-2 font-mono text-[10px] uppercase tracking-[0.2em]">
                <div className="flex items-center justify-between text-zinc-500">
                  <span>Training the next layer</span>
                  <span className="text-accent">Coming soon</span>
                </div>
                <div className="h-1 overflow-hidden rounded-full bg-white/8">
                  <div className="synth-progress h-full w-[62%] rounded-full bg-gradient-to-r from-accent/40 via-accent to-cyan-200" />
                </div>
              </div>
            </div>
          </AnimatedItem>
        </AnimatedSection>
      </div>

      {/* ─── SYNTH Development Workflow — revealed by "Follow the build" ─── */}
      <div id="synth-workflow" className="relative mx-auto mt-20 max-w-[1400px] scroll-mt-24">
        <ScrollReveal>
          <div className="mb-8 flex items-center gap-3">
            <EyebrowBadge>DEVELOPMENT STATUS</EyebrowBadge>
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_10px_rgba(86,216,245,0.85)]" />
              SYSTEM ACTIVE
            </span>
          </div>
        </ScrollReveal>

        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
          {/* Left — Module status */}
          <ScrollReveal delay={100}>
            <div className="space-y-1">
              <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                AI ENGINE MODULES
              </h3>
              {modules.map((mod) => (
                <div
                  key={mod.name}
                  className="flex items-center justify-between border-b border-white/6 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-block h-1.5 w-1.5 rounded-full ${
                        mod.status === "IN DEVELOPMENT"
                          ? "bg-cyan-200 shadow-[0_0_8px_rgba(86,216,245,0.8)]"
                          : "bg-zinc-600"
                      }`}
                    />
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-foreground">
                      {mod.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {mod.progress > 0 && (
                      <div className="h-1 w-16 overflow-hidden rounded-full bg-white/8">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-accent/40 via-accent to-cyan-200"
                          style={{ width: `${mod.progress}%` }}
                        />
                      </div>
                    )}
                    <span
                      className={`font-mono text-[9px] uppercase tracking-[0.18em] ${
                        mod.status === "IN DEVELOPMENT" ? "text-accent" : "text-zinc-600"
                      }`}
                    >
                      {mod.progress > 0 ? `${mod.progress}%` : mod.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Right — Workflow pipeline */}
          <ScrollReveal delay={200} direction="right">
            <div className="border border-white/8 bg-white/[0.02]">
              <div className="border-b border-white/8 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                DEVELOPMENT PIPELINE
              </div>
              {workflowSteps.map((step, i) => (
                <div
                  key={step.label}
                  className="flex items-center gap-4 border-b border-white/6 px-5 py-3 last:border-b-0"
                >
                  <span className="w-6 font-mono text-[10px] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground">
                    {step.label}
                  </span>
                  <span
                    className={`font-mono text-[9px] uppercase tracking-[0.18em] ${
                      step.status === "active"
                        ? "text-cyan-200"
                        : step.status === "building"
                        ? "text-accent"
                        : "text-zinc-600"
                    }`}
                  >
                    {step.status === "active"
                      ? "● ACTIVE"
                      : step.status === "building"
                      ? "◐ BUILDING"
                      : "○ QUEUED"}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
