"use client";

import { PillArrowButton } from "@/components/PillArrowButton";

type ContactCtaSectionProps = {
  id?: string;
  email?: string;
  headingBoldStart?: string;
  headingLight?: string;
  headingBoldEnd?: string;
  lawyersPhone?: string;
  notariesPhone?: string;
  buttonLabel?: string;
  buttonHref?: string;
  className?: string;
};

export function ContactCtaSection({
  id = "site-contact-cta-section",
  email = "kanzlei@tegtmeier-berlin.de",
  headingBoldStart = "Wir sind",
  headingLight = "für Sie bei jedem",
  headingBoldEnd = "Anliegen erreichbar.",
  lawyersPhone = "030 / 283 096-0",
  notariesPhone = "030 / 283 096-50",
  buttonLabel = "Kontakt aufnehmen",
  buttonHref = "/",
  className = "",
}: ContactCtaSectionProps) {
  return (
    <section
      id={id}
      className={`mx-[clamp(0.7rem,2vw,1.4rem)] rounded-[clamp(1rem,2.2vw,1.8rem)]  bg-white px-[clamp(1rem,4vw,2.5rem)] py-[clamp(2.2rem,6vw,5.2rem)] text-[#121620] ${className}`.trim()}
      aria-labelledby="site-contact-cta-heading"
    >
      <div className="mx-auto flex w-full max-w-[62rem] flex-col items-center text-center">
        <p className="font-sans text-[clamp(0.78rem,1vw,0.92rem)] font-light text-black/48">{email}</p>

        <h2
          id="site-contact-cta-heading"
          className="mt-[clamp(0.75rem,1.6vw,1.1rem)] max-w-[19ch] font-sans text-[clamp(2rem,6.2vw,4.5rem)] leading-[0.98] tracking-tight text-black"
        >
          <span className="font-bold">{headingBoldStart}</span>{" "}
          <span className="font-light">{headingLight}</span>{" "}
          <span className="font-bold">{headingBoldEnd}</span>
        </h2>

        <div className="mt-[clamp(0.9rem,2vw,1.4rem)] flex flex-col items-center gap-[clamp(0.3rem,0.7vw,0.5rem)] text-[clamp(0.92rem,1.2vw,1.08rem)] text-black/72">
          <p>
            <span className="font-bold text-black">Rechtsanwälte:</span>{" "}
            <span className="font-light">{lawyersPhone}</span>
          </p>
          <p>
            <span className="font-bold text-black">Notare:</span>{" "}
            <span className="font-light">{notariesPhone}</span>
          </p>
        </div>

        <PillArrowButton
          id="site-contact-cta-link"
          href={buttonHref}
          label={buttonLabel}
          tone="dark"
          className="mt-[clamp(1.1rem,2.3vw,1.9rem)]"
        />
      </div>
    </section>
  );
}
