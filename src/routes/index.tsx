import { createFileRoute } from "@tanstack/react-router";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { BuildingNow } from "@/components/site/BuildingNow";
import { About } from "@/components/site/About";
import { Skills } from "@/components/site/Skills";
import { ProjectsSection } from "@/components/site/ProjectsSection";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [{ rel: "canonical", href: "/" }],
    meta: [
      { title: "Gabriel Dev — Python Software Developer" },
      {
        name: "description",
        content:
          "Portfólio de Gabriel Dev, desenvolvedor Python focado em transformar ideias e problemas em sistemas e ferramentas que funcionam.",
      },
      { property: "og:title", content: "Gabriel Dev — Python Software Developer" },
      {
        property: "og:description",
        content: "Sistemas, ferramentas e software útil construídos principalmente com Python.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/" },
    ],
  }),
  component: Index,
});

function Index() {
  useScrollReveal();

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Nav />
      <main>
        <Hero />
        <BuildingNow />
        <ProjectsSection />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
