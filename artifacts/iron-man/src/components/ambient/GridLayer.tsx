import { CSSProperties } from "react";

type GridLayerProps = {
  lightweight?: boolean;
  reducedMotion?: boolean;
};

type GridStyle = CSSProperties & Record<`--${string}`, string | number>;

const blueprintPaths = [
  "M4 72 C18 72 22 54 38 54 S62 68 79 42 95 30 100 31",
  "M0 26 H21 L34 39 H60 L75 21 H100",
  "M8 90 V65 H28 L45 80 H70 V58 H96",
  "M52 0 V22 L67 37 V64 L52 79 V100",
];

const streamPositions = [12, 29, 47, 66, 84];

export function GridLayer({ lightweight = false, reducedMotion = false }: GridLayerProps) {
  return (
    <div className="ambient-layer ambient-grid" data-static={reducedMotion || undefined}>
      <div className="ambient-grid__plane" />
      <div className="ambient-grid__horizon" />
      <svg className="ambient-grid__blueprint" viewBox="0 0 100 100" preserveAspectRatio="none">
        {blueprintPaths.map((path, index) => (
          <path key={path} className={`ambient-blueprint ambient-blueprint--${index + 1}`} d={path} />
        ))}
      </svg>
      {!lightweight &&
        streamPositions.map((position, index) => {
          const style: GridStyle = {
            "--stream-x": `${position}%`,
            "--stream-delay": `${-index * 1.8}s`,
            "--stream-duration": `${7 + index * 0.7}s`,
          };
          return <span key={position} className="ambient-data-stream" style={style} />;
        })}
    </div>
  );
}
