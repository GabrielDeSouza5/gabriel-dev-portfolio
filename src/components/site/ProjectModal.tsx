import { useEffect } from "react";
import { X, Github, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/projects";
import { useI18n } from "@/lib/i18n";
import { ImageCarousel } from "./ImageCarousel";

export function ProjectModal({
  project,
  images,
  onClose,
}: {
  project: Project;
  images: string[];
  onClose: () => void;
}) {
  const { t } = useI18n();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-background/70 p-4 backdrop-blur-md sm:p-8"
      onClick={onClose}
    >
      <div
        className="fade-in-up relative my-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-border bg-card shadow-glass"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label={t("projects.close")}
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full glass text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <ImageCarousel images={images} className="aspect-[16/9] w-full" />

        <div className="p-7 sm:p-9">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
            {project.category}
          </p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{project.name}</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {project.full_description}
          </p>

          {project.objectives && (
            <div className="mt-7">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                {t("projects.objectives")}
              </h3>
              <p className="mt-2 leading-relaxed text-foreground/90">
                {project.objectives}
              </p>
            </div>
          )}

          {project.technologies.length > 0 && (
            <div className="mt-7">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                {t("projects.tech")}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {(project.github_url || project.demo_url) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover-lift inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold"
                >
                  <Github className="h-4 w-4" />
                  {t("projects.github")}
                </a>
              )}
              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover-lift inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
                >
                  <ExternalLink className="h-4 w-4" />
                  {t("projects.demo")}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
