# Typography & hierarchy

## Intent (why)

Typografie trägt **Struktur, SEO und Barrierefreiheit**: Suchmaschinen und Screenreader folgen der logischen Gliederung. Eine klare **h1–h6-Hierarchie** plus **`p` für Fließtext** macht Seiten scanbar und vermeidet „Überschriften-Dekoration“ ohne Bedeutung.

## Rules (non-negotiable)

- **Genau eine `h1`** pro logischer Seite (ein Hauptthema).
- **Keine Hierarchie-Sprünge:** nicht von `h1` zu `h3`, wenn kein `h2` dazwischen inhaltlich passt.
- **`h2`–`h6`:** nur für echte Unterkapitel; keine Größenwahl über Überschriften-Level (Styling kommt aus CSS/Tokens, nicht aus „ich nehme h4 weil kleiner“).
- **`p`:** jeder sinnvolle Textabsatz in `p`; kein Fließtext in `div`/`span`.
- **Semantik:** immer **echtes HTML nach Bedeutung** wählen (`section`, `article`, `nav`, `main`, Listen, `time`, …) — nicht nur Klassen auf `div`.
- **Dokumentation der Tags:** Bedeutung und Verwendung pro Element sind in **`tokens/semantic.tokens.json`** festgehalten; bei Unklarheiten dort nachschlagen und bei neuen Mustern **Tokens + Markup** synchron halten.
- **Fluid typography:** Schriftgrößen über **`clamp()`** (siehe `tokens/typography.tokens.json`); `line-height` bewusst anpassen, nicht copy-paste über alle Ebenen.

## Patterns (how)

- **Sektion:** `section` (oder `article`) mit **einer Überschrift der passenden Ebene** als erstes sichtbares Kind der Sektion (meist `h2` unterhalb der Seiten-`h1`).
- **Listen:** `ul`/`ol` + `li` für Aufzählungen; Definitionen mit `dl`/`dt`/`dd` wo sinnvoll.
- **Kopplung an Tokens:** `font-size`/`line-height` aus Design-Tokens beziehen; Abstände zu Überschriften mit `tokens/primitive.tokens.json` (Spacing für `h1`/`h2`/`p`) abstimmen.

## Anti-patterns (what to never do)

- **`div` mit Klasse „h1-style“** statt echter `h1`/`h2` — bricht Outline, SEO und Screenreader.
- **Mehrere `h1`** „weil Design“ — verwässert das Seitenthema.
- **Überschriften nur für Abstand** leer oder mit Icon-only ohne zugänglichen Namen.
- **`p` in `p` verschachteln** oder Absätze nur mit `<br><br>` trennen.
- **Reihenfolge nur visuell korrigieren** (CSS `order`) ohne logische DOM-Reihenfolge — Tastatur und Screenreader folgen dem DOM.
- **Semantik und `semantic.tokens.json` auseinanderlaufen lassen** (Token sagt A, Markup macht B) — das ist die häufigste Quelle für inkonsistente KI-Ausgaben.
