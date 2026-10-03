import { Braces, Boxes, Wrench } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const groups = [
  {
    icon: Braces,
    titleKey: "skills.python",
    items: [
      "Python",
      "APIs REST",
      "skills.item.database",
      "skills.item.softwareTools",
    ],
  },
  {
    icon: Boxes,
    titleKey: "skills.systems",
    items: [
      "skills.item.backendArchitecture",
      "skills.item.authentication",
      "skills.item.integrations",
      "APIs",
    ],
  },
  {
    icon: Wrench,
    titleKey: "skills.tools",
    items: ["Node.js", "Express", "PostgreSQL", "JWT"],
  },
];

export function Skills() {
  const { t } = useI18n();
  return (
    <section id="skills" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="reveal max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {t("skills.label")}
          </p>
          <h2 className="mt-4 text-balance text-4xl font-bold sm:text-5xl">
            {t("skills.title")}
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {groups.map((g, i) => {
            const Icon = g.icon;
            return (
              <div
                key={g.titleKey}
                className="reveal hover-lift group rounded-2xl border border-border bg-card p-7 shadow-soft"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-xl font-semibold">{t(g.titleKey)}</h3>
                <ul className="mt-5 space-y-2.5">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-sm text-muted-foreground"
                    >
                      <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                      {item.startsWith("skills.") ? t(item) : item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
