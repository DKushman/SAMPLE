"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { PillArrowButton } from "@/components/PillArrowButton";
import { gsap, ScrollTrigger } from "@/lib/gsap-client";
import imgErbe from "../pexels-viewofbeth-166056035-11016003.jpg";
import imgGründung from "../pexels-kindelmedia-6774948.jpg";
import imgGrundstück from "../pexels-free-nature-stock-7174.jpg";

type StackCard = {
  id: string;
  title: string;
  bgClass: string;
  textClass: string;
  imageSrc: string;
  graphicAlt: string;
};

/** Top → bottom im Array = oben→unten im End-Stack (wie Referenz: Salmon, Cream, Teal, Dark). */
const STACK_CARDS: StackCard[] = [
  {
    id: "visual-dna",
    title: "Erben und Vererben, die gesetzliche Erbfolge",
    bgClass: "bg-[#55699A]",
    textClass: "text-white",
    imageSrc: imgErbe.src,
    graphicAlt: "Notariatstermin mit Dokumenten",
  },
  {
    id: "brand-alchemy",
    title: "Existenzgründer: GmbH oder UG?",
    bgClass: "bg-[#465881]",
    textClass: "text-white",
    imageSrc: imgGründung.src,
    graphicAlt: "Person beim Unterzeichnen von Unterlagen",
  },
  {
    id: "feel-first",
    title: "Kaufverträge über Grundstücke",
    bgClass: "bg-[#3D4B6E]",
    textClass: "text-white",
    imageSrc: imgGrundstück.src,
    graphicAlt: "Beratungssituation am Tisch",
  },
  {
    id: "human-clicks",
    title: "Bestellung einer Grundschuld",
    bgClass: "bg-[#273149]",
    textClass: "text-white",
    imageSrc: imgGründung.src,
    graphicAlt: "Vertragsdokumente in Nahaufnahme",
  },
];

/** Vertikaler Versatz pro Stufe: nächste Karte beginnt unter der H3-Zeile der darüberliegenden Karte (`--stack-under-h3`). */
/** z-index rises with stack order so each new card lays in front of the previous. */
const CARD_Z = [1, 2, 3, 4] as const;

type StackedCardsShowcaseProps = {
  reducedMotion: boolean;
};

export function StackedCardsShowcase({
  reducedMotion,
}: StackedCardsShowcaseProps) {
  const rootRef = useRef<HTMLElement>(null);
  /** Tall scroll track — natural Lenis scroll, no pin (avoids abrupt „switch“). */
  const scrollRangeRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useGSAP(
    () => {
      if (reducedMotion) return;
      const range = scrollRangeRef.current;
      const stack = stackRef.current;
      if (!range || !stack) return;

      const blackEl = cardRefs.current[0];
      const tealEl = cardRefs.current[1];
      const creamEl = cardRefs.current[2];
      const salmonEl = cardRefs.current[3];
      if (!blackEl || !tealEl || !creamEl || !salmonEl) return;

      const cardEls = [blackEl, tealEl, creamEl, salmonEl];
      const setUnderH3Offset = () => {
        const heading = salmonEl.querySelector("h3");
        if (!heading) return;
        const isMobile = window.matchMedia("(max-width: 767px)").matches;
        const headingHeight = heading.getBoundingClientRect().height;
        const paddingTop = Number.parseFloat(getComputedStyle(salmonEl).paddingTop) || 0;
        // Keep at least the h3 stripe visible on the previous card, but cap it to avoid clipping.
        const rawStep = headingHeight + paddingTop + 8;
        const stepPx = Math.min(Math.max(rawStep, 56), 88);
        stack.style.setProperty("--stack-under-h3", `${stepPx}px`);
        if (isMobile) {
          stack.style.setProperty("--stack-card-height", "fit-content");
          return;
        }
        const maxOffset = stepPx * (STACK_CARDS.length - 1);
        const safeBottomPad = 16;
        const availablePx = stack.clientHeight - maxOffset - safeBottomPad;
        const cardHeightPx = Math.max(availablePx, 320);
        stack.style.setProperty("--stack-card-height", `${cardHeightPx}px`);
      };
      setUnderH3Offset();
      ScrollTrigger.addEventListener("refreshInit", setUnderH3Offset);

      gsap.set(stack, { force3D: true, willChange: "transform" });
      /* Bottom card first; each following card sits below the viewport, then slides up on top. */
      gsap.set(blackEl, { yPercent: 0, force3D: true, willChange: "transform" });
      gsap.set([tealEl, creamEl, salmonEl], {
        yPercent: 108,
        force3D: true,
        willChange: "transform",
      });

      const timeline = gsap.timeline({
        defaults: { ease: "none", force3D: true },
        scrollTrigger: {
          trigger: range,
          start: "top 35%",
          end: "bottom bottom",
          scrub: 0.72,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
        },
      });

      let t = 0;

      timeline.to(stack, { yPercent: -1.4, duration: 1.1 }, t);
      t += 1.15;

      timeline.to(stack, { yPercent: -5.2, duration: 3.4 }, t);
      timeline.fromTo(
        tealEl,
        { yPercent: 108 },
        { yPercent: 0, duration: 3.95 },
        t + 0.15,
      );
      t += 4.25;

      timeline.to(stack, { yPercent: -9.6, duration: 3.25 }, t);
      timeline.fromTo(
        creamEl,
        { yPercent: 108 },
        { yPercent: 0, duration: 4.15 },
        t + 0.18,
      );
      t += 4.35;

      timeline.to(stack, { yPercent: -14.2, duration: 3.15 }, t);
      timeline.fromTo(
        salmonEl,
        { yPercent: 108 },
        { yPercent: 0, duration: 4.35 },
        t + 0.18,
      );
      t += 4.45;

      timeline.to(stack, { yPercent: -15.8, duration: 1.2 }, t);

      ScrollTrigger.refresh();

      return () => {
        ScrollTrigger.removeEventListener("refreshInit", setUnderH3Offset);
        timeline.kill();
        gsap.set([stack, ...cardEls], { clearProps: "willChange" });
      };
    },
    { scope: rootRef, dependencies: [reducedMotion] },
  );

  const cardsDom = [...STACK_CARDS].reverse();

  if (reducedMotion) {
    return (
      <section
        ref={rootRef}
        id="stack-showcase-section"
        aria-labelledby="stack-showcase-heading"
        className="px-[clamp(1rem,4vw,2.5rem)] py-[clamp(3rem,8vw,6rem)]"
      >
        <h2
          id="stack-showcase-heading"
          className="mx-auto mb-[clamp(0.7rem,2vw,1rem)] px-[clamp(1rem,4vw,2.5rem)] text-center font-sans text-[clamp(1.7rem,4.2vw,3.35rem)] font-semibold leading-[1.04] tracking-tight text-black"
        >
          Unsere Mandanteninformationen für Sie
        </h2>
        <p className="mx-auto mb-[clamp(1.25rem,3vw,2rem)] max-w-[62ch] px-[clamp(1rem,4vw,2.5rem)] text-center text-[clamp(0.9rem,1.6vw,1.05rem)] leading-[1.45] text-black/72">
          Ausgewählte Informationen zu häufigen notariellen und rechtlichen Themen.
        </p>
        <div className="mx-auto flex w-full max-w-[42rem] flex-col gap-[clamp(1rem,2.5vw,1.5rem)]">
          {STACK_CARDS.map((card) => (
            <a
              key={card.id}
              href="/"
              id={`stack-showcase-static-${card.id}`}
              aria-label={`${card.title} — zur Übersicht`}
              className={`block overflow-hidden rounded-[clamp(0.95rem,1.8vw,1.45rem)] px-[clamp(0.9rem,2.5vw,1.5rem)] py-[clamp(1rem,2.5vw,1.45rem)] shadow-[0_0.5rem_1.75rem_rgba(0,0,0,0.08)] no-underline outline-offset-2 transition-opacity hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${card.bgClass}`}
            >
              <div className="flex flex-col justify-start gap-[clamp(0.85rem,2vw,1.15rem)] md:flex-row md:items-start md:justify-between md:gap-[clamp(1.1rem,2.75vw,2.25rem)]">
                <h3
                  className={`shrink-0 font-sans text-[clamp(1.22rem,3.45vw,2.25rem)] font-bold uppercase italic leading-[1.02] tracking-tight ${card.textClass}`}
                >
                  {card.title}
                </h3>
                <div
                  className="relative w-full max-w-full shrink-0 overflow-hidden rounded-2xl aspect-[4/3] max-h-[min(52svh,20rem)] md:aspect-auto md:max-h-none md:h-[min(52vw,20rem)] md:w-[min(52vw,20rem)] lg:h-[min(46vw,30rem)] lg:w-[min(46vw,30rem)] xl:h-[min(42vw,34rem)] xl:w-[min(42vw,34rem)]"
                  role="img"
                  aria-label={card.graphicAlt}
                >
                  <img
                    src={card.imageSrc}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className="mx-auto mt-[clamp(1.2rem,3vw,2rem)] flex w-full max-w-[42rem] justify-center px-[clamp(1rem,4vw,2.5rem)]">
          <PillArrowButton href="/" label="Alle Mandanteninformationen ansehen" />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={rootRef}
      id="stack-showcase-section"
      aria-label="Unsere Mandanteninformationen für Sie"
      className="relative z-20"
    >
      <div
        ref={scrollRangeRef}
        id="stack-showcase-scroll-range"
        className="relative h-[520vh]"
      >
        <div
          id="stack-showcase-sticky-stage"
          className="sticky top-0 h-[118svh] min-h-[118svh] overflow-hidden isolate md:h-[112svh] md:min-h-[112svh]"
        >
        <div
          ref={stackRef}
          id="stack-showcase-stack"
          className="absolute bottom-0 left-0 right-0 top-[clamp(14vh,20vh,26vh)] flex justify-center px-[clamp(1rem,4vw,2.5rem)] pb-[clamp(0.75rem,3vh,1.5rem)] [--stack-under-h3:clamp(4rem,7vw,5.75rem)] [--stack-card-height:78vh]"
        >
          {cardsDom.map((card, stackIndex) => (
            <a
              key={card.id}
              href="/"
              ref={(node) => {
                cardRefs.current[stackIndex] = node;
              }}
              id={`stack-showcase-card-${card.id}`}
              aria-label={`${card.title} — zur Übersicht`}
              className={`absolute flex min-h-0 flex-col overflow-hidden rounded-[clamp(1.25rem,3vw,2.35rem)] px-[clamp(0.95rem,2.75vw,1.85rem)] py-[clamp(1rem,2.75vw,1.65rem)] shadow-[0_0.85rem_2.25rem_rgba(0,0,0,0.12)] no-underline outline-offset-2 transition-opacity hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${card.bgClass}`}
              style={{
                height: "var(--stack-card-height)",
                bottom: `calc(${STACK_CARDS.length - 1 - stackIndex} * var(--stack-under-h3))`,
                left: "clamp(1rem, 4vw, 2.5rem)",
                right: "clamp(1rem, 4vw, 2.5rem)",
                zIndex: CARD_Z[stackIndex],
              }}
            >
              <div className="flex min-h-0 w-full flex-1 flex-col justify-start gap-[clamp(0.65rem,1.8vw,1.1rem)] md:flex-row md:items-start md:justify-between md:gap-[clamp(1.1rem,2.75vw,2.25rem)]">
                <h3
                  className={`shrink-0 font-sans text-[clamp(1.28rem,3.85vw,2.5rem)] font-bold uppercase italic leading-[0.98] tracking-tight ${card.textClass}`}
                >
                  {card.title}
                </h3>
                <div
                  className="relative w-full max-w-full shrink-0 overflow-hidden rounded-2xl aspect-[4/3] max-h-[min(50svh,19rem)] md:aspect-auto md:max-h-none md:h-[min(56vw,22rem)] md:w-[min(56vw,22rem)] lg:h-[min(48vw,32rem)] lg:w-[min(48vw,32rem)] xl:h-[min(44vw,38rem)] xl:w-[min(44vw,38rem)]"
                  role="img"
                  aria-label={card.graphicAlt}
                >
                  <img
                    src={card.imageSrc}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className="absolute bottom-[clamp(1rem,3vh,2rem)] left-0 right-0 z-30 flex justify-center px-[clamp(1rem,4vw,2.5rem)]">
          <PillArrowButton href="/" label="Alle Mandanteninformationen ansehen" />
        </div>
        </div>
      </div>
    </section>
  );
}
