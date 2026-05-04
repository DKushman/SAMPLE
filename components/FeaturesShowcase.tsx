"use client";

import { useLayoutEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const panels = [
  {
    index: "01",
    title: "Spatial narrative",
    body: "We choreograph arrival, pause, and reveal so every floor reads as a sequence — not a slideshow of random rooms.",
  },
  {
    index: "02",
    title: "Material honesty",
    body: "Stone, timber, and light are tuned for touch and reflection. Motion supports hierarchy — it never competes with the craft.",
  },
  {
    index: "03",
    title: "Operational calm",
    body: "Staff flows and guest comfort share one diagram. The build is precise enough to survive seasons of real traffic.",
  },
];

export default function FeaturesShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const onResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useGSAP(
    () => {
      const pin = pinRef.current;
      const track = trackRef.current;
      if (!pin || !track) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(track, { clearProps: "transform" });
      });

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const getScrollX = () => {
            const excess = track.scrollWidth - window.innerWidth;
            return excess > 0 ? -excess : 0;
          };

          const tween = gsap.fromTo(
            track,
            { x: 0 },
            {
              x: getScrollX,
              ease: "none",
              scrollTrigger: {
                trigger: pin,
                start: "top top",
                end: () =>
                  `+=${Math.abs(getScrollX()) + window.innerWidth * 0.35}`,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            },
          );

          return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
          };
        },
      );

      return () => {
        mm.revert();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative bg-neutral-950 text-white"
      aria-labelledby="features-heading"
    >
      <div
        ref={pinRef}
        className="flex min-h-[100dvh] flex-col justify-center overflow-hidden py-16"
      >
        <div className="mb-10 px-5 sm:px-8">
          <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-white/45">
            Capabilities
          </p>
          <h2
            id="features-heading"
            className="mt-2 max-w-xl font-serif text-3xl font-medium leading-tight sm:text-4xl"
          >
            Built for long scroll, not one-off tricks.
          </h2>
        </div>

        <div
          ref={trackRef}
          className="flex w-full flex-col gap-12 px-5 will-change-transform sm:px-8 md:w-max md:flex-row md:gap-0 md:pl-8 md:pr-0"
        >
          {panels.map((p, i) => (
            <article
              key={p.index}
              className={`flex shrink-0 flex-col justify-between border-t border-white/15 pt-8 md:min-h-[55vh] md:w-[72vw] md:max-w-3xl md:pr-10 lg:w-[58vw] ${i > 0 ? "md:border-l md:border-white/10 md:pl-10" : ""}`}
            >
              <FeaturePanel {...p} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturePanel({
  index,
  title,
  body,
}: {
  index: string;
  title: string;
  body: string;
}) {
  return (
    <>
      <span className="font-sans text-xs tabular-nums tracking-widest text-white/35">
        {index}
      </span>
      <div className="mt-6 max-w-md">
        <h3 className="font-serif text-2xl font-medium leading-snug sm:text-3xl">
          {title}
        </h3>
        <p className="mt-4 font-sans text-sm leading-relaxed text-white/70 sm:text-base">
          {body}
        </p>
      </div>
    </>
  );
}
