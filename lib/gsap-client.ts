"use client";

import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText, CustomEase, ScrollTrigger);
  // Editorial ease-out (Bezier / SVG-Pfad): weiches Auslaufen für Hero-Bild-Zoom
  CustomEase.create(
    "heroFigureReveal",
    "M0,0 C0.22,0.01 0.35,1 1,1",
  );
}

export { CustomEase, gsap, ScrollTrigger, SplitText };
