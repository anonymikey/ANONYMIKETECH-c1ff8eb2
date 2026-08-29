import type { ElementType } from "react";
import { ArrowUpRight, Lightning } from "@phosphor-icons/react";
import type { CommandItem } from "./CommandPalette";

type CommandActionsProps = {
  actions: CommandItem[];
  selectedId?: string;
  onSelect: (item: CommandItem) => void;
  onHover: (item: CommandItem) => void;
};

export function CommandActions({
  actions,
  selectedId,
  onSelect,
  onHover,
}: CommandActionsProps) {
  return (
    <section className="command-palette__actions" aria-labelledby="command-actions-heading">
      <div className="command-palette__actions-heading" id="command-actions-heading">
        <span className="command-palette__actions-title">
          <Lightning size={12} weight="fill" aria-hidden="true" />
          Quick actions
        </span>
        <span className="command-palette__actions-rule" />
        <span className="command-palette__actions-status">READY</span>
      </div>
      <div className="command-palette__action-grid">
        {actions.map((item) => {
          const Icon = item.icon as ElementType;
          const active = selectedId === item.id;
          return (
            <button
              type="button"
              key={item.id}
              className={`command-palette__action ${
                active ? "command-palette__action--active" : ""
              } ${item.disabled ? "command-palette__action--disabled" : ""}`}
              disabled={item.disabled}
              aria-disabled={item.disabled}
              onMouseEnter={() => onHover(item)}
              onClick={() => onSelect(item)}
              data-testid={`command-action-${item.id}`}
            >
              <span className="command-palette__action-icon" aria-hidden="true">
                <Icon size={16} weight={active ? "bold" : "regular"} />
              </span>
              <span>{item.label}</span>
              {item.disabled ? (
                <small>FUTURE</small>
              ) : (
                <ArrowUpRight className="command-palette__action-arrow" size={12} weight="bold" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}