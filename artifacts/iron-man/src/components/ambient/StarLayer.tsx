import { CSSProperties, useMemo } from "react";

type StarLayerProps = {
  lightweight?: boolean;
  reducedMotion?: boolean;
};

type StarStyle = CSSProperties & Record<`--${string}`, string | number>;

function sequence(index: number, seed: number) {
  const value = Math.sin(index * 17.71 + seed * 29.91) * 1000;
  return value - Math.floor(value);
}

export function StarLayer({ lightweight = false, reducedMotion = false }: StarLayerProps) {
  const stars = useMemo(
    () =>
      Array.from({ length: lightweight ? 10 : 24 }, (_, index) => ({
        id: index,
        x: sequence(index, 1) * 100,
        y: sequence(index, 4) * 76,
        size: 0.7 + sequence(index, 7) * 1.5,
        delay: sequence(index, 10) * -5,
        duration: 2.8 + sequence(index, 13) * 4,
      })),
    [lightweight],
  );

  return (
    <div className="ambient-layer ambient-stars" data-static={reducedMotion || undefined}>
      {stars.map((star) => {
        const style: StarStyle = {
          "--star-x": `${star.x.toFixed(2)}%`,
          "--star-y": `${star.y.toFixed(2)}%`,
          "--star-size": `${star.size.toFixed(2)}px`,
          "--star-delay": `${star.delay.toFixed(2)}s`,
          "--star-duration": `${star.duration.toFixed(2)}s`,
        };
        return <i key={star.id} className="ambient-star" style={style} />;
      })}
    </div>
  );
}
