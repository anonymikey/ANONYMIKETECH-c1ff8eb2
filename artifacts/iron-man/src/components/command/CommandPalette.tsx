import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ElementType,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import {
  Archive,
  Atom,
  BookOpen,
  Briefcase,
  ChatsCircle,
  Cloud,
  Code,
  Command as CommandIcon,
  Cpu,
  Database,
  FileText,
  FolderOpen,
  GearSix,
  GlobeHemisphereWest,
  IdentificationCard,
  Moon,
  PaintBrush,
  PaperPlaneTilt,
  Pulse,
  SquaresFour,
  TerminalWindow,
  Wrench,
} from "@phosphor-icons/react";
import { CommandActions } from "./CommandActions";
import { CommandResults } from "./CommandResults";
import { CommandSearch } from "./CommandSearch";
import "./command.css";

export type CommandItem = {
  id: string;
  label: string;
  description: string;
  keywords: string[];
  icon: ElementType;
  href?: string;
  badge?: string;
  kind: "page" | "service" | "action";
  pinned?: boolean;
  disabled?: boolean;
};

export type CommandSection = {
  id: string;
  label: string;
  items: CommandItem[];
};

export type CommandPaletteProps = {
  items?: CommandItem[];
  quickActions?: CommandItem[];
  onNavigate?: (item: CommandItem) => void;
  initialOpen?: boolean;
};

const RECENT_STORAGE_KEY = "anonymiketech.command.recent";
const RECENT_SEED = ["page-synth", "page-systems"];

const DEFAULT_ITEMS: CommandItem[] = [
  {
    id: "page-home",
    label: "Home",
    description: "Return to the ANONYMIKETECH command deck",
    keywords: ["home", "hero", "start", "main"],
    icon: GlobeHemisphereWest,
    href: "/",
    kind: "page",
  },
  {
    id: "page-services",
    label: "Services",
    description: "Browse intelligent services and connected builds",
    keywords: ["services", "solutions", "ai", "internet", "builds"],
    icon: Briefcase,
    href: "/#services",
    kind: "service",
    pinned: true,
  },
  {
    id: "page-portfolio",
    label: "Portfolio",
    description: "Inspect selected systems and field work",
    keywords: ["portfolio", "work", "projects", "case studies", "cinematic"],
    icon: FolderOpen,
    href: "/#cinematic",
    kind: "page",
    pinned: true,
  },
  {
    id: "page-systems",
    label: "Systems",
    description: "View the current system status and capabilities",
    keywords: ["systems", "status", "capabilities", "nominal"],
    icon: Cpu,
    href: "/#systems",
    kind: "page",
  },
  {
    id: "page-archive",
    label: "Archive",
    description: "Open the ANONYMIKETECH archive index",
    keywords: ["archive", "library", "index", "history"],
    icon: Archive,
    href: "/#footer",
    kind: "page",
  },
  {
    id: "page-synth",
    label: "SYNTH",
    description: "Open the autonomous intelligence interface",
    keywords: ["synth", "ai", "intelligence", "assistant", "launch"],
    icon: Atom,
    href: "/#synth",
    kind: "page",
    pinned: true,
  },
  {
    id: "service-web",
    label: "Web Development",
    description: "Modern websites, dashboards, applications and custom platforms",
    keywords: ["service", "web", "development", "react", "frontend", "website"],
    icon: Code,
    href: "/services/web-development",
    kind: "service",
    pinned: true,
  },
  {
    id: "service-ai",
    label: "AI & Automation",
    description: "Agents, intelligent workflows, integrations and business automation",
    keywords: ["service", "ai", "automation", "intelligence", "agents", "workflows"],
    icon: Pulse,
    href: "/services/ai-automation",
    kind: "service",
    pinned: true,
  },
  {
    id: "service-chatbots",
    label: "Chatbots",
    description: "WhatsApp bots, customer support automation and conversational systems",
    keywords: ["service", "chatbot", "whatsapp", "bot", "conversation", "support"],
    icon: ChatsCircle,
    href: "/services/chatbots",
    kind: "service",
  },
  {
    id: "service-internet",
    label: "Internet Solutions",
    description: "WiFi deployment, ISP systems, VPN and connectivity architecture",
    keywords: ["service", "internet", "wifi", "vpn", "network", "infrastructure"],
    icon: GlobeHemisphereWest,
    href: "/services/internet-solutions",
    kind: "service",
  },
  {
    id: "service-cloud",
    label: "Cloud & VPS",
    description: "Hosting, infrastructure, server management and deployment systems",
    keywords: ["service", "cloud", "vps", "hosting", "server", "deployment"],
    icon: Cloud,
    href: "/services/cloud-vps",
    kind: "service",
  },
  {
    id: "service-design",
    label: "Digital Design",
    description: "Brand identity, UI systems, promotional graphics and digital experiences",
    keywords: ["service", "design", "brand", "ui", "ux", "graphics"],
    icon: PaintBrush,
    href: "/services/digital-design",
    kind: "service",
  },
  {
    id: "service-software",
    label: "Custom Software",
    description: "Specialized business platforms built around the way your team works",
    keywords: ["service", "software", "custom", "engineering", "platform", "systems"],
    icon: IdentificationCard,
    href: "/services/custom-software",
    kind: "service",
  },
];

const DEFAULT_ACTIONS: CommandItem[] = [
  {
    id: "action-services",
    label: "Open Services",
    description: "Jump to intelligent services",
    keywords: ["open", "services", "solutions"],
    icon: Briefcase,
    href: "/#services",
    kind: "action",
  },
  {
    id: "action-portfolio",
    label: "Open Portfolio",
    description: "Jump to selected work",
    keywords: ["open", "portfolio", "work"],
    icon: SquaresFour,
    href: "/#cinematic",
    kind: "action",
  },
  {
    id: "action-contact",
    label: "Open Contact",
    description: "Start a conversation",
    keywords: ["open", "contact", "engage", "email"],
    icon: PaperPlaneTilt,
    href: "/#engage",
    kind: "action",
  },
  {
    id: "action-archive",
    label: "Open Archive",
    description: "Access the archive index",
    keywords: ["open", "archive", "index"],
    icon: Archive,
    href: "/#footer",
    kind: "action",
  },
  {
    id: "action-systems",
    label: "Open Systems",
    description: "Inspect active capabilities",
    keywords: ["open", "systems", "status"],
    icon: Database,
    href: "/#systems",
    kind: "action",
  },
  {
    id: "action-synth",
    label: "Launch SYNTH",
    description: "Wake autonomous intelligence",
    keywords: ["launch", "synth", "ai", "assistant"],
    icon: Atom,
    href: "/#synth",
    kind: "action",
  },
  {
    id: "action-theme",
    label: "Toggle Theme",
    description: "Theme controls are queued for a future release",
    keywords: ["theme", "dark", "light", "appearance"],
    icon: Moon,
    kind: "action",
    disabled: true,
  },
  {
    id: "action-diagnostics",
    label: "Open Diagnostics",
    description: "Run a visual systems check",
    keywords: ["diagnostics", "diagnostic", "health", "check"],
    icon: Wrench,
    href: "/#cinematic",
    kind: "action",
  },
  {
    id: "action-console",
    label: "Open Console",
    description: "Connect to the SYNTH console",
    keywords: ["console", "terminal", "synth", "command"],
    icon: TerminalWindow,
    href: "/#synth",
    kind: "action",
  },
];

function readRecentIds() {
  try {
    const value = JSON.parse(localStorage.getItem(RECENT_STORAGE_KEY) ?? "[]");
    return Array.isArray(value)
      ? value.filter((id): id is string => typeof id === "string").slice(0, 5)
      : [];
  } catch {
    return [];
  }
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  );
}

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export function CommandPalette({
  items,
  quickActions,
  onNavigate,
  initialOpen = false,
}: CommandPaletteProps) {
  const searchItems = useMemo(() => items ?? DEFAULT_ITEMS, [items]);
  const actions = useMemo(() => quickActions ?? DEFAULT_ACTIONS, [quickActions]);
  const allItems = useMemo(() => [...searchItems, ...actions], [actions, searchItems]);
  const itemMap = useMemo(
    () => new Map(allItems.map((item) => [item.id, item])),
    [allItems],
  );
  const [open, setOpen] = useState(initialOpen);
  const [query, setQuery] = useState("");
  const [recentIds, setRecentIds] = useState<string[]>(() => readRecentIds());
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const filteredItems = useMemo(() => {
    const needle = normalize(query);
    if (!needle) return searchItems;
    return searchItems.filter((item) =>
      normalize([item.label, item.description, ...item.keywords].join(" ")).includes(needle),
    );
  }, [query, searchItems]);

  const sections = useMemo<CommandSection[]>(() => {
    if (normalize(query)) {
      return filteredItems.length
        ? [{ id: "search", label: "Search results", items: filteredItems }]
        : [];
    }

    const recent = recentIds
      .map((id) => itemMap.get(id))
      .filter((item): item is CommandItem => Boolean(item));
    const pinned = searchItems.filter((item) => item.pinned);
    const next: CommandSection[] = [];
    if (recent.length) next.push({ id: "recent", label: "Recent pages", items: recent });
    if (pinned.length) next.push({ id: "pinned", label: "Pinned shortcuts", items: pinned });
    next.push({ id: "pages", label: "System index", items: searchItems });
    return next;
  }, [filteredItems, itemMap, query, recentIds, searchItems]);

  const visibleItems = useMemo(
    () => [
      ...sections.flatMap((section) => section.items),
      ...actions,
    ],
    [actions, query, sections],
  );
  const selectedItem = visibleItems[selectedIndex];

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, open]);

  useEffect(() => {
    if (!open) return;
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 20);
    document.body.classList.add("command-palette-open");
    return () => {
      window.clearTimeout(focusTimer);
      document.body.classList.remove("command-palette-open");
    };
  }, [open]);

  useEffect(() => {
    const onGlobalKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
        return;
      }
      if (event.key === "/" && !isTypingTarget(event.target)) {
        event.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onGlobalKeyDown);
    return () => window.removeEventListener("keydown", onGlobalKeyDown);
  }, []);

  const remember = useCallback((item: CommandItem) => {
    if (item.kind === "action" || item.disabled) return;
    setRecentIds((current) => {
      const next = [item.id, ...current.filter((id) => id !== item.id)].slice(0, 5);
      try {
        localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Recent navigation remains available for this session.
      }
      return next;
    });
  }, []);

  const navigate = useCallback(
    (item: CommandItem) => {
      if (!item.href || item.disabled) return;
      remember(item);
      onNavigate?.(item);
      window.history.pushState({}, "", item.href);
      setOpen(false);
      setQuery("");
    },
    [onNavigate, remember],
  );

  const selectItem = useCallback(
    (item: CommandItem) => {
      navigate(item);
    },
    [navigate],
  );

  const onPaletteKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      return;
    }
    if (!visibleItems.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((current) => (current + 1) % visibleItems.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((current) => (current - 1 + visibleItems.length) % visibleItems.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (selectedItem) selectItem(selectedItem);
    } else if (event.key === "Tab") {
      event.preventDefault();
      if (selectedItem) {
        setQuery(selectedItem.label);
        window.requestAnimationFrame(() => inputRef.current?.focus());
      }
    }
  };

  const setSelectedItem = (item: CommandItem) => {
    const index = visibleItems.findIndex((candidate) => candidate.id === item.id);
    if (index >= 0) setSelectedIndex(index);
  };

  if (!open) return null;

  return (
    <div
      className="command-palette"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setOpen(false);
      }}
      data-testid="command-palette"
    >
      <div
        className="command-palette__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="command-palette-title"
        onKeyDown={onPaletteKeyDown}
        data-testid="command-palette-panel"
      >
        <div className="command-palette__topline" aria-hidden="true">
          <span>ANONYMIKETECH / COMMAND DECK</span>
          <span className="command-palette__topline-signal">
            <span />
            LINK LIVE
          </span>
        </div>
        <div className="command-palette__heading">
          <div>
            <span className="command-palette__eyebrow">
              <CommandIcon size={12} weight="bold" aria-hidden="true" />
              SYSTEM NAVIGATION
            </span>
            <h2 id="command-palette-title">Where to next?</h2>
          </div>
          <button
            type="button"
            className="command-palette__close"
            onClick={() => setOpen(false)}
            aria-label="Close command palette"
            data-testid="command-palette-close"
          >
            <span>ESC</span>
          </button>
        </div>
        <CommandSearch
          inputRef={inputRef}
          value={query}
          onChange={setQuery}
          onClear={() => setQuery("")}
          activeDescendant={selectedItem ? `command-result-${selectedItem.id}` : undefined}
        />
        <div className="command-palette__body">
          <CommandResults
            sections={sections}
            selectedId={selectedItem?.id}
            onSelect={selectItem}
            onHover={setSelectedItem}
          />
          <CommandActions
            actions={actions}
            selectedId={selectedItem?.id}
            onSelect={selectItem}
            onHover={setSelectedItem}
          />
        </div>
        <footer className="command-palette__footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> open</span>
          <span><kbd>TAB</kbd> complete</span>
          <span><kbd>ESC</kbd> close</span>
        </footer>
      </div>
    </div>
  );
}