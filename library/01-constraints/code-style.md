# Code style & stack

## Intent (why)

Ein **klarer Standard-Stack** reduziert Entscheidungsmühe, macht Reviews vorhersagbar und erlaubt **gezielte Optimierung** (Bundling, Patterns, Testing) — statt dauernd zwischen Frameworks zu wechseln.

## Rules (non-negotiable)

- **Framework:** Es wird **ausschließlich React** verwendet (UI-Schicht). Neue Features, Refactors und Beispiele sind **React-first** auszulegen.
- **Optimierung für React:** Komponenten klar schneiden; **Seiteneffekte** in `useEffect`/`useLayoutEffect` bewusst und minimal; **Cleanup** für Subscriptions, Timer, GSAP-`context` (siehe `library/01-constraints/motion.md`).
- **Wiedererkennbare Struktur:** Feature-Ordner oder Domänen-Slices konsistent halten; **keine wilden Parallel-Architekturen** pro PR.
- **IDs:** sprechende **`id`-Attribute** auf relevanten HTML-Elementen in `.tsx` setzen (Tests, Tracking, Automation) — konsistent mit der Richtlinie in `tokens/semantic.tokens.json` / Projekt-Regeln.
- **Styling:** bevorzugt **Design-Tokens** (`tokens/*.json`) und **responsive** Einheiten (`clamp`) — siehe `library/01-constraints/typography.md` und `library/01-constraints/performance.md`.

## Patterns (how)

- **Server Components vs Client:** wo das Projekt React Server Components nutzt — Server-Logik und Daten-Fetching nach oben; **interaktive Blätter** als Client-Komponenten mit kleinem Boundary.
- **Code-Splitting:** `React.lazy` / dynamische Imports für schwere, seltene Oberflächen.
- **Listen/Keys:** stabile Keys; keine Index-Keys bei sortierbaren Daten.
- **GSAP in React:** `useGSAP` oder `gsap.context` + Revert — nie lose globale Selektoren ohne Scope.

## Anti-patterns (what to never do)

- **Vue/Svelte/Angular „nebenbei“** im gleichen Produkt-Frontend ohne explizites Projekt-Mandat — verwässert den Stack.
- **Imperatives DOM-Gewürz** (`document.querySelector` überall) statt React-State — außer für Messungen/Fokus mit klarer Kapselung.
- **Riesige „God“-Komponenten** ohne Aufteilung — untestbar, schwer memoization-fähig.
- **Props-Drilling bis ins Unermessliche** ohne Context/Composition — oder umgekehrt: **jeder Context für alles**.
- **Inline-Styles als Standard** statt Tokens/wiederverwendbarer Klassen — inkonsistent und schwer thembar.
- **Hooks-Regeln brechen** (Bedingungen, frühe Returns vor Hooks) — stillschweigende Produktionsbugs.
