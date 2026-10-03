import { Sparkles, ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function BuildingNow() {
  const { t } = useI18n();
  return (
    <section id="building" className="relative px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <div className="reveal hover-lift relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-soft sm:p-14">
          <div className="relative">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {t("building.label")}
              </span>
              <span className="ml-auto flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground/40" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-foreground" />
                </span>
                {t("building.tag")}
              </span>
            </div>

            <h2 className="mt-8 flex items-center gap-3 text-4xl font-bold sm:text-6xl">
              {t("building.title")}
              <ArrowUpRight className="h-7 w-7 text-muted-foreground sm:h-9 sm:w-9" />
            </h2>
            <p className="mt-6 max-w-3xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {t("building.text")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
