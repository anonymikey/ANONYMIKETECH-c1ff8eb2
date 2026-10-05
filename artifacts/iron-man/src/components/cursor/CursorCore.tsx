import { useCursor } from "./useCursor";

export function CursorCore() {
  const { mode } = useCursor();

  return (
    <span className="premium-cursor__core-wrap" aria-hidden="true">
      <span className="premium-cursor__core" />
      {mode === "text" ? <span className="premium-cursor__caret" /> : null}
    </span>
  );
}