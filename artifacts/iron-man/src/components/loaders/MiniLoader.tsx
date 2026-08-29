import { LoadingOverlay } from "@/components/loaders/LoadingOverlay";
import { useLoader } from "@/components/loaders/LoaderProvider";

export function MiniLoader() {
  const { progress, status } = useLoader();
  return (
    <div className="global-loader global-loader--mini">
      <LoadingOverlay progress={progress} status={status} mini />
    </div>
  );
}