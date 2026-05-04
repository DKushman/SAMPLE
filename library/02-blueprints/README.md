# Sektionen — Inspiration & GSAP-Hinweise

Dieser Ordner ist **kein Production-Asset-Ordner**, sondern ein **Moodboard / Referenzablage**: Screenshots, die Richtung, Rhythmus und „Non-Generic“-Ton für **Website-Sektionen** (Hero, Features, About, Services, Portfolio usw.) vorgeben. Die eigentliche Implementierung bleibt im App-Repo; hier liegen nur **Beispielbilder** plus diese Kurz-Doku.

## Was du (und die KI) hier ableiten sollt

- **Kreativ-Freiraum:** Es gibt **keine** fertige Pixel-Referenz in `reference.tsx` — Absicht. Umsetzungen dürfen in Layout, Typo und Medien variieren, solange sie zu `library/02-blueprints/blueprint.mdx`, `library/01-constraints/*` und `tokens/*` passen.
- **Trotzdem nicht generisch:** Motion und Struktur werden **mit GSAP** gedacht — Timelines, Stagger, scroll-gekoppelte Choreografie statt „alles-hover-scale(1.05)“-Slop.
- **Seiten-Flow (Pflicht):** Gesamtrhythmus, **Timing** und **Menge** der Animationen so abstimmen, dass der Scroll **flüssig** und vorhersagbar wirkt — siehe **`AWWWARDS.md`** (Abschnitt *Seiten-Flow* + *Gestaltung mit Formen*) und `design-flow.json` (`rhythm_rules` / `variation_rules`).
- **Formen:** Editorial mit **Geometrie** arbeiten (Linien, Bänder, Schnitte, SVG/Masken), nicht nur Standard-Rectangles — ebenfalls in **`AWWWARDS.md`** festgehalten.
- **Mehr als eine Viewport-Höhe:** Sektionen dürfen **länger als 100vh Scrollweg** einnehmen (z. B. **ScrollTrigger**-Pin, phased Reveals, horizontal/vertikal kombiniert), wenn das der Lesepfad oder die Story stützt — nicht als reine Deko.

## GSAP-Werkzeuge (bewusst einsetzen)

| API / Plugin        | Typische Rolle |
|---------------------|----------------|
| **ScrollTrigger**   | Scroll-start/end, `scrub`, **Pin** über längere Distanz, `refresh()` nach Layout-Breakpoints |
| **SplitText**       | Editorial: Zeilen/Wörter/Zeichen-Reveals für große Headlines (nur mit A11y-/Reduced-Motion-Fallback) |
| **Observer**        | Pointer/Wheel/Touch — z. B. Karussell, horizontales „Scrub“ ohne native Scroll-Konflikte |
| **ScrollToPlugin**  | Programmatisches Scrollen zu Ankern/Sektionen; sparsam, nutzerfreundlich kombinieren |
| **CustomEase**      | Markige, nicht-stockige Kurven; konsistent zu `tokens/motion.tokens.json` halten |

Weitere Leitplanken: `library/01-constraints/motion.md`, offizielle Patterns [greensock/gsap-skills](https://github.com/greensock/gsap-skills).

## Dateien in diesem Ordner

| Datei | Stichwort |
|-------|------------|
| `01-fullwidth-service-strips.png` | Volle Breite, Farbbänder, Editorial-Strips (Brand / Identity / Website / Product) |
| `02-dark-editorial-motion-studio.png` | Dark Mode, große Typo, Listen mit Trennlinien, starkes Bild |
| `03-typography-inline-media.png` | Riesentypo, Medien in Klammern, „Click me“-Rhythmus |
| `04-carousel-scroll-continue.png` | Fokus-Karussell, „Scroll to continue“, zentrales Hero-Motiv |
| `05-layered-headline-collage.png` | Layered Collage über Megatype, kleiner Copy-Block |
| `06-asymmetric-project-grid.png` | Asymmetrisches Bento-/Portfolio-Raster |

---

*Hinweis: Urheber der Screenshots sind die jeweiligen Websites/Marken — nur intern als Design-Referenz verwenden.*
