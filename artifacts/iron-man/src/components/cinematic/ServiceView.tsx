import { useState } from "react";
import { ArrowUpRight, Check, X } from "@phosphor-icons/react";
import { ServicePage } from "./ServicePage";
import { getServiceBySlug, type ServiceSlug, SERVICES, SERVICE_SLUGS } from "@/lib/services";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import "./service-cinematic.css";

const SERVICE_LIST = SERVICE_SLUGS.map((slug) => SERVICES[slug]);

function EngagementPanel({
  serviceName,
  onClose,
}: {
  serviceName: string;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div
      className="platform-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Start a project"
    >
      <div className="engage-panel">
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close panel"
        >
          <X size={20} />
        </button>
        {submitted ? (
          <div className="form-success">
            <Check size={28} />
            <p>REQUEST QUEUED</p>
            <small>
              Your project brief is staged locally. Connect a backend to
              transmit it.
            </small>
            <button onClick={onClose}>RETURN TO PLATFORM</button>
          </div>
        ) : (
          <>
            <div className="platform-eyebrow">
              <span>LINK / 01</span>START A PROJECT
            </div>
            <h2>
              Let&apos;s make the next <span>system.</span>
            </h2>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
              }}
            >
              <div className="form-grid">
                <label>
                  NAME
                  <input required name="name" />
                </label>
                <label>
                  EMAIL
                  <input required type="email" name="email" />
                </label>
                <label>
                  PHONE / WHATSAPP
                  <input name="phone" />
                </label>
                <label>
                  PROJECT TYPE
                  <select name="type" defaultValue={serviceName}>
                    {SERVICE_LIST.map((s) => (
                      <option key={s.slug}>{s.name}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label>
                PROJECT DESCRIPTION
                <textarea required name="description" rows={4} />
              </label>
              <label>
                BUDGET RANGE
                <select name="budget" defaultValue="To be discussed">
                  <option>To be discussed</option>
                  <option>Under $5,000</option>
                  <option>$5,000 — $15,000</option>
                  <option>$15,000+</option>
                </select>
              </label>
              <button className="form-submit" type="submit">
                REQUEST CONSULTATION <ArrowUpRight size={16} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export function ServiceView({ slug }: { slug: string }) {
  const [engageService, setEngageService] = useState<string | null>(null);
  const service = getServiceBySlug(slug);

  if (!service) {
    return (
      <div className="flex min-h-[60dvh] flex-col items-center justify-center gap-6 px-6 text-center">
        <EyebrowBadge>MODULE // NOT FOUND</EyebrowBadge>
        <h1 className="font-sans text-4xl font-semibold tracking-tighter text-foreground">
          Service not found
        </h1>
        <p className="max-w-[40ch] font-sans text-base text-zinc-400">
          The requested service module does not exist in the ANONYMIKETECH
          system.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-foreground backdrop-blur-md transition-all duration-200 hover:bg-white/[0.08]"
        >
          RETURN HOME
        </a>
      </div>
    );
  }

  return (
    <>
      <ServicePage service={service} onEngage={setEngageService} />
      {engageService && (
        <EngagementPanel
          serviceName={engageService}
          onClose={() => setEngageService(null)}
        />
      )}
    </>
  );
}


