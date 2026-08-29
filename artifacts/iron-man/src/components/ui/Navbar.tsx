"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, CaretDown, List, X } from "@phosphor-icons/react";
import { Logo } from "@/components/ui/Logo";
import { HudFrame } from "@/components/ui/HudFrame";
import { useScrollDirection } from "@/components/hooks/useScrollDirection";
import { SERVICES, SERVICE_SLUGS } from "@/lib/services";

type ServiceItem = {
  slug: string;
  code: string;
  name: string;
  description: string;
  icon: string;
};

const SERVICE_ITEMS: ServiceItem[] = SERVICE_SLUGS.map((slug) => {
  const s = SERVICES[slug];
  const icons: Record<string, string> = {
    "web-development": "</>",
    "ai-automation": "AI",
    chatbots: ">>",
    "internet-solutions": "∞",
    "cloud-vps": "☁",
    "digital-design": "◆",
    "custom-software": "{}",
  };
  return {
    slug: s.slug,
    code: s.code,
    name: s.name,
    description: s.tagline,
    icon: icons[slug] || "//",
  };
});

function WhatIDoDropdown({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute left-1/2 top-full z-50 mt-0 w-[680px] -translate-x-1/2 pt-3"
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0e]/95 backdrop-blur-2xl backdrop-saturate-150 shadow-2xl shadow-black/50">
        {/* HUD corner brackets */}
        <div className="pointer-events-none absolute left-3 top-3 text-accent/60">
          <HudFrame corner="tl" size={18} />
        </div>
        <div className="pointer-events-none absolute right-3 top-3 text-accent/60">
          <HudFrame corner="tr" size={18} />
        </div>
        <div className="pointer-events-none absolute bottom-3 left-3 text-accent/60">
          <HudFrame corner="bl" size={18} />
        </div>
        <div className="pointer-events-none absolute bottom-3 right-3 text-accent/60">
          <HudFrame corner="br" size={18} />
        </div>

        {/* Header */}
        <div className="border-b border-white/8 px-6 py-4">
          <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.28em] text-accent">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(212,162,47,0.85)]" />
            SERVICE MODULES // ACTIVE
          </div>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-2 gap-0">
          {SERVICE_ITEMS.map((service) => (
            <a
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group relative flex items-start gap-4 border-b border-r border-white/6 px-6 py-5 transition-colors duration-200 hover:bg-white/[0.03]"
              onClick={() => onClose()}
            >
              {/* Icon */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] font-mono text-[11px] text-accent transition-all duration-200 group-hover:border-accent/30 group-hover:bg-accent/[0.08]">
                {service.icon}
              </div>
              {/* Text */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent/70">
                    {service.code}
                  </span>
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-foreground">
                    {service.name}
                  </span>
                </div>
                <p className="max-w-[32ch] font-sans text-[12px] leading-snug text-zinc-500">
                  {service.description}
                </p>
              </div>
              {/* Hover arrow */}
              <ArrowUpRight
                size={12}
                weight="bold"
                className="absolute right-4 top-5 text-zinc-600 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent group-hover:opacity-100"
              />
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/8 px-6 py-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-600">
            {SERVICE_ITEMS.length} modules online
          </span>
          <a
            href="/#services"
            className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-accent/80 transition-colors hover:text-accent"
            onClick={() => onClose()}
          >
            View all
            <ArrowUpRight size={10} weight="bold" />
          </a>
        </div>
      </div>
    </div>
  );
}

function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape key support
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Panel */}
      <div className="absolute inset-y-0 right-0 flex w-[min(380px,85vw)] flex-col border-l border-white/10 bg-[#0c0c0e]/98 backdrop-blur-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/8 px-6 py-5">
          <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.28em] text-accent">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(212,162,47,0.85)]" />
            NAVIGATION
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition-colors hover:text-foreground"
            aria-label="Close menu"
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-4 py-4">
          {/* What I Do section */}
          <div className="mb-2">
            <button
              onClick={() =>
                setExpandedSection(
                  expandedSection === "services" ? null : "services"
                )
              }
              className="flex w-full items-center justify-between px-3 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground transition-colors hover:text-accent"
              aria-expanded={expandedSection === "services"}
            >
              <span className="flex items-center gap-2">
                <span className="text-accent/70">◆</span>
                What I Do
              </span>
              <CaretDown
                size={14}
                className={`transition-transform duration-200 ${expandedSection === "services" ? "rotate-180" : ""}`}
              />
            </button>
            {expandedSection === "services" && (
              <div className="ml-4 mt-1 space-y-1 border-l border-white/8 pl-4">
                {SERVICE_ITEMS.map((service) => (
                  <a
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/[0.04]"
                    onClick={onClose}
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-white/10 font-mono text-[9px] text-accent">
                      {service.icon}
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground">
                        {service.name}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Other nav items */}
          {[
            { href: "/#synth", label: "SYNTH", icon: "◈" },
            { href: "/#systems", label: "Systems", icon: "⬡" },
            { href: "/#archive", label: "Archive", icon: "▤" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground transition-colors hover:text-accent"
              onClick={onClose}
            >
              <span className="text-accent/70">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>

        {/* Footer CTA */}
        <div className="border-t border-white/8 px-6 py-5">
          <a
            href="/#engage"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-accent/35 bg-accent/[0.08] px-5 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-accent transition-all duration-200 hover:bg-accent/[0.14]"
            onClick={onClose}
          >
            Engage
            <ArrowUpRight size={13} weight="bold" />
          </a>
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { isVisible, isAtTop } = useScrollDirection({ threshold: 10 });
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const megaTimeoutRef = useRef<number | null>(null);
  const megaContainerRef = useRef<HTMLDivElement>(null);
  const isMobileRef = useRef(false);

  // Detect mobile/touch on mount and on resize
  useEffect(() => {
    const check = () => {
      isMobileRef.current =
        window.matchMedia("(pointer: coarse)").matches ||
        window.innerWidth < 768;
    };
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Desktop: hover to open with generous delay
  const handleMegaEnter = useCallback(() => {
    if (isMobileRef.current) return;
    if (megaTimeoutRef.current) {
      clearTimeout(megaTimeoutRef.current);
      megaTimeoutRef.current = null;
    }
    setMegaOpen(true);
  }, []);

  const handleMegaLeave = useCallback(() => {
    if (isMobileRef.current) return;
    megaTimeoutRef.current = window.setTimeout(() => {
      setMegaOpen(false);
    }, 300);
  }, []);

  // Click to toggle (works on both mobile and desktop)
  const handleMegaToggle = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setMegaOpen((prev) => !prev);
    },
    []
  );

  // Close mega menu on route change
  useEffect(() => {
    const close = () => setMegaOpen(false);
    window.addEventListener("popstate", close);
    return () => window.removeEventListener("popstate", close);
  }, []);

  // Close mega menu on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMegaOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      {/* ─── HEADER (hides on scroll down, shows on scroll up) ─── */}
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ease-out ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        } ${
          scrolled
            ? "border-b border-white/8 bg-[#0a0a0b]/80 backdrop-blur-2xl backdrop-saturate-150 shadow-lg shadow-black/20"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-3.5 md:px-8 md:py-4">
          {/* Logo */}
          <a
            href="/"
            data-page-shared="logo"
            className="flex w-[170px] items-center text-foreground md:w-[210px]"
            aria-label="ANONYMIKETECH home"
          >
            <Logo className="h-auto w-full" />
          </a>

          {/* Desktop nav */}
          <nav
            data-page-shared="nav"
            className="hidden items-center gap-1 md:flex"
          >
            {/* What I Do — hover mega menu (desktop) / click toggle (mobile) */}
            <div
              ref={megaContainerRef}
              className="relative"
              onMouseEnter={handleMegaEnter}
              onMouseLeave={handleMegaLeave}
            >
              <button
                onClick={handleMegaToggle}
                aria-expanded={megaOpen}
                aria-haspopup="true"
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors duration-200 ${
                  megaOpen
                    ? "text-foreground bg-white/[0.06]"
                    : "text-zinc-400 hover:text-foreground"
                }`}
              >
                What I Do
                <CaretDown
                  size={12}
                  className={`transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`}
                />
              </button>
              <WhatIDoDropdown
                isOpen={megaOpen}
                onClose={() => setMegaOpen(false)}
              />
            </div>

            <a
              href="/#synth"
              className="rounded-lg px-3 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400 transition-colors hover:text-foreground"
            >
              SYNTH
            </a>
            <a
              href="/#systems"
              className="rounded-lg px-3 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400 transition-colors hover:text-foreground"
            >
              Systems
            </a>
            <a
              href="/#archive"
              className="rounded-lg px-3 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400 transition-colors hover:text-foreground"
            >
              Archive
            </a>
          </nav>

          {/* Right side — desktop only CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              href="/#engage"
              data-cursor-magnet
              className="group flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.20em] text-foreground backdrop-blur-md transition-all duration-200 hover:bg-white/[0.08] hover:border-white/20 active:translate-y-[1px]"
            >
              Engage
              <ArrowUpRight
                size={13}
                weight="bold"
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>

        {/* Bottom glow line when scrolled */}
        {scrolled && (
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        )}
      </header>

      {/* ─── MOBILE HAMBURGER (SEPARATE from header — always clickable) ─── */}
      <button
        className={`fixed right-5 top-3.5 z-50 flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#0a0a0b]/80 backdrop-blur-xl text-zinc-400 transition-all duration-300 md:hidden ${
          mobileOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        } ${
          isVisible
            ? "translate-y-0"
            : scrolled
              ? "translate-y-0"
              : "translate-y-0"
        }`}
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation"
      >
        <List size={18} />
      </button>

      {/* ─── MOBILE MENU ─── */}
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
