import { CSSProperties } from "react";

type HexLayerProps = {
  lightweight?: boolean;
  reducedMotion?: boolean;
};

type HexStyle = CSSProperties & Record<`--${string}`, string | number>;

const nodes = [
  [11, 35], [22, 18], [34, 48], [46, 28], [57, 57], [69, 24], [82, 43], [91, 20],
  [19, 74], [42, 81], [65, 76], [84, 70],
];

const links = [
  [0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [3, 5], [4, 5], [4, 6], [5, 6],
  [5, 7], [6, 7], [0, 8], [2, 8], [2, 9], [4, 9], [4, 10], [6, 10], [6, 11],
];

const wireframes = [
  { x: "13%", y: "20%", size: 72, delay: "-4s", type: "cube" },
  { x: "78%", y: "62%", size: 58, delay: "-9s", type: "diamond" },
  { x: "61%", y: "15%", size: 34, delay: "-2s", type: "hex" },
];

export function HexLayer({ lightweight = false, reducedMotion = false }: HexLayerProps) {
  return (
    <div className="ambient-layer ambient-hex" data-static={reducedMotion || undefined}>
      <svg className="ambient-hex__network" viewBox="0 0 100 100" preserveAspectRatio="none">
        {links.map(([from, to], index) => (
          <line
            key={`${from}-${to}`}
            className={`ambient-hex__link ambient-hex__link--${index % 3}`}
            x1={nodes[from][0]}
            y1={nodes[from][1]}
            x2={nodes[to][0]}
            y2={nodes[to][1]}
          />
        ))}
        {nodes.map(([x, y], index) => (
          <circle key={`${x}-${y}`} className="ambient-hex__node" cx={x} cy={y} r={index % 3 === 0 ? 0.7 : 0.45} />
        ))}
      </svg>
      {!lightweight &&
        wireframes.map((shape, index) => {
          const style: HexStyle = {
            "--wire-x": shape.x,
            "--wire-y": shape.y,
            "--wire-size": `${shape.size}px`,
            "--wire-delay": shape.delay,
          };
          return (
            <span
              key={shape.type}
              className={`ambient-wireframe ambient-wireframe--${shape.type} ambient-wireframe--${index + 1}`}
              style={style}
            />
          );
        })}
    </div>
  );
}
