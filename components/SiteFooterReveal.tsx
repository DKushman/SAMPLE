"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PillArrowButton } from "@/components/PillArrowButton";

export function SiteFooterReveal() {
  const footerRef = useRef<HTMLElement | null>(null);
  const [footerShiftPx, setFooterShiftPx] = useState(0);
  const [footerRevealOffsetPx, setFooterRevealOffsetPx] = useState(64);

  useEffect(() => {
    const footerEl = footerRef.current;
    if (!footerEl) return;

    const syncFooterHeight = () => {
      document.documentElement.style.setProperty(
        "--site-footer-reveal-height",
        `${footerEl.offsetHeight}px`,
      );
    };

    syncFooterHeight();
    const resizeObserver = new ResizeObserver(syncFooterHeight);
    resizeObserver.observe(footerEl);
    window.addEventListener("resize", syncFooterHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", syncFooterHeight);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lastScrollY = window.scrollY;
    let rafId = 0;
    let settleTimer = 0;

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        const nextY = window.scrollY;
        const delta = nextY - lastScrollY;
        lastScrollY = nextY;

        if (delta < 0) {
          setFooterShiftPx(Math.min(26, Math.abs(delta) * 0.62));
          window.clearTimeout(settleTimer);
          settleTimer = window.setTimeout(() => setFooterShiftPx(0), 240);
        } else {
          setFooterShiftPx((prev) => Math.max(0, prev - 2.2));
        }

        rafId = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(settleTimer);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFooterRevealOffsetPx(0);
      return;
    }

    const spacerEl = document.getElementById("site-footer-reveal-spacer");
    if (!spacerEl) {
      setFooterRevealOffsetPx(0);
      return;
    }

    let rafId = 0;
    const updateRevealOffset = () => {
      const rect = spacerEl.getBoundingClientRect();
      const viewportH = window.innerHeight;

      // Keep footer lower at first, then bring it up while scrolling near footer area.
      const revealStart = viewportH * 1.02;
      const revealEnd = viewportH * 0.02;
      const progress = Math.min(
        1,
        Math.max(0, (revealStart - rect.top) / Math.max(1, revealStart - revealEnd)),
      );

      setFooterRevealOffsetPx((1 - progress) * 64);
      rafId = 0;
    };

    const onScrollOrResize = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(updateRevealOffset);
    };

    updateRevealOffset();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      id="site-footer-reveal"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-0 rounded-tl-[clamp(1rem,2.2vw,1.8rem)] rounded-tr-[clamp(1rem,2.2vw,1.8rem)] bg-[#273149] text-white transition-transform duration-450 ease-[cubic-bezier(0.25,1,0.35,1)]"
      aria-label="Site footer"
      style={{ transform: `translate3d(0, ${footerRevealOffsetPx + footerShiftPx}px, 0)` }}
    >
      <div
        id="site-footer-shell"
        className="pointer-events-auto mx-auto w-full max-w-[100rem] overflow-hidden rounded-tl-[clamp(1rem,2.2vw,1.8rem)] rounded-tr-[clamp(1rem,2.2vw,1.8rem)] px-[clamp(1rem,4vw,2.5rem)] py-[clamp(1.2rem,2.8vw,2.2rem)]"
      >
        <div
          id="site-footer-cta-row"
          className="flex flex-col items-start gap-[clamp(0.9rem,2.3vw,1.5rem)] border-b border-white/12 pb-[clamp(1rem,2.4vw,1.8rem)]"
        >
          <p
            id="site-footer-kicker"
            className="max-w-[34ch] font-sans text-[clamp(0.72rem,1vw,0.86rem)] leading-[1.35] text-white/72 md:max-w-[22ch]"
          >
            Für konkrete Anliegen nutzen Sie bitte eines unserer Online-Formulare.
          </p>

          <div className="w-full">
            <PillArrowButton
              id="site-footer-cta-link"
              href="/"
              label="Kontakt aufnehmen"
              tone="light"
              className="w-full justify-start sm:w-auto"
            />
          </div>
        </div>

        <section
          id="site-footer-meta-row"
          className="mt-[clamp(0.9rem,2vw,1.5rem)] grid grid-cols-1 gap-[clamp(0.8rem,2vw,1.4rem)] text-[clamp(0.72rem,0.98vw,0.84rem)] leading-[1.4] text-white/76 sm:grid-cols-2 lg:grid-cols-4"
        >
          <div id="site-footer-links-col" className="min-w-0">
            <ul className="space-y-[clamp(0.18rem,0.42vw,0.32rem)]">
              <li>Kanzlei</li>
              <li>Rechtsanwälte-Notare</li>
              <li>Rechtsgebiete</li>
              <li>Notarformulare</li>
              <li>Mandanteninformationen</li>
              <li>Kontakt</li>
            </ul>
          </div>
          <div id="site-footer-sitemap-col" className="min-w-0">
            <ul className="space-y-[clamp(0.18rem,0.42vw,0.32rem)]">
              <li>Karriere</li>
              <li>Impressum</li>
              <li>Datenschutz</li>
              <li>Suchen</li>
            </ul>
          </div>
          <div id="site-footer-contact-col" className="min-w-0 break-words">
            <p className="font-medium text-white">Mail:</p>
            <ul className="mt-[clamp(0.22rem,0.5vw,0.35rem)] space-y-[clamp(0.18rem,0.42vw,0.32rem)]">
              <li>kanzlei@tegtmeier-berlin.de</li>
              <li>Telefon +49(0)30 - 283 096 - 0</li>
              <li>Notare +49(0)30 - 283 096 - 50</li>
              <li>Fax +49(0)30 - 283 096 - 39</li>
              <li>www.tegtmeier-berlin.de</li>
            </ul>
          </div>
          <div id="site-footer-social-col" className="min-w-0 break-words">
            <p className="font-medium text-white">Anschrift:</p>
            <ul className="mt-[clamp(0.22rem,0.5vw,0.35rem)] space-y-[clamp(0.18rem,0.42vw,0.32rem)]">
              <li>Tegtmeier &amp; Partner</li>
              <li>Brunnenstraße 49</li>
              <li>D-10 115 Berlin-Mitte</li>
            </ul>
            <p className="mt-[clamp(0.8rem,1.5vw,1.1rem)]">© Tegtmeier &amp; Partner 2026</p>
          </div>
        </section>

        <span
          id="site-footer-brand"
          className="mt-[clamp(1rem,2.3vw,1.8rem)] block w-full"
        >
          <Image
            src="/TEGTMEIER%20%26%20PARTNER.png"
            alt="TEGTMEIER & PARTNER"
            width={2400}
            height={300}
            className="h-auto w-full"
          />
        </span>
      </div>
    </footer>
  );
}
