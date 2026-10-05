import { useState } from "react";
import { ArrowUpRight, Check, X } from "@phosphor-icons/react";
import { SERVICES, SERVICE_SLUGS } from "@/lib/services";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type Panel = "engage" | "project" | null;

const projects = [
  ["ANONYMIKETECH V2", "PLATFORM", "LIVE", "React / Vite / Motion", "The cinematic operating surface for the ANONYMIKETECH ecosystem."],
  ["SYNTH", "AI SYSTEM", "IN DEVELOPMENT", "AI / Agents / Workflows", "Autonomous development intelligence for understanding, building and validating software."],
  ["NETWORK OPERATIONS", "INFRASTRUCTURE", "CONCEPT", "Networks / Cloud", "A technical command center for connectivity, telemetry and managed infrastructure."],
];

/* ─── Eyebrow ─── */
function SectionEyebrow({ code, children }: { code: string; children: string }) {
  return (
    <div className="platform-eyebrow">
      <span>{code}</span>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   WHAT I BUILD SECTION
   ═══════════════════════════════════════════════════════════════ */
function WhatIBuild() {
  const builds = [
    { icon: "◈", name: "AI Agents", description: "Intelligent systems that understand context and take action autonomously" },
    { icon: "⬡", name: "Websites", description: "Modern, responsive digital experiences built for performance and impact" },
    { icon: "▣", name: "Web Applications", description: "Full-stack platforms, dashboards and interactive systems" },
    { icon: "⟐", name: "Automation Systems", description: "Workflows that connect services and eliminate manual repetition" },
    { icon: "☁", name: "Cloud Infrastructure", description: "Scalable deployment, hosting and server management" },
    { icon: "∞", name: "Networking Solutions", description: "WiFi, connectivity and network architecture for reliable access" },
    { icon: "◆", name: "Business Platforms", description: "Custom technology solutions tailored to how your team works" },
    { icon: "◎", name: "Digital Experiences", description: "Brand identity, motion design and interactive compositions" },
  ];

  return (
    <section className="platform-section" style={{ background: "rgba(6,8,10,.92)" }}>
      <div className="platform-container">
        <ScrollReveal>
          <SectionEyebrow code="SYS / 00">CAPABILITY INDEX</SectionEyebrow>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <p className="platform-kicker">WHAT ANONYMIKETECH BUILDS</p>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <h2>
            Systems that <span>move ideas forward.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="platform-copy" style={{ marginBottom: "3rem" }}>
            From AI agents to cloud infrastructure, every system is designed with observable architecture,
            measurable outcomes and the technical depth to scale.
          </p>
        </ScrollReveal>

        <div className="build-grid">
          {builds.map((build, i) => (
            <ScrollReveal key={build.name} delay={i * 60}>
              <div className="build-card">
                <span className="build-icon">{build.icon}</span>
                <strong>{build.name}</strong>
                <p>{build.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HOW I WORK — Animated workflow
   ═══════════════════════════════════════════════════════════════ */
function HowIWork() {
  const workflow = [
    { step: "01", label: "DISCOVER", description: "Understand the problem, the context and the constraints." },
    { step: "02", label: "DESIGN", description: "Map the architecture, interface and delivery path." },
    { step: "03", label: "ENGINEER", description: "Build with precision, test-driven and production-ready." },
    { step: "04", label: "INTEGRATE", description: "Connect services, APIs and data flows into a working system." },
    { step: "05", label: "TEST", description: "Validate performance, security and edge cases." },
    { step: "06", label: "DEPLOY", description: "Ship to production with monitoring and rollback readiness." },
    { step: "07", label: "EVOLVE", description: "Iterate based on real usage, feedback and system telemetry." },
  ];

  return (
    <section className="platform-section" style={{ background: "rgba(4,6,8,.94)" }}>
      <div className="platform-container">
        <ScrollReveal>
          <SectionEyebrow code="SYS / 00">PROCESS</SectionEyebrow>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <p className="platform-kicker">HOW I WORK</p>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <h2>
            From intent to <span>infrastructure.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="platform-copy" style={{ marginBottom: "3rem" }}>
            Every project follows a structured development lifecycle. Each phase is transparent,
            iterative and designed to reduce risk before deployment.
          </p>
        </ScrollReveal>

        <div className="workflow-pipeline">
          {workflow.map((item, i) => (
            <ScrollReveal key={item.step} delay={i * 80} direction="left">
              <div className="workflow-node">
                <div className="workflow-node__marker">
                  <span className="workflow-node__number">{item.step}</span>
                  {i < workflow.length - 1 && <div className="workflow-node__line" />}
                </div>
                <div className="workflow-node__content">
                  <strong>{item.label}</strong>
                  <p>{item.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TECHNOLOGY STACK
   ═══════════════════════════════════════════════════════════════ */
function TechStack() {
  const categories = [
    {
      label: "FRONTEND",
      techs: ["React", "TypeScript", "Vite", "Next.js", "Tailwind CSS", "Framer Motion"],
    },
    {
      label: "BACKEND",
      techs: ["Node.js", "Express", "Python", "REST APIs", "GraphQL"],
    },
    {
      label: "AI & AUTOMATION",
      techs: ["OpenAI", "LangChain", "AI SDK", "Webhooks", "NLP"],
    },
    {
      label: "INFRASTRUCTURE",
      techs: ["Linux", "Docker", "Cloud", "CI/CD", "PostgreSQL", "Monitoring"],
    },
    {
      label: "DESIGN",
      techs: ["Figma", "Motion Design", "Design Systems", "Prototyping"],
    },
  ];

  return (
    <section className="platform-section" style={{ background: "rgba(5,7,9,.9)" }}>
      <div className="platform-container">
        <ScrollReveal>
          <SectionEyebrow code="SYS / 00">TECHNOLOGY MAP</SectionEyebrow>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <p className="platform-kicker">TECHNOLOGY STACK</p>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <h2>
            Tools of <span>the trade.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="platform-copy" style={{ marginBottom: "3rem" }}>
            Every technology is chosen for a reason — performance, reliability, ecosystem strength
            and fit for the specific problem being solved.
          </p>
        </ScrollReveal>

        <div className="tech-categories">
          {categories.map((cat, i) => (
            <ScrollReveal key={cat.label} delay={i * 80}>
              <div className="tech-category">
                <span className="tech-category__label">{cat.label}</span>
                <div className="tech-category__list">
                  {cat.techs.map((tech) => (
                    <span key={tech} className="tech-pill">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SYSTEMS SECTION
   ═══════════════════════════════════════════════════════════════ */
function SystemsSection() {
  const systems = [
    "AI SYSTEMS",
    "WEB SYSTEMS",
    "CLOUD SYSTEMS",
    "NETWORK SYSTEMS",
    "AUTOMATION",
    "SECURITY",
    "DIGITAL INFRASTRUCTURE",
  ];

  return (
    <section id="systems" className="platform-section">
      <div className="platform-container">
        <ScrollReveal>
          <SectionEyebrow code="SYS / 02">SYSTEMS ARCHITECTURE</SectionEyebrow>
        </ScrollReveal>

        <div className="platform-split">
          <div>
            <ScrollReveal delay={100}>
              <p className="platform-kicker">THE ECOSYSTEM</p>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <h2>
                Systems that stay <span>clear under pressure.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="platform-copy">
                From the interface to the infrastructure underneath it, ANONYMIKETECH designs connected
                systems that are observable, extensible and built to move.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={200} direction="right">
            <div className="system-grid">
              {systems.map((system, i) => (
                <button
                  className="system-node"
                  key={system}
                  onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                >
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <strong>{system}</strong>
                  <i>ONLINE</i>
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SERVICES SECTION — Premium service modules
   ═══════════════════════════════════════════════════════════════ */
function ServicesSection() {
  return (
    <section id="services" className="platform-section platform-section--services">
      <div className="platform-container">
        <ScrollReveal>
          <SectionEyebrow code="SYS / 03">SERVICE MODULES</SectionEyebrow>
        </ScrollReveal>

        <div className="platform-section-heading">
          <div>
            <ScrollReveal delay={100}>
              <p className="platform-kicker">WHAT I DO</p>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <h2>
                Capabilities with a <span>point of view.</span>
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={200}>
            <p className="platform-copy">
              Choose a module to inspect the capability, technology layer and next action.
            </p>
          </ScrollReveal>
        </div>

        <div className="service-grid">
          {SERVICE_SLUGS.map((slug, i) => {
            const s = SERVICES[slug];
            return (
              <ScrollReveal key={s.slug} delay={i * 60}>
                <a href={`/services/${s.slug}`} className="service-card service-card--linked">
                  <span className="service-code">{s.code}</span>
                  <h3>{s.name}</h3>
                  <p>{s.description}</p>
                  <div className="service-capabilities">
                    {s.capabilities.slice(0, 3).map((cap) => (
                      <span key={cap} className="service-cap-tag">
                        {cap}
                      </span>
                    ))}
                  </div>
                  <small>{s.technology.slice(0, 3).join(" / ")}</small>
                  <span className="service-link">
                    VIEW SERVICE <ArrowUpRight size={14} />
                  </span>
                </a>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ARCHIVE SECTION
   ═══════════════════════════════════════════════════════════════ */
function ArchiveSection({ onOpen }: { onOpen: (panel: Panel, value?: string) => void }) {
  return (
    <section id="archive" className="platform-section">
      <div className="platform-container">
        <ScrollReveal>
          <SectionEyebrow code="SYS / 04">PROJECT ARCHIVE</SectionEyebrow>
        </ScrollReveal>

        <div className="platform-section-heading">
          <div>
            <ScrollReveal delay={100}>
              <p className="platform-kicker">SELECTED SYSTEMS</p>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <h2>
                Work in <span>motion.</span>
              </h2>
            </ScrollReveal>
          </div>
        </div>

        <div className="archive-grid">
          {projects.map(([name, category, status, tech, description], i) => (
            <ScrollReveal key={name} delay={i * 80}>
              <article className="project-card">
                <div className="project-visual">
                  <span>{category}</span>
                  <strong>{name.slice(0, 2)}</strong>
                </div>
                <div className="project-meta">
                  <span>{status}</span>
                  <small>{tech}</small>
                </div>
                <h3>{name}</h3>
                <p>{description}</p>
                <button onClick={() => onOpen("project", name)}>
                  VIEW PROJECT <ArrowUpRight size={14} />
                </button>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ENGAGEMENT PANEL
   ═══════════════════════════════════════════════════════════════ */
function EngagementPanel({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="platform-modal" role="dialog" aria-modal="true" aria-label="Start a project">
      <div className="engage-panel">
        <button className="modal-close" onClick={onClose} aria-label="Close panel">
          <X size={20} />
        </button>
        {submitted ? (
          <div className="form-success">
            <Check size={28} />
            <p>REQUEST QUEUED</p>
            <small>Your project brief is staged locally. Connect a backend to transmit it.</small>
            <button onClick={onClose}>RETURN TO PLATFORM</button>
          </div>
        ) : (
          <>
            <SectionEyebrow code="LINK / 01">START A PROJECT</SectionEyebrow>
            <h2>
              Let&apos;s make the next <span>system.</span>
            </h2>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
              }}
            >
              <div className="form-grid">
                <label>
                  NAME
                  <input required name="name" />
                </label>
                <label>
                  EMAIL
                  <input required type="email" name="email" />
                </label>
                <label>
                  PHONE / WHATSAPP
                  <input name="phone" />
                </label>
                <label>
                  PROJECT TYPE
                  <select name="type" defaultValue="Web Development">
                    {SERVICE_SLUGS.map((slug) => (
                      <option key={slug}>{SERVICES[slug].name}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label>
                PROJECT DESCRIPTION
                <textarea required name="description" rows={4} />
              </label>
              <label>
                BUDGET RANGE
                <select name="budget" defaultValue="To be discussed">
                  <option>To be discussed</option>
                  <option>Under $5,000</option>
                  <option>$5,000 — $15,000</option>
                  <option>$15,000+</option>
                </select>
              </label>
              <button className="form-submit" type="submit">
                REQUEST CONSULTATION <ArrowUpRight size={16} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════════════ */
export function PlatformExperience() {
  const [panel, setPanel] = useState<Panel>(null);
  const [panelValue, setPanelValue] = useState("");
  const open = (next: Panel, value = "") => {
    setPanelValue(value);
    setPanel(next);
  };

  return (
    <>
      <WhatIBuild />
      <HowIWork />
      <SystemsSection />
      <TechStack />
      <ServicesSection />
      <ArchiveSection onOpen={open} />

      {/* CTA */}
      <section id="engage" className="platform-cta">
        <div className="platform-container">
          <ScrollReveal>
            <SectionEyebrow code="LINK / 02">OPEN CHANNEL</SectionEyebrow>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2>Have a system in mind?</h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <button onClick={() => open("engage")}>
              ENGAGE ANONYMIKETECH <ArrowUpRight size={18} />
            </button>
          </ScrollReveal>
        </div>
      </section>

      {panel === "engage" && <EngagementPanel onClose={() => setPanel(null)} />}
      {panel === "project" && (
        <div className="platform-modal" role="dialog" aria-modal="true">
          <div className="detail-panel">
            <button className="modal-close" onClick={() => setPanel(null)} aria-label="Close panel">
              <X size={20} />
            </button>
            <SectionEyebrow code="ARCHIVE / RECORD">PROJECT DETAIL</SectionEyebrow>
            <h2>{panelValue}</h2>
            <p className="platform-copy">
              This record is part of the ANONYMIKETECH build archive. Status and scope are intentionally
              transparent: live systems are distinguished from concepts and active development.
            </p>
            <div className="detail-list">
              <span>STATUS TRACE</span>
              <span>TECHNOLOGY MAP</span>
              <span>BUILD NOTES</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
