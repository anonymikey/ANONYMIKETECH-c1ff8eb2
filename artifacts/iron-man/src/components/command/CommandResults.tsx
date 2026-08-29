import type { ElementType } from "react";
import { ArrowUpRight, CaretRight, ClockCounterClockwise, PushPin } from "@phosphor-icons/react";
import type { CommandItem, CommandSection } from "./CommandPalette";

type CommandResultsProps = {
  sections: CommandSection[];
  selectedId?: string;
  onSelect: (item: CommandItem) => void;
  onHover: (item: CommandItem) => void;
};

export function CommandResults({
  sections,
  selectedId,
  onSelect,
  onHover,
}: CommandResultsProps) {
  if (!sections.length) {
    return (
      <div className="command-palette__empty" data-testid="command-palette-empty">
        <span className="command-palette__empty-orbit" aria-hidden="true" />
        <strong>NO MATCHING SIGNAL</strong>
        <span>Try a page, service, system, or action.</span>
      </div>
    );
  }

  return (
    <div
      id="command-palette-results"
      className="command-palette__results"
      role="listbox"
      aria-label="Command results"
      data-testid="command-palette-results"
    >
      {sections.map((section) => (
        <section className="command-palette__section" key={section.id}>
          <div className="command-palette__section-heading">
            {section.id === "recent" ? (
              <ClockCounterClockwise size={12} weight="bold" aria-hidden="true" />
            ) : null}
            {section.id === "pinned" ? (
              <PushPin size={12} weight="bold" aria-hidden="true" />
            ) : null}
            <span>{section.label}</span>
            <span className="command-palette__section-count">{section.items.length}</span>
          </div>
          <div className="command-palette__section-items">
            {section.items.map((item) => {
              const Icon = item.icon as ElementType;
              const active = selectedId === item.id;
              return (
                <button
                  key={item.id}
                  id={`command-result-${item.id}`}
                  type="button"
                  className={`command-palette__result ${
                    active ? "command-palette__result--active" : ""
                  } ${item.disabled ? "command-palette__result--disabled" : ""}`}
                  role="option"
                  aria-selected={active}
                  aria-disabled={item.disabled}
                  disabled={item.disabled}
                  onMouseEnter={() => onHover(item)}
                  onClick={() => onSelect(item)}
                  data-testid={`command-result-${item.id}`}
                >
                  <span className="command-palette__result-icon" aria-hidden="true">
                    <Icon size={17} weight={active ? "bold" : "regular"} />
                  </span>
                  <span className="command-palette__result-copy">
                    <span className="command-palette__result-label">{item.label}</span>
                    <span className="command-palette__result-description">
                      {item.description}
                    </span>
                  </span>
                  {item.badge ? (
                    <span className="command-palette__result-badge">{item.badge}</span>
                  ) : null}
                  {active ? (
                    <span className="command-palette__result-enter">
                      <span>↵</span>
                      <CaretRight size={13} weight="bold" aria-hidden="true" />
                    </span>
                  ) : (
                    <ArrowUpRight
                      className="command-palette__result-arrow"
                      size={14}
                      weight="bold"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}