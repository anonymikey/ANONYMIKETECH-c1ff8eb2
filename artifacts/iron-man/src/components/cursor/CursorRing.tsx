import { useCursor } from "./useCursor";

export function CursorRing() {
  const { mode } = useCursor();

  return (
    <span className="premium-cursor__ring-wrap" aria-hidden="true">
      <span className="premium-cursor__ring">
        <span className="premium-cursor__ring-segment premium-cursor__ring-segment--one" />
        <span className="premium-cursor__ring-segment premium-cursor__ring-segment--two" />
        <span className="premium-cursor__ring-marker premium-cursor__ring-marker--one" />
        <span className="premium-cursor__ring-marker premium-cursor__ring-marker--two" />
        <span className="premium-cursor__ring-marker premium-cursor__ring-marker--three" />
      </span>
      {mode === "synth" ? <span className="premium-cursor__synth-hexagon" /> : null}
    </span>
  );
}