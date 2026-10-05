import { ArrowUpRight } from "@phosphor-icons/react";
import { Logo } from "@/components/ui/Logo";

const FOOTER_LINKS: [string, string, string][] = [
  ["AI Solutions", "Intelligent systems", "/services/ai-automation"],
  ["Web Solutions", "Digital experiences", "/services/web-development"],
  ["Cloud Solutions", "Secure infrastructure", "/services/cloud-vps"],
  [
    "Internet Solutions",
    "Connected services",
    "/services/internet-solutions",
  ],
  ["Future Systems", "Built to scale", "/services/custom-software"],
  ["ANONYMIKETECH", "Innovating the Future", "/"],
];

export function Footer() {
  return (
    <footer
      id="footer"
      className="border-t border-white/5 bg-background px-6 py-14 md:px-10 md:py-16"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
          <div className="flex flex-col gap-3">
            <Logo className="h-auto w-[250px] max-w-full" />
            <p className="max-w-[38ch] font-sans text-sm leading-relaxed text-zinc-400">
              &copy; ANONYMIKETECH &mdash; Innovating the Future.
              AI &bull; Web &bull; Cloud &bull; Internet Solutions.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-10 gap-y-3 md:grid-cols-3">
            {FOOTER_LINKS.map(([name, note, href]) => (
              <a
                key={name}
                href={href}
                className="group flex flex-col gap-1"
              >
                <span className="font-sans text-[13px] font-medium text-foreground transition-colors group-hover:text-accent">
                  {name}
                  <ArrowUpRight
                    size={11}
                    weight="bold"
                    className="ml-1 inline-block align-baseline opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                  {note}
                </span>
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/5 pt-6 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500 md:flex-row md:items-center md:justify-between">
          <span>ANONYMIKETECH &nbsp;&middot;&nbsp; SYSTEM ONLINE</span>
          <span>AI &bull; Web &bull; Cloud &bull; Internet Solutions</span>
        </div>
      </div>
    </footer>
  );
}
