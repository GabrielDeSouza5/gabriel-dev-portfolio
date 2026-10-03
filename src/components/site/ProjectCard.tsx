import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { useI18n } from "@/lib/i18n";
import { ImageCarousel } from "./ImageCarousel";

export function ProjectCard({
  project,
  images,
  onOpen,
  delay = 0,
}: {
  project: Project;
  images: string[];
  onOpen: () => void;
  delay?: number;
}) {
  const { t } = useI18n();
  return (
    <button
      onClick={onOpen}
      style={{ transitionDelay: `${delay}ms` }}
      className="reveal hover-lift group block w-full overflow-hidden rounded-2xl border border-border bg-card text-left shadow-soft"
    >
      <ImageCarousel
        images={images}
        className="aspect-[16/10] w-full"
      />
      <div className="flex items-start justify-between gap-4 p-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
            {project.category}
          </p>
          <h3 className="mt-2 text-2xl font-semibold">{project.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {project.short_description}
          </p>
          {project.technologies.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border bg-secondary px-2.5 py-1 text-xs text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-all group-hover:bg-primary group-hover:text-primary-foreground">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </button>
  );
}
