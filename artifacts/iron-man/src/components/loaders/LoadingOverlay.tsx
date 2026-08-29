import { BrandMark, Logo } from "@/components/ui/Logo";

type Props = {
  progress: number;
  status: string;
  mini?: boolean;
};

export function LoadingOverlay({ progress, status, mini = false }: Props) {
  const percentage = Math.round(Math.min(0.99, Math.max(0, progress)) * 100);

  return (
    <div className={`loading-overlay ${mini ? "loading-overlay--mini" : ""}`}>
      <div className="loading-overlay__wash" />
      <div className="loading-overlay__hud loading-overlay__hud--top">
        <Logo className="h-auto w-[190px] md:w-[250px]" />
        <span className="loading-overlay__session">
          {mini ? "SESSION RESUME" : "GLOBAL BOOT // 001"}
        </span>
      </div>

      <div className="loading-overlay__center">
        {mini ? (
          <div className="loading-mini-core" aria-hidden="true">
            <span className="loading-mini-core__ring loading-mini-core__ring--one" />
            <span className="loading-mini-core__ring loading-mini-core__ring--two" />
            <BrandMark className="h-24 w-24" animated />
          </div>
        ) : (
          <div className="loading-boot-core" aria-hidden="true">
            <span className="loading-boot-core__bracket loading-boot-core__bracket--tl" />
            <span className="loading-boot-core__bracket loading-boot-core__bracket--tr" />
            <span className="loading-boot-core__bracket loading-boot-core__bracket--bl" />
            <span className="loading-boot-core__bracket loading-boot-core__bracket--br" />
            <BrandMark className="h-32 w-32 md:h-40 md:w-40" animated />
          </div>
        )}
        <p className="loading-overlay__eyebrow">
          <span className="loading-overlay__dot" />
          ANONYMIKETECH // {mini ? "RECONNECTING" : "SYSTEM INITIALIZING"}
        </p>
        <p className="loading-overlay__status">{status}</p>
        <div className="loading-overlay__progress">
          <span style={{ width: `${percentage}%` }} />
        </div>
        <div className="loading-overlay__readout">
          <span>{mini ? "Resuming system" : "Loading global system"}</span>
          <span>{percentage}%</span>
        </div>
      </div>

      <div className="loading-overlay__hud loading-overlay__hud--bottom">
        <span>AI &bull; WEB &bull; CLOUD &bull; INTERNET</span>
        <span>{mini ? "FAST PATH // ONLINE" : "DO NOT INTERRUPT // BOOT SEQUENCE"}</span>
      </div>
    </div>
  );
}
