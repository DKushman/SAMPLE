# Awwwards-Level — Kurzbrief für Agenten

Diese Datei ist der **Einstieg**: erst hier lesen, dann die Bibliothek in **fester Reihenfolge** durchgehen. Ziel ist **hochwertige, nicht-generische** Web-Oberflächen mit **GSAP** als Motor für narrative Scroll- und Sektions-Motion — nicht „AI-Slop“-Templates.

---

## Seiten-Flow: Timing & Animationsmenge (Pflicht)

Die **gesamte Seite** soll wie **ein zusammenhängender Rhythmus** wirken — nicht wie lose aneinandergereihte Sektionen.

- **Flow vor Effekt:** Jede Motion muss den **Lesepfad** stützen (Was kommt als Nächstes? Wo ruht das Auge?). Scroll-Pins, Scrub und Sektionslängen so wählen, dass **kein „Stocken“ oder Überraschungs-Jank** entsteht.
- **Menge:** Lieber **weniger, dafür präzise** animierte Momente als viele halbgare Tweens. Sektions-Budgets aus `library/02-blueprints/design-flow.json` und **`tokens/motion.tokens.json`** ernst nehmen.
- **Timing:** Dauer, **Stagger** und **Overlap** bewusst staffeln — **Timelines** statt unkoordinierter Einzel-Tweens; **ein** durchgängiges Easing-Konzept pro Seite bzw. pro Story-Arc. **Scrub-Werte** (`0.5`–`1.5` typisch) so setzen, dass Scroll und Bewegung **synchron und vorhersagbar** wirken, nicht hektisch.
- **Flüssigkeit:** Vor **neuen** ScrollTriggern **`ScrollTrigger.refresh()`** nach Fonts/Layout/Breakpoint; keine parallelen, widersprüchlichen Scroll-Zuweisungen auf dasselbe Element. **INP/Lesbarkeit** nicht opfern — keine Dauer-Animation im Hintergrund „nur weil es geht“.
- **Querschnitt:** Abwechslung zwischen **intensiveren** und **ruhigen** Sektionen planen (siehe auch `rhythm_rules` in `library/02-blueprints/design-flow.json`).

---

## Gestaltung mit Formen (nicht nur Rechtecke)

**Form-Sprache** ist Teil des Awwwards-Niveaus: editorial, markig, aber **mit Absicht** — nicht Deko-Rauschen.

- **Geometrie:** Mit **Kanten, Bögen, Segmenten, Schnitten** (z. B. abgeschrägte Flächen, **SVG**-Masken, **Clip-Path**, **Border-Radius** nur dort, wo es Rhythmus oder Marke trägt) arbeiten; **Raster und Whitespace** bewusst brechen.
- **Linien & Flächen:** Trennlinien, **Streifen**, **Panel-Silhouetten** und Hintergrund-**Zonen** (Farbe/Verlauf **sparsam** und begründet) nutzen, um **Hierarchie** zu schärfen — nicht um jede Box zu „verschönern“.
- **Medien & Typo:** Bilder/Video in **nicht-rechteckigen** Rahmen (Mask, overlap) kombinieren; **Typo und Form** zusammen denken (z. B. Marginalie, versetzte Spalte, „Band“ unter einer Zeile).
- **Motion + Form:** Form-Animationen über **`transform` / `opacity`** (z. B. `scaleX` für Linie, `clipPath` / `scale` sparsam), **kein** Form-Chaos ohne Konzept — siehe **„Was nicht tun“** unten (kein Glassmorphism-Spam, kein 3D-Zirkus).

---

## Ordnerstruktur (ein Blick)

| Pfad | Rolle |
|------|--------|
| **`AWWWARDS.md`** (diese Datei) | Kompakte Regeln: Slop vermeiden, **Flow/Timing**, **Form-Sprache**, GSAP-Stack, Scan-Reihenfolge |
| **`tokens/`** | Primitive, semantische, Typo-, Motion-Tokens — **Quelle für Zahlen, Easing-Namen, Rhythmus** |
| **`library/01-constraints/`** | Verbindliche Leitplanken: Motion, Interaktion, A11y, Performance, Typo, Code-Stil |
| **`library/02-blueprints/`** | Sektions-Intent (`blueprint.mdx`), Moodboard-Hinweise (`README.md`), Anti-Pattern-Katalog (`anti-patterns.json`), Flow-Metriken (`design-flow.json`) |
| **`library/03-project-questions/`** | Minimale Discovery (YAML + `FOR_AI.md`) — nur Kontext/Ton, **keine** Ersatz-Palette |

**Empfohlene Lesereihenfolge für einen Lauf:** `AWWWARDS.md` → `library/01-constraints/motion.md` + `interactions.md` → `library/02-blueprints/blueprint.mdx` → Rest nach Bedarf → `tokens/*.json`.

---

## Was nicht tun (AI Slop & Billig-Signale)

Diese Liste verdichtet die Bibliothek: Wenn etwas davon vorkommt, ist das Ergebnis **bewusst zu vermeiden** oder stark zu entschärfen.

### Motion & Scroll

- **Nicht** jede Sektion / jedes Element on-scroll animieren (**Animation Spam**).
- **Nicht** dieselbe **Text-Reveal-Stagger-Animation** überall wiederholen (maximal sparsam, nicht als einziges Gestaltungsmittel).
- **Nicht** alle Tweens **gleichzeitig** starten — immer **Stagger** oder zeitliche Staffelung.
- **Nicht** durchgehend **Linear-Easing** oder generisches Default-Easing ohne Konzept; **CustomEase** und klare Kurven aus `tokens/motion.tokens.json` bevorzugen.
- **Nicht** **Layout-Properties** (`width`/`height`/`top`/`left`/Margin) als Standard animieren — **Transforms + `opacity` / `autoAlpha`**.
- **Nicht** **ScrollTrigger** auf jedes Kleinzeug ohne Strategie; **kein** Pin-Chaos ohne `refresh()` nach Breakpoints.
- **Nicht** lange Intros, die **LCP** oder Lesbarkeit blockieren.
- **`prefers-reduced-motion` nicht ignorieren** — inkl. SplitText-/Reveal-Fallbacks.

### Visuelles & Layout

- **Nicht** die **Standard-Lila-/Startup-Verlauf**-Ästhetik ohne eigene Begründung.
- **Nicht** **Glassmorphism** und **Fake-3D-Rotation** überall.
- **Nicht** **alles zentriert** in identischen Card-Stapeln (**Equal-Height-Icon-Title-Body** als Default für jede Sektion).
- **Nicht** **Deko-Gradients** hinter Blöcken ohne narrative Funktion.
- **Nicht** **Icon + Einzeiler**-Wäschelisten ohne Hierarchie.
- **Nicht** **Copy-Paste-Sektionen** (gleiches Layout, anderer Text).
- **Nicht** ohne **Spacing-System** und ohne **visuelle Ruhephasen** auskommen.

### Interaktion (besonders „KI-generisch“)

- **Nicht** **`hover: scale(1.05)`** (oder äquivalent) auf **jedem** Karten-Element — das ist das visuelle Äquivalent zu Stock-Footage (`library/01-constraints/interactions.md`).
- **Nicht** **Hover ohne `:focus-visible`** für denselben Effekt.
- **Nicht** **`cursor: pointer`** auf nicht-klickbare `div`s.
- **Nicht** Hover, der **Layout verschiebt** (CLS, nervige Ziele).

### Globale Flow-Regeln (siehe auch `library/02-blueprints/design-flow.json`)

- **Nicht** **lineares Easing allein**, **nicht** unkoordiniert viele gleichzeitige Animationen, **nicht** **`top`/`left`-Positionstweens** als Scroll-Standard.
- **Pro Sektion** lieber **wenige, klare** Animationen mit **einem primären Fokus** als viele gleichwertige Effekte.

Detaillierter Katalog: **`library/02-blueprints/anti-patterns.json`**.

---

## GSAP ist vorgesehen — wofür genau?

**Primäre Scroll- und Sektions-Choreografie mit GSAP**, nicht mit lose zusammengeklebtem CSS-Scroll-Hack für die Hauptstory. Offizielle Muster und Cleanup: Repo **[greensock/gsap-skills](https://github.com/greensock/gsap-skills)** (Plugin-Registrierung, React/`useGSAP`, `gsap.context`, Performance).

### Kern-APIs

| Werkzeug | Konkrete Rolle |
|----------|----------------|
| **`gsap.timeline()` + Tweens** | Lesbare Sequenzen statt unübersichtlicher `delay`-Ketten |
| **`stagger`** | Gleichartige Elemente (KPI-Zeilen, Listen) — Werte an **`tokens/motion.tokens.json`** ausrichten |
| **`ScrollTrigger`** | Start/Ende, **`scrub`** für scroll-gekoppelte Bewegung, **`pin`** für längere „Acts“ / Lesephasen, **`ScrollTrigger.refresh()`** nach Layout- oder Breakpoint-Änderungen |
| **Parallax / Tiefe** | Üblich als **scroll-gekoppelte `transform`** (`y`/`x`/leichte Skalierung) über **ScrollTrigger** + Timeline/Tween — **subtil** in Content-Sektionen, stärker nur wo es zur Gallery/Story passt (siehe `design-flow.json`: z. B. `parallax_light` / `parallax` als erlaubte Muster, nicht überall) |
| **Horizontale Tracks / Galerien** | Vertikaler Scroll **mappt** auf horizontale `x`-Bewegung (`scrub` o. Ä.), damit kein **nested-scroll**-Falle entsteht — siehe `library/02-blueprints/blueprint.mdx` |
| **`SplitText`** | Editorial: **Zeilen-, Wort- oder Zeichen-Reveals** für große Headlines — **nur** mit **A11y** und **Reduced-Motion-Fallback** (statischer sichtbarer Text bleibt verständlich) |
| **`Observer`** | Pointer/Wheel/Touch für **Karussell**, horizontales Scrubben **ohne** Konflikt mit nativem Scroll |
| **`ScrollToPlugin`** | Anker-/Sektions-Sprung **sparsam** und UX-schonend |
| **`CustomEase`** | Markige Kurven, konsistent zu Motion-Tokens — **kein** generischer „Stock“-Feel |

### Motion-Hierarchie

- **Eine primäre Animation pro Sektion** (Fokus), Rest unterstützend.
- Dauer typischerweise im Rahmen **ca. 0,6 s–1,4 s** für die meisten Bewegungen; **nicht** überall „unter 0,4 s“-Nervosität.
- **Max. 1–2 animierte Properties** pro Effekt — **nicht** gleichzeitig Scale + Rotate + Blur + Opacity ohne Grund.

---

## Tokens & Constraints

- **Zahlen und Rhythmus:** `tokens/motion.tokens.json`, `tokens/typography.tokens.json`, `tokens/primitive.tokens.json`, `tokens/semantic.tokens.json`.
- **Verbindliche Details:** `library/01-constraints/*.md` (besonders `motion.md`, `interactions.md`, `accessibility.md`, `performance.md`).

---

## Discovery

- **`library/03-project-questions/`** — nur **Client, Zielgruppe, Ton**; **Farben und System** kommen aus **`tokens/`** und der Library, nicht aus freiem Raten (`FOR_AI.md`, `website-discovery.questions.yaml`).

---

*Kurztitel: Awwwards-orientierte Qualität — **vermeide Slop**, **flüssiger Seiten-Flow**, **Formen mit Absicht**, **GSAP und Tokens**, **Lesbarkeit und Performance**.*
