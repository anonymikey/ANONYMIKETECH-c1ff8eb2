import { CSSProperties, useMemo } from "react";

type ParticleLayerProps = {
  lightweight?: boolean;
  reducedMotion?: boolean;
};

type ParticleStyle = CSSProperties & Record<`--${string}`, string | number>;

function sequence(index: number, seed: number) {
  const value = Math.sin(index * 12.9898 + seed * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

export function ParticleLayer({ lightweight = false, reducedMotion = false }: ParticleLayerProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: lightweight ? 18 : 42 }, (_, index) => ({
        id: index,
        x: 3 + sequence(index, 1.1) * 94,
        y: 7 + sequence(index, 2.7) * 82,
        size: 1 + sequence(index, 4.3) * (lightweight ? 1.5 : 2.8),
        depth: 0.12 + sequence(index, 6.2) * 0.58,
        duration: 11 + sequence(index, 8.4) * 15,
        delay: sequence(index, 9.8) * -18,
        drift: -16 + sequence(index, 11.5) * 32,
      })),
    [lightweight],
  );

  return (
    <div className="ambient-layer ambient-particles" data-static={reducedMotion || undefined}>
      {particles.map((particle) => {
        const style: ParticleStyle = {
          "--particle-x": `${particle.x}%`,
          "--particle-y": `${particle.y}%`,
          "--particle-size": `${particle.size.toFixed(2)}px`,
          "--particle-depth": particle.depth,
          "--particle-duration": `${particle.duration.toFixed(2)}s`,
          "--particle-delay": `${particle.delay.toFixed(2)}s`,
          "--particle-drift": `${particle.drift.toFixed(2)}px`,
        };
        return <i key={particle.id} className="ambient-particle" style={style} />;
      })}
    </div>
  );
}
