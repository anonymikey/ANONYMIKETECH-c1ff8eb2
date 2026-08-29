import type { RefObject } from "react";
import { Command, MagnifyingGlass, X } from "@phosphor-icons/react";

type CommandSearchProps = {
  value: string;
  inputRef: RefObject<HTMLInputElement | null>;
  onChange: (value: string) => void;
  onClear: () => void;
  activeDescendant?: string;
};

export function CommandSearch({
  value,
  inputRef,
  onChange,
  onClear,
  activeDescendant,
}: CommandSearchProps) {
  return (
    <div className="command-palette__search-wrap">
      <MagnifyingGlass
        className="command-palette__search-icon"
        size={19}
        weight="regular"
        aria-hidden="true"
      />
      <input
        ref={inputRef}
        id="command-palette-search"
        className="command-palette__search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search the ANONYMIKETECH system..."
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        role="combobox"
        aria-autocomplete="list"
        aria-controls="command-palette-results"
        aria-expanded="true"
        aria-activedescendant={activeDescendant}
        data-testid="command-palette-search"
      />
      {value ? (
        <button
          type="button"
          className="command-palette__clear"
          onClick={onClear}
          aria-label="Clear command search"
          data-testid="command-palette-clear"
        >
          <X size={14} weight="bold" aria-hidden="true" />
        </button>
      ) : (
        <span className="command-palette__search-key" aria-hidden="true">
          <Command size={13} weight="bold" />
          <span>K</span>
        </span>
      )}
    </div>
  );
}