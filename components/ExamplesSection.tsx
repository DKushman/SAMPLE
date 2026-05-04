import Link from "next/link";

const projects = [
  {
    slug: "projekt-rheinband",
    href: "#projekt-rheinband",
    title: "Projekt Rheinband",
    year: "2024",
    description:
      "Lobby und Signaletik für ein Boutique-Hotel — warmes Licht, großzügige Proportionen, ruhige Materialpalette.",
    mediaGradient:
      "linear-gradient(to bottom right, #722F37 0%, #3d151c 100%)",
  },
  {
    slug: "atelier-schwenk",
    href: "#atelier-schwenk",
    title: "Atelier Schwenk",
    year: "2023",
    description:
      "Ausstellungsfläche und Werkstatt unter einem Dach: klare Zonen, weiche Übergänge, viel Luft zwischen den Objekten.",
    mediaGradient:
      "linear-gradient(to bottom right, #4a1822 0%, #12080a 100%)",
  },
  {
    slug: "pavillon-kontor",
    href: "#pavillon-kontor",
    title: "Pavillon Kontor",
    year: "2022",
    description:
      "Temporärer Pavillon als Gesprächsort: Holztragwerk, textile Wände, Tageslicht geführt über eine schmale Fuge.",
    mediaGradient:
      "linear-gradient(to bottom right, #2a1216 0%, #722F37 100%)",
  },
] as const;

export default function ExamplesSection() {
  return (
    <section
      id="beispiele"
      className="border-t border-white/10 bg-neutral-950 text-white"
      aria-labelledby="examples-heading"
    >
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-28">
        <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#c9a4aa]">
          Beispiele
        </p>
        <h2
          id="examples-heading"
          className="mt-3 max-w-2xl font-serif text-3xl font-medium leading-tight sm:text-4xl"
        >
          Ausgewählte Arbeiten
        </h2>
        <p className="mt-5 max-w-2xl font-sans text-sm leading-relaxed text-white/65 sm:text-base">
          Drei fiktive Referenzprojekte als kompakte Case-Karten — editorial gesetzt,
          mit bewusster Form statt austauschbarem Raster.
        </p>

        <ul
          role="list"
          className="mt-16 grid list-none gap-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16"
        >
          {projects.map((project, index) => (
            <li
              key={project.slug}
              className={
                index === 1
                  ? "md:-translate-y-6"
                  : index === 2
                    ? "md:translate-y-8"
                    : ""
              }
            >
              <article className="relative flex h-full flex-col border border-white/12 bg-[#12080a] transition-[border-color] duration-300 ease-out hover:border-[#c9a4aa]/50 focus-within:border-[#c9a4aa]">
                <Link
                  href={project.href}
                  className="group flex h-full flex-col outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <div
                    className="relative aspect-[4/3] w-full overflow-hidden"
                    style={{
                      clipPath: "polygon(0 0, 100% 6%, 100% 100%, 0 94%)",
                    }}
                    aria-hidden="true"
                  >
                    <div
                      className="absolute inset-0 opacity-90"
                      style={{ backgroundImage: project.mediaGradient }}
                    />
                    <div
                      className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_55%)]"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="font-serif text-xl font-medium tracking-tight text-white sm:text-2xl">
                        <span className="relative inline-block">
                          {project.title}
                          <span
                            className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[#c9a4aa] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                            aria-hidden="true"
                          />
                        </span>
                      </h3>
                      <time
                        className="font-sans text-xs tabular-nums uppercase tracking-[0.2em] text-white/45"
                        dateTime={project.year}
                      >
                        {project.year}
                      </time>
                    </div>
                    <p className="font-sans text-sm leading-relaxed text-white/70 sm:text-[0.9375rem]">
                      {project.description}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-2 font-sans text-[11px] font-medium uppercase tracking-[0.25em] text-[#c9a4aa] transition-colors group-hover:text-white group-focus-visible:text-white">
                      Fallstudie
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
