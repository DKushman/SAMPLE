FEATURES SECTION — ANTI-PATTERNS
===================================
Was eine Features-Section generisch macht.
Diese Liste ist wichtiger als alle positiven Beschreibungen.
AI liest diese Datei VOR der Code-Generierung.
Layout Anti-Patterns

3 gleich große Cards nebeneinander
Das ist das #1 Signal für AI-generiertes Design. Nie wieder.
Fix: split-Variante oder rows mit unterschiedlichen Gewichtungen.
Alle Items gleiche Höhe
Wenn jedes Feature gleich viel Raum bekommt, fühlt sich nichts wichtig an.
Fix: item[0] muss immer visuell dominieren.
Symmetrisches Grid ohne Bruch
2-spaltige Grids die sich perfekt wiederholen.
Fix: Erste Row bricht das Grid. Dann darf es sich wiederholen.
Bild brav zentriert im Container
Bilder die artig in ihrer Box sitzen = Stock-Photo-Feeling.
Fix: overflow, clip, overlap mit Text, oder ganz ohne Bild.
Icon + Headline + 2 Zeilen Body (wiederholt)
Das ist das Card-Template aus 2018. Jede SaaS-Seite sieht so aus.
Fix: Kein Icon wenn das Icon nichts sagt. Headline muss ohne Icon funktionieren.

Typografie Anti-Patterns

Heading als Dekoration
"Our Features" als h2 über dem eigentlichen Content.
Fix: Der erste Feature-Headline IST das Heading. Section label = klein, mono.
Alle Headings gleiche Größe
Wenn Feature 1 und Feature 4 gleich groß sind, gibt es keine Hierarchie.
Fix: item[0] mindestens doppelt so groß wie item[2+].
Bold auf allem
Wenn alles bold ist, ist nichts bold.
Fix: Eine Größe dominiert, Rest ist regular weight.
Generic Sans-Serif Body
Inter/Roboto auf weißem Hintergrund mit grauem Body Text.
Fix: Entweder Token-Schrift mit Charakter, oder gezielt Mono für Labels.

Motion Anti-Patterns

Alle Elemente gleicher fade-in-up
translateY(20px) → 0, opacity 0 → 1, delay increments von 0.1s.
Das ist das Default-Motion-Template. Jeder nutzt es.
Fix: Unterschiedliche Entry-Typen: Index von links, Headline von unten, Body fade only.
Motion auf scroll für alles
Wenn jedes Element eine scroll-triggered Animation hat, wird keins bemerkt.
Fix: Nur das Featured Item hat auffällige Motion. Rest ist subtle.
Hover-State auf Cards die nicht klickbar sind
Hover-Effekte signalisieren Interaktivität. Wenn nichts passiert beim Klick = Verwirrung.
Fix: Hover nur wenn es einen Link gibt.

Content Anti-Patterns

"Powerful", "Seamless", "Robust"
Diese Adjektive sagen nichts. Jede SaaS-Seite hat sie.
Fix: Konkrete Aussage oder gar nichts. "Sub-second load" > "Powerful performance".
6 gleich wichtige Features
Wenn alles gleich wichtig ist, ist nichts wichtig.
Fix: Max 3 "echte" Features, Rest als kompakte Rows oder gar nicht.
Feature-Titel = Nomen
"Performance", "Security", "Scalability" als Titel.
Fix: Eine Aussage als Titel: "Sub-second load, every time."