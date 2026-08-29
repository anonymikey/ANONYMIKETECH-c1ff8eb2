import type { MutableRefObject } from "react";

type Props = {
  particleRefs: MutableRefObject<(HTMLSpanElement | null)[]>;
};

export function CursorParticles({ particleRefs }: Props) {
  return (
    <span className="premium-cursor__particles" aria-hidden="true">
      {Array.from({ length: 20 }, (_, index) => (
        <span
          key={index}
          ref={(node) => {
            particleRefs.current[index] = node;
          }}
          className={`premium-cursor__particle premium-cursor__particle--${index % 4}`}
        />
      ))}
    </span>
  );
}