import { useEffect, useState } from "react";
import {
  fetchPublishedProjects,
  resolveImageUrls,
  type Project,
} from "@/lib/projects";
import { useI18n } from "@/lib/i18n";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";

export function ProjectsSection() {
  const { t } = useI18n();
  const [projects, setProjects] = useState<Project[]>([]);
  const [imageMap, setImageMap] = useState<Record<string, string[]>>({});
  const [active, setActive] = useState<Project | null>(null);
  const [loaded, setLoaded] = useState(false);
  const reveal = useScrollReveal<HTMLDivElement>([projects.length, loaded]);

  useEffect(() => {
    fetchPublishedProjects()
      .then(async (data) => {
        setProjects(data);
        const map: Record<string, string[]> = {};
        await Promise.all(
          data.map(async (p) => {
            map[p.id] = await resolveImageUrls(p.images);
          }),
        );
        setImageMap(map);
      })
      .catch(() => setProjects([]))
      .finally(() => setLoaded(true));
  }, []);

  return (
    <section id="projects" ref={reveal} className="relative border-y border-border bg-secondary/30 px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="reveal max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {t("projects.label")}
          </p>
          <h2 className="mt-4 text-balance text-4xl font-bold sm:text-5xl">
            {t("projects.title")}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {t("projects.subtitle")}
          </p>
        </div>

        {loaded && projects.length === 0 ? (
          <p className="mt-14 text-muted-foreground">{t("projects.empty")}</p>
        ) : (
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {projects.map((p, i) => (
              <ProjectCard
                key={p.id}
                project={p}
                images={imageMap[p.id] ?? []}
                delay={i * 90}
                onOpen={() => setActive(p)}
              />
            ))}
          </div>
        )}
      </div>

      {active && (
        <ProjectModal
          project={active}
          images={imageMap[active.id] ?? []}
          onClose={() => setActive(null)}
        />
      )}
    </section>
  );
}
