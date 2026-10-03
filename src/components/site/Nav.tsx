import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Moon, Sun, Languages } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { useI18n } from "@/lib/i18n";

const links = [
  { id: "about", key: "nav.about" },
  { id: "skills", key: "nav.skills" },
  { id: "projects", key: "nav.projects" },
  { id: "contact", key: "nav.contact" },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Nav() {
  const { theme, toggle } = useTheme();
  const { lang, setLang, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`flex w-full max-w-5xl items-center justify-between gap-3 rounded-full px-3 py-2 transition-all duration-500 ${
          scrolled ? "glass shadow-soft" : "border border-transparent"
        }`}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="ml-2 flex items-center gap-2 text-sm font-semibold tracking-tight"
        >
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary text-primary-foreground font-display text-xs">
            GD
          </span>
          <span className="hidden sm:inline">Gabriel Dev</span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollToId(l.id)}
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(l.key)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setLang(lang === "pt" ? "en" : "pt")}
            aria-label="Toggle language"
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <Languages className="h-3.5 w-3.5" />
            {lang.toUpperCase()}
          </button>
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
          <Link
            to="/admin"
            className="ml-1 hidden rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:inline-block"
          >
            {t("nav.admin")}
          </Link>
        </div>
      </nav>
    </header>
  );
}
