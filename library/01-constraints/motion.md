# Motion & GSAP

## Intent (why)

Bewegung soll **absichtsvoll, wartbar und performant** sein: klare Lesbarkeit der Seite, keine Ablenkung, keine Layout-Sprünge. Für GSAP-basierte Arbeit gilt: **KI und Menschen folgen denselben offiziellen GSAP-Leitlinien**, damit Timelines, ScrollTrigger und Cleanup konsistent und fehlerarm bleiben.

## Rules (non-negotiable)

- **Canonical Quelle für GSAP + KI:** Das Repo [greensock/gsap-skills](https://github.com/greensock/gsap-skills) ist die Referenz für Patterns, Plugin-Registrierung, React/Vanilla-Cleanup und Performance-Hinweise. Wo GSAP zum Einsatz kommt, **sind diese Skills maßgeblich** (Installation z. B. per `npx skills add https://github.com/greensock/gsap-skills` laut Repo-README).
- **Plugins einmal registrieren** (`gsap.registerPlugin(...)`) — nicht verstreut und nicht doppelt ohne Grund.
- **Timelines gegenüber Ketten aus `delay` bevorzugen**; Sequenzen müssen lesbar und editierbar sein.
- **Transforms und `autoAlpha` vor Layout-Properties** (kein Animieren von `width`/`height`/`top`/`left` als Standard).
- **ScrollTrigger:** nach Layout-/DOM-Änderungen **`ScrollTrigger.refresh()`** berücksichtigen; Trigger-Start/Ende explizit definieren, nicht „raten“.
- **Frameworks (React):** `useGSAP` bzw. `gsap.context()` + **Revert/Cleanup bei Unmount** — keine lose hängenden Listener oder Timelines.
- **`prefers-reduced-motion`:** respektieren oder reduzierte Alternativen anbieten.

## Patterns (how)

- **Vanilla / Setup:** Import, Plugin-Register, dann Tweens oder Timeline — wie im Quick-Reference im [gsap-skills README](https://github.com/greensock/gsap-skills).
- **Scroll-gekoppelt:** `scrollTrigger`-Objekt an Timeline oder Tween hängen; `scrub` nur wenn visuell sinnvoll und performant getestet.
- **Stagger:** für gleichartige Elemente (z. B. KPI-Zeilen) aus `tokens/motion.tokens.json` ableiten, nicht magische Zahlen im ganzen Code verteilen.
- **Projekt-Tokens:** Dauer und Easing mit `tokens/motion.tokens.json` alignen; GSAP-`ease` Strings oder CustomEase konsistent benennen.

## Anti-patterns (what to never do)

- GSAP „aus dem Bauch“ ohne **ScrollTrigger-Refresh** nach responsive Reflows — führt zu **falschen Trigger-Positionen** und „Timing-Problemen“.
- **Jank durch Layout-Animationen** (Margin/Padding/Width animieren) statt `transform`/`opacity`.
- **Unbegrenzte parallele Tweens** auf großen Listen ohne `gsap.context` / Revert — Speicherlecks und doppelte Listener.
- **ScrollTrigger auf jedes kleine Element** ohne Pin-Strategie — scrollbare Seiten fühlen sich „klebrig“ oder broken an.
- **Globale Selektoren** (`gsap.to(".box", ...)`) in React ohne **Scope/Ref** — trifft die falsche Instanz oder SSR.
- **Animation als Ersatz für Inhalt** (lange Intro-Sequences, die LCP blockieren oder INP verschlechtern).
- **Reduced Motion ignorieren** — rechtlich/ethisch riskant und schlechte UX.
