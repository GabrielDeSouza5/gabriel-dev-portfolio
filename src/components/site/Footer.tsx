import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-display text-lg font-semibold">Gabriel Dev</p>
          <p className="text-sm text-muted-foreground">{t("footer.role")}</p>
        </div>
        <p className="text-sm text-muted-foreground">
          © {year} Gabriel Dev. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
