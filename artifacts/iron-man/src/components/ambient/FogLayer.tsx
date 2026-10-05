type FogLayerProps = {
  lightweight?: boolean;
  reducedMotion?: boolean;
};

export function FogLayer({ lightweight = false, reducedMotion = false }: FogLayerProps) {
  return (
    <div className="ambient-layer ambient-fog" data-static={reducedMotion || undefined}>
      {!lightweight && (
        <div className="ambient-fog__beams">
          <span className="ambient-fog__beam ambient-fog__beam--one" />
          <span className="ambient-fog__beam ambient-fog__beam--two" />
          <span className="ambient-fog__beam ambient-fog__beam--three" />
        </div>
      )}
      <div className="ambient-fog__bottom" />
      <div className="ambient-fog__mist" />
    </div>
  );
}
