import { ArrowUpRight } from "@phosphor-icons/react";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const stats = [
  { label: "YEARS EXPERIENCE", value: "5+" },
  { label: "PROJECTS DELIVERED", value: "50+" },
  { label: "CLIENTS WORLDWIDE", value: "30+" },
];

const expertise = [
  "Full-Stack Development",
  "AI & Machine Learning",
  "Cloud Architecture",
  "System Design",
  "DevOps & CI/CD",
  "UI/UX Engineering",
];

export function FounderSection() {
  return (
    <section
      id="founder"
      className="relative isolate overflow-hidden border-t border-white/5 bg-background px-6 py-24 md:px-10 md:py-36"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-accent/[0.04] blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-[400px] w-[400px] rounded-full bg-cyan-300/[0.03] blur-[100px]" />

      <div className="relative mx-auto max-w-[1400px]">
        <AnimatedSection className="flex flex-col items-center gap-4 text-center">
          <AnimatedItem>
            <EyebrowBadge>THE MIND BEHIND THE SYSTEM</EyebrowBadge>
          </AnimatedItem>
          <AnimatedItem>
            <h2 className="font-sans text-4xl font-semibold leading-[0.95] tracking-tighter text-foreground md:text-6xl lg:text-7xl">
              Developer <span className="text-accent">&</span> Founder
            </h2>
          </AnimatedItem>
        </AnimatedSection>

        {/* Main content grid */}
        <div className="mt-16 grid items-center gap-12 md:grid-cols-[1.1fr_1fr] md:gap-20 lg:mt-24">
          {/* Image side */}
          <ScrollReveal direction="left">
            <div className="relative mx-auto max-w-[480px]">
              {/* Decorative frame */}
              <div className="pointer-events-none absolute -inset-4 rounded-3xl border border-white/5" />
              <div className="pointer-events-none absolute -inset-8 rounded-3xl border border-white/[0.03]" />

              {/* Corner accents */}
              <div className="pointer-events-none absolute -left-3 -top-3 h-8 w-8 border-l-2 border-t-2 border-accent/40" />
              <div className="pointer-events-none absolute -right-3 -top-3 h-8 w-8 border-r-2 border-t-2 border-accent/40" />
              <div className="pointer-events-none absolute -bottom-3 -left-3 h-8 w-8 border-b-2 border-l-2 border-accent/40" />
              <div className="pointer-events-none absolute -bottom-3 -right-3 h-8 w-8 border-b-2 border-r-2 border-accent/40" />

              {/* Image container */}
              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0e]">
                <img
                  src="/developer.jpg"
                  alt="ANONYMIKETECH — Developer & Founder"
                  className="aspect-[3/4] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />
                {/* Gradient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent opacity-60" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a0a0b]/30 via-transparent to-transparent" />

                {/* Bottom info bar */}
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_rgba(212,162,47,0.9)]" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-zinc-300">
                      ONLINE
                    </span>
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-500">
                    NAIROBI, KE
                  </span>
                </div>
              </div>

              {/* Status tag */}
              <div className="absolute -right-4 top-8 rounded-full border border-white/10 bg-[#0a0a0b]/90 px-3 py-1.5 backdrop-blur-xl md:-right-6">
                <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-accent">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(212,162,47,0.85)]" />
                  AVAILABLE FOR WORK
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Content side */}
          <ScrollReveal direction="right">
            <div className="flex flex-col gap-8">
              {/* Name and title */}
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <div className="h-px w-12 bg-accent/60" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                    FOUNDER & DEVELOPER
                  </span>
                </div>
                <h3 className="font-sans text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
                  ANONYMIKETECH
                </h3>
                <p className="mt-3 max-w-[48ch] font-sans text-base leading-relaxed text-zinc-400">
                  Building intelligent systems at the intersection of AI,
                  cloud, and modern web technologies. Driven by a passion
                  for turning complex problems into elegant digital solutions
                  that scale.
                </p>
              </div>

              {/* Expertise tags */}
              <div>
                <span className="mb-3 block font-mono text-[9px] uppercase tracking-[0.24em] text-zinc-500">
                  CORE EXPERTISE
                </span>
                <div className="flex flex-wrap gap-2">
                  {expertise.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-400 transition-colors duration-200 hover:border-accent/30 hover:text-accent"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 border-y border-white/6 py-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="font-sans text-2xl font-semibold text-foreground md:text-3xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.2em] text-zinc-500">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="/#engage"
                  data-cursor-magnet
                  className="group inline-flex items-center gap-2 rounded-full border border-accent/35 bg-accent/[0.08] px-6 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-accent backdrop-blur-md transition-all duration-200 hover:bg-accent/[0.14] active:translate-y-[1px]"
                >
                  Get in touch
                  <ArrowUpRight
                    size={14}
                    weight="bold"
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
                <a
                  href="/#services"
                  data-cursor-magnet
                  className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-foreground backdrop-blur-md transition-all duration-200 hover:bg-white/[0.08] hover:border-white/20 active:translate-y-[1px]"
                >
                  View services
                  <ArrowUpRight
                    size={14}
                    weight="bold"
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
