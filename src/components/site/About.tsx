import { useI18n } from "@/lib/i18n";

export function About() {
  const { t } = useI18n();
  const paragraphs = ["about.p1", "about.p2", "about.p3", "about.p4"];

  return (
    <section id="about" className="relative px-6 py-28">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.8fr_1.2fr]">
        <div className="reveal">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {t("about.label")}
          </p>
          <h2 className="mt-4 text-balance text-4xl font-bold leading-tight sm:text-5xl">
            {t("about.title")}
          </h2>
        </div>
        <div className="space-y-6">
          {paragraphs.map((p, i) => (
            <p
              key={p}
              className="reveal text-lg leading-relaxed text-muted-foreground"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              {t(p)}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
