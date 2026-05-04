"use client";

import { useLayoutEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const testimonials = [
  {
    index: "01",
    quote:
      "Raum wirkt erst dann hochwertig, wenn Stille erlaubt ist. Hier wurde nicht dekoriert — sondern erzählt.",
    author: "Elena Vogt",
    role: "Creative Director, Atelier Nordlicht",
  },
  {
    index: "02",
    quote:
      "Die Übergänge zwischen Gästebereich und Back-of-House fühlen sich endlich wie ein roter Faden an, nicht wie ein Kompromiss.",
    author: "Jonas Mertens",
    role: "Betriebsleitung, Hotel Rheinsicht",
  },
  {
    index: "03",
    quote:
      "Weniger Effekt, mehr Haltung. Genau das spürt man beim Scrollen: Fokus statt Lärm.",
    author: "Mara Okonkwo",
    role: "Gründerin, Studio Räume",
  },
] as const;

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const railFillRef = useRef<HTMLDivElement>(null);
  const figureRefs = useRef<(HTMLElement | null)[]>([]);

  useLayoutEffect(() => {
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useGSAP(
    () => {
      const pin = pinRef.current;
      const rail = railFillRef.current;
      if (!pin || !rail) return;

      const figures = () =>
        figureRefs.current.filter((el): el is HTMLElement => el !== null);

      const setActiveFromProgress = (progress: number) => {
        const list = figures();
        if (list.length !== 3) return;
        const idx = Math.min(2, Math.floor(progress * 3));
        list.forEach((el, i) => {
          el.toggleAttribute("data-active", i === idx);
        });
      };

      const mm = gsap.matchMedia();

      mm.add(
        "(max-width: 639px), (prefers-reduced-motion: reduce)",
        () => {
          gsap.set(rail, { clearProps: "transform" });
          rail.style.transform = "scaleY(1)";
          figures().forEach((el) => el.removeAttribute("data-active"));
        },
      );

      mm.add(
        "(min-width: 640px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.set(rail, { scaleY: 0, transformOrigin: "top center" });
          setActiveFromProgress(0);

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: pin,
              start: "top top",
              end: "+=135%",
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => setActiveFromProgress(self.progress),
            },
          });

          tl.to(
            rail,
            {
              scaleY: 1,
              duration: 1,
              ease: "none",
            },
            0,
          );

          return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
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
      id="testimonials"
      className="relative bg-[#12080a] text-white"
      aria-labelledby="testimonials-heading"
    >
      <div
        ref={pinRef}
        className="mx-auto flex max-w-6xl flex-col gap-12 px-5 py-24 sm:px-8 md:flex-row md:items-stretch md:gap-16 md:py-32"
      >
        <div className="md:w-1/3 md:shrink-0">
          <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#c9a4aa]">
            Stimmen
          </p>
          <h2
            id="testimonials-heading"
            className="mt-3 font-serif text-3xl font-medium leading-tight text-white sm:text-4xl"
          >
            Was bleibt, wenn der erste Eindruck verblasst.
          </h2>
        </div>

        <div className="relative flex flex-1 gap-8 md:gap-10">
          <div
            className="relative hidden w-3 shrink-0 sm:block"
            aria-hidden="true"
          >
            <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/12" />
            <div
              ref={railFillRef}
              className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-[#722F37] will-change-transform"
              style={{
                height: "100%",
                transformOrigin: "top center",
                transform: "scaleY(0)",
              }}
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-16 md:gap-20">
            {testimonials.map((t, i) => (
              <figure
                key={t.index}
                ref={(el) => {
                  figureRefs.current[i] = el;
                }}
                className="testimonial-figure pl-6 md:pl-8"
              >
                <blockquote className="font-serif text-xl leading-snug text-white sm:text-2xl md:text-[1.65rem] md:leading-tight">
                  <p>&ldquo;{t.quote}&rdquo;</p>
                </blockquote>
                <figcaption className="mt-6 font-sans text-xs uppercase tracking-[0.2em] text-[#c9a4aa] sm:text-sm">
                  <span className="font-medium text-white/90">{t.author}</span>
                  <span className="mx-2 text-white/35" aria-hidden="true">
                    ·
                  </span>
                  <span className="normal-case tracking-normal text-white/55">
                    {t.role}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
