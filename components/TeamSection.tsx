"use client";

import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useCallback, useRef } from "react";
import { gsap } from "@/lib/gsap-client";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  imageSrc: string;
};

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "michael-tegtmeier",
    name: "Dr. Michael Tegtmeier",
    role: "Rechtsanwalt, Notar, Partner",
    imageSrc: "/tegtmeier_2.500x500.jpg",
  },
  {
    id: "anke-reiter",
    name: "Anke Reiter",
    role: "Rechtsanwältin, Notarin, Partnerin",
    imageSrc: "/reiter-1.500x500.jpg",
  },
  {
    id: "jörg-schulze-bourcevet",
    name: "Jörg Schulze-Bourcevet",
    role: "Rechtsanwalt, Notar, Partner",
    imageSrc: "/schulze.500x500.jpg",
  },
  {
    id: "philipp-schürer",
    name: "Philipp Schürer",
    role: "Rechtsanwalt, Partner",
    imageSrc: "/schurer-1.500x500.jpg",
  },
  {
    id: "jana-meyer",
    name: "Jana Meyer",
    role: "Rechtsanwältin, Notarin, Partnerin",
    imageSrc: "/mayer_2.500x500.jpg",
  },
  {
    id: "pauline-schönbach",
    name: "Pauline Schönbach",
    role: "Rechtsanwältin (angestellte Berufsträgerin)",
    imageSrc: "/pauline-schoenbach-crop.500x500.jpg",
  },
];

export function TeamSection() {
  const rootRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  const scrollByDirection = useCallback((direction: "prev" | "next") => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const factor = direction === "next" ? 1 : -1;
    scroller.scrollBy({
      left: scroller.clientWidth * 0.78 * factor,
      behavior: "smooth",
    });
  }, []);

  useGSAP(
    () => {
      const header = headerRef.current;
      const scroller = scrollerRef.current;
      if (!header || !scroller) return;
      const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
      if (!cards.length) return;

      const headerItems = header.querySelectorAll(
        "#team-section-kicker, #team-section-heading",
      );
      const headerTween = gsap.fromTo(
        headerItems,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.05,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: {
            trigger: header,
            start: "top 94%",
            once: true,
          },
        },
      );

      const cardsTween = gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 34 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.15,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: scroller,
            start: "top 94%",
            once: true,
          },
        },
      );

      return () => {
        headerTween.kill();
        cardsTween.kill();
      };
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id="team-section"
      aria-labelledby="team-section-heading"
      className="py-[clamp(2.5rem,7vw,5.5rem)]"
    >
      <div
        ref={headerRef}
        id="team-section-header"
        className="mx-auto flex w-full max-w-[74rem] flex-col items-center justify-center gap-[clamp(0.8rem,2vw,1.6rem)] px-[clamp(1rem,4vw,2.5rem)] text-center"
      >
        <div id="team-section-header-copy" className="mx-auto">
          <span
            id="team-section-kicker"
            className="block font-sans text-[clamp(0.65rem,0.95vw,0.82rem)] font-medium uppercase tracking-[0.2em] text-black/70"
          >
            + Unser Team
          </span>
          <h2
            id="team-section-heading"
            className="mt-[clamp(0.55rem,1.3vw,0.95rem)] font-sans text-[clamp(2rem,5vw,4rem)] font-normal leading-[0.98] tracking-tight text-black"
          >
            Lernt uns kennen!
          </h2>
        </div>

        <div
          id="team-section-nav"
          className="hidden shrink-0 items-center gap-[clamp(0.35rem,0.9vw,0.7rem)] pt-[clamp(1.1rem,2.8vw,2rem)] md:mx-auto md:flex"
        >
          <button
            id="team-section-nav-prev"
            type="button"
            onClick={() => scrollByDirection("prev")}
            aria-label="Vorherige Teammitglieder"
            className="inline-flex h-[clamp(2rem,3.2vw,2.55rem)] w-[clamp(2rem,3.2vw,2.55rem)] items-center justify-center border border-black/10 bg-white/65 text-black transition-colors duration-300 hover:bg-white"
          >
            <svg viewBox="0 0 24 24" className="h-[clamp(0.9rem,1.5vw,1.1rem)] w-[clamp(0.9rem,1.5vw,1.1rem)]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M14.5 6.5L9 12l5.5 5.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            id="team-section-nav-next"
            type="button"
            onClick={() => scrollByDirection("next")}
            aria-label="Nächste Teammitglieder"
            className="inline-flex h-[clamp(2rem,3.2vw,2.55rem)] w-[clamp(2rem,3.2vw,2.55rem)] items-center justify-center border border-black/10 bg-white/65 text-black transition-colors duration-300 hover:bg-white"
          >
            <svg viewBox="0 0 24 24" className="h-[clamp(0.9rem,1.5vw,1.1rem)] w-[clamp(0.9rem,1.5vw,1.1rem)]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M9.5 6.5L15 12l-5.5 5.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        id="team-section-scroller"
        className="mt-[clamp(1.1rem,2.8vw,2.2rem)] flex w-full snap-x snap-mandatory gap-[clamp(0.8rem,2vw,1.4rem)] overflow-x-auto px-[clamp(1.4rem,5.2vw,3.2rem)] pb-[clamp(0.2rem,0.8vw,0.4rem)] [scroll-padding-inline:clamp(1.4rem,5.2vw,3.2rem)] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {TEAM_MEMBERS.map((member, index) => (
          <article
            key={member.id}
            ref={(node) => {
              cardRefs.current[index] = node;
            }}
            id={`team-section-card-${member.id}`}
            className="group relative min-w-[clamp(16rem,31vw,24rem)] flex-1 snap-start"
          >
            <p
              id={`team-section-card-name-${member.id}`}
              className="sr-only"
            >
              {member.name}
            </p>

            <div
              id={`team-section-card-image-wrap-${member.id}`}
              className="relative aspect-square w-full overflow-hidden rounded-[clamp(1rem,2vw,1.6rem)] bg-[#d9dadd]"
            >
              <img
                id={`team-section-card-image-${member.id}`}
                src={member.imageSrc}
                alt={`Porträt von ${member.name}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full origin-center object-cover object-top transform-gpu transition-transform duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.1]"
              />

              <div
                id={`team-section-card-overlay-${member.id}`}
                className="absolute inset-x-[clamp(0.45rem,0.9vw,0.7rem)] bottom-[clamp(0.45rem,0.9vw,0.7rem)] flex items-center justify-between gap-[clamp(0.45rem,0.95vw,0.7rem)] rounded-[clamp(0.62rem,1.1vw,0.85rem)] border border-black/8 bg-white/95 px-[clamp(0.55rem,1.05vw,0.78rem)] py-[clamp(0.42rem,0.85vw,0.62rem)] shadow-[0_0.4rem_1rem_rgba(0,0,0,0.08)] backdrop-blur-[2px]"
              >
                <div id={`team-section-card-overlay-copy-${member.id}`} className="min-w-0">
                  <p
                    id={`team-section-card-overlay-name-${member.id}`}
                    className="truncate font-sans text-[clamp(0.78rem,0.98vw,0.9rem)] font-semibold leading-[1.15] text-black"
                  >
                    {member.name}
                  </p>
                  <p
                    id={`team-section-card-role-${member.id}`}
                    className="mt-[clamp(0.12rem,0.28vw,0.2rem)] truncate font-sans text-[clamp(0.62rem,0.82vw,0.74rem)] leading-[1.2] text-black/70"
                  >
                    {member.role}
                  </p>
                </div>

                <Link
                  id={`team-section-card-overlay-link-${member.id}`}
                  href="/"
                  aria-label={`Mehr über ${member.name}`}
                  className="inline-flex h-[clamp(1.35rem,1.85vw,1.62rem)] w-[clamp(1.35rem,1.85vw,1.62rem)] shrink-0 items-center justify-center rounded-full border border-black/12 bg-white text-black/75 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:rotate-[-45deg]"
                >
                  <svg
                    id={`team-section-card-overlay-link-icon-${member.id}`}
                    viewBox="0 0 24 24"
                    className="h-[clamp(0.62rem,0.95vw,0.82rem)] w-[clamp(0.62rem,0.95vw,0.82rem)]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M7 17L17 7" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
