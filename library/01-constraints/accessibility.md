# Accessibility

## Intent (why)

Barrierefreiheit ist **kein Add-on**, sondern Teil von Qualität: mehr Menschen können Inhalte nutzen, rechtliche/organisatorische Risiken sinken, und **klare Semantik** hilft auch SEO und automatisierten Tests.

## Rules (non-negotiable)

- **`aria-label` / `aria-labelledby` / `aria-describedby`** gezielt einsetzen, wenn der **sichtbare Name** oder die **Beschreibung** für assistive Tech nicht ausreicht (Icons-only-Buttons, komplexe Steuerungen).
- **`img`:** sinnvolle **`alt`**-Texte für inhaltliche Bilder; **dekorativ:** `alt=""` und ggf. `aria-hidden="true"` auf rein dekorativem SVG — nie „Bild von…“-Fülltext ohne Informationsgewinn.
- **Farbkontrast** immer **im Kontext der gewählten Palette** prüfen (Vordergrund/Fläche/Fokus-Ring); wenn Tokens/Farben wechseln, **Kontrast neu validieren** (Text, UI-Komponenten, Fokus).
- **Nutzerfreundlichkeit:** Fokus sichtbar (`:focus-visible`), logische **Tab-Reihenfolge**, keine Fallen in Modals (Focus-Trap + Restore), Formularfehler verständlich benennen.
- **Semantik:** Landmark-Regionen (`header`, `nav`, `main`, `footer`), Überschriften-Hierarchie — konsistent mit **`tokens/semantic.tokens.json`**.

## Patterns (how)

- **Icon-Button:** `aria-label` mit **Verb + Kontext** („Menü öffnen“, „Eintrag löschen: Projekt X“).
- **Komplexe Widgets:** passende **ARIA-Rollen** nur wenn nötig; **lieber natives HTML** (`button`, `a`, `input`, `details`) als nachgebautes Div-Widget.
- **Kontrast:** bei jeder neuen Farbkombination **WCAG-Kontrast** für normalen und großen Text prüfen; Fokus-Ring nicht nur „hübsch“, sondern **sichtbar auf allen Hintergründen**.
- **Medien:** `video` mit Untertiteln/Transkript wo inhaltlich relevant; `track` berücksichtigen.

## Anti-patterns (what to never do)

- **`aria-label` auf alles streuen**, obwohl sichtbarer Text existiert — doppelt und widersprüchlich für Screenreader.
- **Generische alts** („image“, „grafik“) — verschwendet Aufmerksamkeit, hilft nicht.
- **Kontrast nur „ungefähr“** nach Gefühl — besonders auf **farbigem Text** und **Ghost-Buttons**.
- **Fokus-Outline global entfernen** ohne gleichwertigen Ersatz — eines der schlimmsten UX/A11y-Sünden.
- **`role="button"` auf `div`** ohne Keyboard-Handling und ohne `tabindex` — kaputte Tastatur-Bedienung.
- **Farbe als einziger Träger von Information** (Fehler rot ohne Text/Hinweis).
