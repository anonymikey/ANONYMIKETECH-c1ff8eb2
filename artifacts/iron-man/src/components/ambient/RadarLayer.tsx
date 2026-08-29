import { CSSProperties, useMemo } from "react";

type RadarLayerProps = {
  lightweight?: boolean;
  reducedMotion?: boolean;
};

type RadarStyle = CSSProperties & Record<`--${string}`, string | number>;

function sequence(index: number, seed: number) {
  const value = Math.sin(index * 19.17 + seed * 41.73) * 1000;
  return value - Math.floor(value);
}

export function RadarLayer({ lightweight = false, reducedMotion = false }: RadarLayerProps) {
  const hudCircles = useMemo(
    () =>
      Array.from({ length: lightweight ? 4 : 8 }, (_, index) => ({
        id: index,
        x: 12 + sequence(index, 3) * 76,
        y: 18 + sequence(index, 7) * 60,
        size: 14 + sequence(index, 9) * 42,
        delay: sequence(index, 13) * -8,
      })),
    [lightweight],
  );

  return (
    <div className="ambient-layer ambient-radar" data-static={reducedMotion || undefined}>
      <div className="ambient-radar__unit">
        <div className="ambient-radar__rings" />
        <div className="ambient-radar__crosshair" />
        <div className="ambient-radar__sweep" />
      </div>
      {hudCircles.map((circle) => {
        const style: RadarStyle = {
          "--hud-x": `${circle.x}%`,
          "--hud-y": `${circle.y}%`,
          "--hud-size": `${circle.size}px`,
          "--hud-delay": `${circle.delay.toFixed(2)}s`,
        };
        return <span key={circle.id} className="ambient-hud-circle" style={style} />;
      })}
    </div>
  );
}
