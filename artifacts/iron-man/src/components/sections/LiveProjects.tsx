import { ArrowUpRight } from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";

const projects = [
  { id: "anonymiketech", name: "ANONYMIKETECH", status: "LIVE", category: "AI • Web • Cloud • Internet Solutions", description: "A technology and innovation platform focused on AI, web development, cloud solutions, internet services, and digital experiences.", image: "/favicon.svg", url: "https://anonymiketech.space", featured: true },
  { id: "synth", name: "SYNTH", status: "COMING SOON", category: "AI Agent / Development Platform", description: "An intelligent development platform currently in active development.", image: "/developer.jpg", comingSoon: true },
  { id: "economic-justice-forum", name: "ECONOMIC JUSTICE FORUM", status: "LIVE", category: "Web Development • Organization Website", description: "A professional web platform created for Economic Justice Forum.", image: "/ejf-logo.png", url: "https://www.economicjusticeforum.org" },
  { id: "ecostruct-dynamics", name: "ECOSTRUCT DYNAMICS LTD", status: "LIVE", category: "Web Development • Corporate Website", description: "A professional corporate website created for EcoStruct Dynamics Ltd.", image: "/ecostruct-logo.jpg", url: "https://www.ecostructdynamicsltd.com" },
] as const;

type Filter = "ALL" | "LIVE" | "COMING SOON";

export function LiveProjects() {
  const [filter, setFilter] = useState<Filter>("ALL");
  const visibleProjects = useMemo(() => projects.filter((project) => filter === "ALL" || project.status === filter), [filter]);

  return (
    <section id="live-projects" className="live-projects-section relative isolate overflow-hidden border-t border-white/5 px-6 py-24 md:px-10 md:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(89,217,247,0.08),transparent_32%),linear-gradient(135deg,rgba(6,20,29,0.95),rgba(10,10,11,0.98))]" />
      <div className="relative mx-auto max-w-[1400px]">
        <AnimatedSection className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <AnimatedItem>
            <EyebrowBadge>PROJECT ARCHIVE / 2026</EyebrowBadge>
            <h2 className="mt-5 max-w-[9ch] font-sans text-5xl font-semibold uppercase leading-[.9] tracking-tighter text-foreground md:text-7xl">Live Projects</h2>
            <p className="mt-5 max-w-[54ch] text-sm leading-relaxed text-zinc-400">Selected platforms, client work, and the next generation of intelligent products.</p>
          </AnimatedItem>
          <AnimatedItem className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
            {(["ALL", "LIVE", "COMING SOON"] as Filter[]).map((item) => (
              <button key={item} type="button" onClick={() => setFilter(item)} aria-pressed={filter === item} className={`rounded-full border px-4 py-2 font-mono text-[10px] tracking-[.16em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${filter === item ? "border-brand-blue bg-brand-blue text-background" : "border-white/15 text-zinc-400 hover:border-brand-blue hover:text-brand-blue"}`}>{item}</button>
            ))}
          </AnimatedItem>
        </AnimatedSection>

        <div className="live-projects-grid grid gap-5 md:grid-cols-2">
          {visibleProjects.map((project, index) => (
            <AnimatedItem key={project.id} className={project.featured ? "md:col-span-2" : ""} style={{ animationDelay: `${index * 90}ms` }}>
              <article className={`live-project-card group grid h-full overflow-hidden rounded-3xl border bg-white/[0.035] ${project.featured ? "md:grid-cols-[1.1fr_.9fr] border-accent/45" : "border-white/10"}`}>
                <div className="live-project-visual relative flex min-h-[230px] items-center justify-center overflow-hidden bg-[#07131e] p-8 md:min-h-[280px]">
                  <div className="absolute inset-5 rounded-2xl border border-brand-blue/15" />
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_49%,rgba(89,217,247,.05)_50%,transparent_51%)] bg-[length:100%_24px]" />
                  <img src={project.image} alt={`${project.name} visual identity`} className="relative z-10 max-h-40 max-w-[78%] object-contain drop-shadow-[0_0_24px_rgba(89,217,247,.22)] transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  {project.featured && <span className="absolute bottom-6 left-8 z-10 font-mono text-[9px] leading-relaxed tracking-[.18em] text-brand-blue/70">SYSTEM ONLINE<br />LIVE PLATFORM<br />AI SYSTEMS</span>}
                </div>
                <div className="flex flex-col p-7 md:p-9">
                  <div className={`flex items-center gap-2 font-mono text-[10px] font-medium tracking-[.18em] ${project.comingSoon ? "text-brand-blue" : "text-emerald-300"}`}><span className="h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_10px_currentColor]" />{project.status}</div>
                  <h3 className="mt-5 font-sans text-2xl font-semibold leading-tight text-foreground md:text-3xl">{project.name}</h3>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[.16em] text-brand-blue">{project.category}</p>
                  <p className="mt-5 text-sm leading-relaxed text-zinc-400">{project.description}</p>
                  {project.comingSoon ? <span className="mt-auto pt-8 font-mono text-[10px] tracking-[.18em] text-zinc-500">IN DEVELOPMENT / NEXT PLATFORM</span> : <a href={project.url} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex w-fit items-center gap-2 pt-8 font-mono text-[10px] tracking-[.18em] text-foreground transition-colors hover:text-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent">VIEW PROJECT <ArrowUpRight size={15} weight="bold" aria-hidden="true" /><span className="sr-only">{project.name} opens in a new tab</span></a>}
                </div>
              </article>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </section>
  );
}
