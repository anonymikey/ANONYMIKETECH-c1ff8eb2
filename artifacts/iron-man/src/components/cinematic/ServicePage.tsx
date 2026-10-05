import { ArrowUpRight } from "@phosphor-icons/react";
import { HudFrame } from "@/components/ui/HudFrame";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { ServiceDefinition } from "@/lib/services";

type Props = {
  service: ServiceDefinition;
  onEngage: (serviceName: string) => void;
};

/** Animated visual composition for service pages (no video — premium animated canvas) */
function ServiceVisual({ service }: { service: ServiceDefinition }) {
  const isAiRelated =
    service.slug === "ai-automation" || service.slug === "chatbots";
  const isCloudRelated =
    service.slug === "cloud-vps" || service.slug === "internet-solutions";
  const isDesignRelated =
    service.slug === "digital-design" || service.slug === "web-development";

  return (
    <div className="service-visual">
      {/* Animated grid background */}
      <div className="service-visual__grid" />

      {/* Central composition */}
      <div className="service-visual__core">
        {/* Orbiting rings */}
        <div className="service-visual__ring service-visual__ring--outer" />
        <div className="service-visual__ring service-visual__ring--mid" />
        <div className="service-visual__ring service-visual__ring--inner" />

        {/* Floating nodes */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`service-visual__node service-visual__node--${i}`}
          />
        ))}

        {/* Center label */}
        <div className="service-visual__label">
          <span className="service-visual__code">{service.code}</span>
          <span className="service-visual__name">
            {service.name.split(" ")[0]}
          </span>
        </div>
      </div>

      {/* Side telemetry */}
      <div className="service-visual__telemetry">
        <span>STATUS: {service.statusLabel}</span>
        <span>MODULE: {service.code}</span>
        <span>SYSTEM: ONLINE</span>
      </div>

      {/* Ambient glow */}
      <div
        className={`service-visual__glow ${
          isAiRelated
            ? "service-visual__glow--ai"
            : isCloudRelated
            ? "service-visual__glow--cloud"
            : isDesignRelated
            ? "service-visual__glow--design"
            : ""
        }`}
      />
    </div>
  );
}

export function ServicePage({ service, onEngage }: Props) {
  return (
    <div className="service-page">
      {/* Hero header */}
      <section className="service-hero relative border-t border-white/5 bg-background px-6 pt-28 pb-16 md:px-10 md:pt-36 md:pb-20">
        <div className="pointer-events-none absolute left-6 top-28 text-accent md:left-10 md:top-32">
          <HudFrame corner="tl" size={26} />
        </div>
        <div className="pointer-events-none absolute right-6 top-28 text-accent md:right-10 md:top-32">
          <HudFrame corner="tr" size={26} />
        </div>
        <div className="pointer-events-none absolute bottom-8 left-6 text-accent md:bottom-12 md:left-10">
          <HudFrame corner="bl" size={26} />
        </div>
        <div className="pointer-events-none absolute bottom-8 right-6 text-accent md:bottom-12 md:right-10">
          <HudFrame corner="br" size={26} />
        </div>

        <div className="mx-auto max-w-[1400px]">
          <AnimatedSection className="flex flex-col gap-7">
            <AnimatedItem>
              <div className="flex items-center gap-3">
                <EyebrowBadge>{service.eyebrow}</EyebrowBadge>
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(212,162,47,0.85)]" />
                  {service.statusLabel}
                </span>
              </div>
            </AnimatedItem>

            <AnimatedItem>
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
                {service.code} // {service.name}
              </span>
            </AnimatedItem>

            <AnimatedItem>
              <h1 className="max-w-[14ch] font-sans text-5xl font-semibold leading-[0.95] tracking-tighter text-foreground md:text-7xl lg:text-8xl">
                {service.name.split(" & ")[0].split(" ")[0]}
                <br />
                <span className="text-accent">
                  {service.name.includes("&")
                    ? `& ${service.name.split(" & ")[1]}`
                    : service.name.split(" ").slice(1).join(" ")}
                </span>
              </h1>
            </AnimatedItem>

            <AnimatedItem>
              <p className="max-w-[42ch] font-sans text-base leading-relaxed text-zinc-400 md:text-lg">
                {service.tagline}
              </p>
            </AnimatedItem>

            <AnimatedItem>
              <p className="max-w-[52ch] font-sans text-sm leading-relaxed text-zinc-500 md:text-base">
                {service.description}
              </p>
            </AnimatedItem>

            <AnimatedItem>
              <button
                onClick={() => onEngage(service.name)}
                data-cursor-magnet
                className="group inline-flex items-center gap-2 self-start rounded-full border border-accent/35 bg-accent/[0.08] px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-accent backdrop-blur-md transition-all duration-200 hover:bg-accent/[0.14] active:translate-y-[1px]"
              >
                {service.ctaLabel}
                <ArrowUpRight
                  size={14}
                  weight="bold"
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>
            </AnimatedItem>
          </AnimatedSection>
        </div>
      </section>

      {/* Animated visual composition (replaces cinematic frame sequence) */}
      <ScrollReveal>
        <ServiceVisual service={service} />
      </ScrollReveal>

      {/* Capabilities */}
      <section className="relative border-t border-white/5 bg-background px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <AnimatedSection className="grid gap-16 md:grid-cols-[1fr_1.2fr] md:gap-20">
            <div className="flex flex-col gap-7">
              <AnimatedItem>
                <EyebrowBadge>CAPABILITIES</EyebrowBadge>
              </AnimatedItem>
              <AnimatedItem>
                <h2 className="max-w-[14ch] font-sans text-4xl font-semibold leading-[0.95] tracking-tighter text-foreground md:text-6xl">
                  What we{" "}
                  <span className="text-accent">build.</span>
                </h2>
              </AnimatedItem>
              <AnimatedItem>
                <p className="max-w-[42ch] font-sans text-base leading-relaxed text-zinc-400">
                  Each capability is delivered with measurable outcomes and
                  purpose-built architecture for {service.name.toLowerCase()}.
                </p>
              </AnimatedItem>
            </div>

            <AnimatedSection className="flex flex-col divide-y divide-white/8 border-t border-white/8 font-mono md:mt-3">
              {service.capabilities.map((capability, index) => (
                <AnimatedItem key={capability}>
                  <div className="flex items-baseline justify-between gap-6 py-5">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] uppercase tracking-[0.28em] text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-sans text-[15px] text-foreground">
                        {capability}
                      </span>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                      ONLINE
                    </span>
                  </div>
                </AnimatedItem>
              ))}
            </AnimatedSection>
          </AnimatedSection>
        </div>
      </section>

      {/* Technology */}
      <section className="relative border-t border-white/5 bg-background px-6 py-24 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <AnimatedSection className="flex flex-col gap-10">
            <AnimatedItem>
              <EyebrowBadge>TECHNOLOGY STACK</EyebrowBadge>
            </AnimatedItem>
            <AnimatedItem>
              <h2 className="max-w-[18ch] font-sans text-3xl font-semibold leading-[0.98] tracking-tighter text-foreground md:text-5xl">
                Systems &{" "}
                <span className="text-accent">tools.</span>
              </h2>
            </AnimatedItem>
            <AnimatedItem>
              <div className="flex flex-wrap gap-3">
                {service.technology.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </AnimatedItem>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="relative border-t border-white/5 bg-background px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1400px] text-center">
          <AnimatedSection className="flex flex-col items-center gap-8">
            <AnimatedItem>
              <EyebrowBadge>OPEN CHANNEL</EyebrowBadge>
            </AnimatedItem>
            <AnimatedItem>
              <h2 className="max-w-[18ch] font-sans text-4xl font-semibold leading-[0.95] tracking-tighter text-foreground md:text-6xl">
                Ready to{" "}
                <span className="text-accent">build?</span>
              </h2>
            </AnimatedItem>
            <AnimatedItem>
              <p className="max-w-[48ch] font-sans text-base leading-relaxed text-zinc-400">
                {service.description} Let&apos;s map the right architecture,
                delivery path and measurable outcome for your team.
              </p>
            </AnimatedItem>
            <AnimatedItem>
              <button
                onClick={() => onEngage(service.name)}
                data-cursor-magnet
                className="group inline-flex items-center gap-2 rounded-full border border-accent/35 bg-accent/[0.08] px-6 py-3 font-mono text-[12px] font-medium uppercase tracking-[0.22em] text-accent backdrop-blur-md transition-all duration-200 hover:bg-accent/[0.14] active:translate-y-[1px]"
              >
                {service.ctaLabel}
                <ArrowUpRight
                  size={16}
                  weight="bold"
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>
            </AnimatedItem>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
