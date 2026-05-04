# Performance

## Intent (why)

Nutzer:innen erleben **Geschwindigkeit und Stabilität** als Qualität. Technisch heißt das: **minimale Ladekosten**, **stabile Layouts**, **schnelle Interaktion** und **flüssige Animationen ohne Timing-Chaos** — mit **Core Web Vitals** als komprimierter Messlatte, nicht als Buzzword.

## Rules (non-negotiable)

- **Core Web Vitals haben oberste Priorität:** konsequent für **LCP**, **INP** und **CLS** optimieren (Ziel: in Produktion in den grünen Bereich; Regressionen ernst nehmen).
- **Schnelle Ladbarkeit:** unnötigen Code, render-blockierende Ressourcen und Overhead vermeiden; **Lazy Loading**, **Code-Splitting** und **effiziente Asset-Strategien** nutzen, wo sie messbar helfen.
- **Native / schlanke Lösungen** externen Libraries vorziehen, **wenn** sie gleichwertig sind — schwere Abhängigkeiten brauchen eine harte Begründung.
- **Keine Timing-Probleme:** Animationen und Scroll-Logik so bauen, dass **kein „fight“ zwischen Layout, Fonts und JS** entsteht (Fonts mit `font-display`, feste Platzhalter für Medien, ScrollTrigger-Refresh nach Breakpoints — siehe `library/01-constraints/motion.md`).
- **Flüssige Animationen:** **Transforms/Opacity** bevorzugen; lange Main-Thread-Tasks im Input/Scroll vermeiden.
- **Bilder:** sinnvolle **Abmessungen** (`width`/`height` oder Aspect-Ratio), moderne Formate, **LCP-Bild** priorisieren (z. B. `fetchpriority`, nicht lazy für Above-the-fold).
- **Responsiv:** **`clamp()`** und flexible Layouts — keine festen Pixel als Standard für das gesamte UI (Ausnahmen nur bewusst).

## Patterns (how)

- **Budget-Denken:** JS-Bundles für Routes/Features splitten; schwere Drittanbieter erst nach Interaktion oder unter Viewport-Nachweis.
- **Vorab-Definition kritischer Flächen:** Hero/LCP-Elemente und Schriften so wählen, dass **kein großer Late-Load** das LCP verschiebt.
- **Messungen:** Lab (Lighthouse/WebPageTest) + Field (RUM), nicht nur „fühlt sich schnell an“.
- **Tokens:** Motion-Zeiten aus `tokens/motion.tokens.json` nutzen, damit **Einheitlichkeit + weniger ad-hoc Repaints** entstehen.

## Anti-patterns (what to never do)

- **Riesige globale Bundles** für eine Mini-Animation oder einen Slider.
- **Bilder ohne Dimensionen** — klassischer **CLS**-Treiber.
- **Render-blocking** CSS/JS auf kritischem Pfad ohne Strategie (`defer`, kritisches CSS, Preload nur mit Bedacht).
- **Scroll/Resize-Handler ohne Throttle/RAF** und mit teurem Layout-Read/Write-Mix — **INP**-Killer.
- **„Erst animieren, dann Content“** so, dass LCP oder erste Interaktion verschlechtert wird.
- **Performance nur am Ende „draufklatschen“** statt in Architektur- und Komponenten-Entscheidungen.
