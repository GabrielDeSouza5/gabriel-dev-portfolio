import { ArrowDown } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Hero() {
  const { t } = useI18n();

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden grid-bg"
    >
      {/* restrained depth behind the grid */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/[0.05] blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p className="fade-in-up mb-6 text-sm font-medium uppercase tracking-[0.25em] text-muted-foreground">
          {t("hero.welcome")}
        </p>
        <h1
          className="fade-in-up text-balance text-6xl font-bold leading-[0.95] sm:text-7xl md:text-8xl"
          style={{ animationDelay: "0.1s" }}
        >
          {t("hero.name")}
        </h1>
        <p
          className="fade-in-up mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
          style={{ animationDelay: "0.2s" }}
        >
          {t("hero.role")}
        </p>

        <div
          className="fade-in-up mt-10 flex justify-center"
          style={{ animationDelay: "0.3s" }}
        >
          <button
            onClick={() =>
              document
                .getElementById("building")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="hover-lift group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft"
          >
            {t("hero.cta")}
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground">
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-border p-1.5">
          <span className="scroll-cue h-1.5 w-1.5 rounded-full bg-muted-foreground" />
        </div>
      </div>

      <div className="hero-transition pointer-events-none absolute inset-x-0 bottom-0 h-24" />
    </section>
  );
}
