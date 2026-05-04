# Interaction & hover

## Intent (why)

Interaktionen sollen **merkbar, markig und performant** sein — nicht generische „AI-Slop“-Microinteractions (alles wird 1.05× größer und leicht transparent). Ziel: **Lesbarkeit wahren**, Fokus- und Pointer-Zustände klar machen und **GPU-freundliche** Effekte (`transform`, `opacity`) mit **kreativer Form** (Pseudo-Elemente, SVG) kombinieren.

## Rules (non-negotiable)

- **Hover ist kein Ersatz für Fokus:** alles, was per Hover sichtbar wird, muss für Tastatur **` :focus-visible `** (oder gleichwertig) sinnvoll adressierbar sein.
- **Performance vor Show:** bevorzugt **`transform` und `opacity`**; keine teuren Dauer-Effekte auf großen Flächen (`filter: blur()` auf Fullscreen, riesige `box-shadow`-Animationen) ohne Messung.
- **Kreativ ≠ zufällig:** Pseudo-Elemente (`::before`/`::after`) und **SVG** (z. B. Strich-Animation, Mask, dezente Icon-Morphs) mit **klarem Konzept** — ein wiedererkennbares System, nicht pro Komponente ein neuer Effekt ohne Regel.
- **Interaktivität an echte Aktionen koppeln:** `cursor`, Hover und Animation nur, wo Nutzer:innen **verstehen, dass gehandelt werden kann** (Links, Buttons, Controls).
- **`prefers-reduced-motion`:** starke Bewegungen im Hover reduzieren oder durch Farbe/Kontrast ersetzen.

## Patterns (how)

- **Unterstreichungs-Band** mit `::after`: `scaleX(0) → scaleX(1)`, `transform-origin` links; on hover/focus-visible gleicher Endzustand.
- **SVG-Linie / Pfeil:** `stroke-dasharray`/`stroke-dashoffset` animieren — kurz, subtil; Icon bleibt semantisch Dekoration oder inline mit `aria-hidden` wenn rein dekorativ.
- **„Glow“ / Highlight** über **pseudo-layer** mit niedriger Opazität statt den ganzen Text zu verwischen.
- **Karten:** leichte **Translation + Schatten** statt `scale` als Einziges Mittel; oder **Border-Fade** über Pseudo-Element statt Layout-Shift.
- **Messbar halten:** wenn JS nötig ist, **RequestAnimationFrame**-disziplin oder GSAP laut `library/01-constraints/motion.md` — keine Layout-Reads im Hover-Handler in Schleifen.

## Anti-patterns (what to never do)

- **Standard „hover: scale(1.05)“ auf allem** — das ist das visuelle Äquivalent zu Stock-Footage; wirkt austauschbar und nervt bei dichten Grids.
- **Nur Hover, kein Focus-Style** — illegal schlecht für A11y und für Power-User.
- **`cursor: pointer` auf nicht-klickbaren `div`s** — frustriert und verwässert Bedeutung.
- **Hover, der Layout verschiebt** (Margin/Padding togglen) — **CLS** und zittrige Pointer-Ziele.
- **Dauerhafte CSS-Animationen** im Ruhezustand nur „weil cool“ — zieht Aufmerksamkeit und INP/LCP indirekt runter.
- **Schwere Filter auf großen Blöcken** ohne `will-change`/`contain` Strategie und ohne Test auf Mobile — ruckelt.
- **Gleiche Hover-Animation auf jeder Komponente** ohne Design-System — „Slop“-Fingerabdruck.
