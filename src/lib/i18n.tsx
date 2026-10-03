import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "pt" | "en";

type Dict = Record<string, string>;

const pt: Dict = {
  "nav.about": "Sobre",
  "nav.skills": "Skills",
  "nav.projects": "Projetos",
  "nav.contact": "Contato",
  "nav.admin": "Admin",

  "hero.welcome": "Python Software Developer",
  "hero.name": "Gabriel Dev",
  "hero.role":
    "Gosto de transformar ideias e problemas em sistemas e ferramentas que realmente funcionam.",
  "hero.cta": "Ver projetos",
  "hero.scroll": "Role para explorar",

  "building.label": "Building Now",
  "building.title": "Vellio",
  "building.text":
    "Atualmente desenvolvendo o Vellio, uma plataforma criada para simplificar processos, conectar serviços e transformar fluxos complexos em ferramentas úteis.",
  "building.tag": "Em desenvolvimento",

  "about.label": "Sobre Mim",
  "about.title": "Ideias transformadas em software útil",
  "about.p1":
    "Sou desenvolvedor de software com foco em Python. Gosto de partir de uma ideia ou problema real e transformá-lo em um sistema ou ferramenta que funcione de forma clara e confiável.",
  "about.p2":
    "Meu interesse está em construir aplicações, APIs e integrações que resolvam necessidades práticas, com atenção à estrutura do sistema e à experiência de quem vai utilizá-lo.",
  "about.p3":
    "Python é minha principal tecnologia. Outras ferramentas entram conforme a necessidade de cada projeto e do problema que precisa ser resolvido.",
  "about.p4":
    "Mais do que listar tecnologias, quero mostrar o que construo, por que cada projeto existe e como ele transforma uma ideia em algo útil.",

  "skills.label": "Skills",
  "skills.title": "Tecnologias a serviço do projeto",
  "skills.python": "Desenvolvimento Python",
  "skills.systems": "Sistemas & APIs",
  "skills.tools": "Ferramentas complementares",
  "skills.item.database": "Banco de Dados",
  "skills.item.softwareTools": "Ferramentas de software",
  "skills.item.backendArchitecture": "Arquitetura Backend",
  "skills.item.authentication": "Autenticação",
  "skills.item.integrations": "Integrações",

  "projects.label": "Projetos",
  "projects.title": "Sistemas e ferramentas que construí",
  "projects.subtitle":
    "Projetos apresentados pelo que fazem, pelo problema que resolvem e pelas decisões usadas para construí-los.",
  "projects.empty": "Nenhum projeto publicado ainda.",
  "projects.view": "Ver detalhes",
  "projects.tech": "Tecnologias",
  "projects.objectives": "Problema e objetivo",
  "projects.gallery": "Galeria",
  "projects.github": "GitHub",
  "projects.demo": "Demo",
  "projects.close": "Fechar",

  "contact.label": "Contato",
  "contact.title": "Vamos construir algo",
  "contact.subtitle":
    "Aberto a projetos, colaborações e oportunidades. Envie uma mensagem.",
  "contact.name": "Nome",
  "contact.email": "Email",
  "contact.message": "Mensagem",
  "contact.send": "Enviar mensagem",
  "contact.sending": "Enviando...",
  "contact.success": "Mensagem enviada. Retornarei em breve.",
  "contact.error": "Não foi possível enviar. Tente novamente.",

  "footer.role": "Python Software Developer",
  "footer.rights": "Todos os direitos reservados.",

  "admin.title": "Painel administrativo",
  "admin.login": "Entrar",
  "admin.logout": "Sair",
  "admin.email": "Email",
  "admin.password": "Senha",
  "admin.signin": "Entrar no painel",
  "admin.signingin": "Entrando...",
  "admin.newProject": "Novo projeto",
  "admin.editProject": "Editar projeto",
  "admin.create": "Criar projeto",
  "admin.save": "Salvar alterações",
  "admin.cancel": "Cancelar",
  "admin.delete": "Excluir",
  "admin.published": "Publicado",
  "admin.draft": "Rascunho",
  "admin.publish": "Publicar",
  "admin.unpublish": "Despublicar",
  "admin.images": "Imagens",
  "admin.uploadImages": "Enviar imagens",
  "admin.uploading": "Enviando...",
  "admin.name": "Nome",
  "admin.category": "Categoria",
  "admin.short": "Descrição curta",
  "admin.full": "Descrição completa",
  "admin.objectives": "Objetivos",
  "admin.technologies": "Tecnologias (separadas por vírgula)",
  "admin.github": "Link do GitHub",
  "admin.demo": "Link da Demo",
  "admin.noAccess": "Acesso restrito a administradores.",
  "admin.confirmDelete": "Excluir este projeto permanentemente?",
  "admin.backToSite": "Voltar ao site",
  "admin.dashboard": "Projetos",
};

const en: Dict = {
  "nav.about": "About",
  "nav.skills": "Skills",
  "nav.projects": "Projects",
  "nav.contact": "Contact",
  "nav.admin": "Admin",

  "hero.welcome": "Python Software Developer",
  "hero.name": "Gabriel Dev",
  "hero.role":
    "I like turning ideas and problems into systems and tools that actually work.",
  "hero.cta": "View projects",
  "hero.scroll": "Scroll to explore",

  "building.label": "Building Now",
  "building.title": "Vellio",
  "building.text":
    "Currently building Vellio, a platform designed to simplify processes, connect services and turn complex workflows into useful tools.",
  "building.tag": "In development",

  "about.label": "About Me",
  "about.title": "Turning ideas into useful software",
  "about.p1":
    "I'm a software developer focused on Python. I like starting with an idea or a real problem and turning it into a clear, reliable system or tool that works.",
  "about.p2":
    "I'm interested in building applications, APIs and integrations that solve practical needs, with attention to system structure and the experience of the people using it.",
  "about.p3":
    "Python is my main technology. Other tools come in according to each project's needs and the problem that needs to be solved.",
  "about.p4":
    "Rather than listing technologies, I want to show what I build, why each project exists and how it turns an idea into something useful.",

  "skills.label": "Skills",
  "skills.title": "Technology in service of the project",
  "skills.python": "Python Development",
  "skills.systems": "Systems & APIs",
  "skills.tools": "Supporting tools",
  "skills.item.database": "Databases",
  "skills.item.softwareTools": "Software tools",
  "skills.item.backendArchitecture": "Backend Architecture",
  "skills.item.authentication": "Authentication",
  "skills.item.integrations": "Integrations",

  "projects.label": "Projects",
  "projects.title": "Systems and tools I've built",
  "projects.subtitle":
    "Projects presented through what they do, the problem they solve and the choices used to build them.",
  "projects.empty": "No published projects yet.",
  "projects.view": "View details",
  "projects.tech": "Technologies",
  "projects.objectives": "Problem and objective",
  "projects.gallery": "Gallery",
  "projects.github": "GitHub",
  "projects.demo": "Demo",
  "projects.close": "Close",

  "contact.label": "Contact",
  "contact.title": "Let's build something",
  "contact.subtitle":
    "Open to projects, collaborations and opportunities. Send a message.",
  "contact.name": "Name",
  "contact.email": "Email",
  "contact.message": "Message",
  "contact.send": "Send message",
  "contact.sending": "Sending...",
  "contact.success": "Message sent. I'll get back to you soon.",
  "contact.error": "Could not send. Please try again.",

  "footer.role": "Python Software Developer",
  "footer.rights": "All rights reserved.",

  "admin.title": "Admin panel",
  "admin.login": "Sign in",
  "admin.logout": "Sign out",
  "admin.email": "Email",
  "admin.password": "Password",
  "admin.signin": "Sign in to panel",
  "admin.signingin": "Signing in...",
  "admin.newProject": "New project",
  "admin.editProject": "Edit project",
  "admin.create": "Create project",
  "admin.save": "Save changes",
  "admin.cancel": "Cancel",
  "admin.delete": "Delete",
  "admin.published": "Published",
  "admin.draft": "Draft",
  "admin.publish": "Publish",
  "admin.unpublish": "Unpublish",
  "admin.images": "Images",
  "admin.uploadImages": "Upload images",
  "admin.uploading": "Uploading...",
  "admin.name": "Name",
  "admin.category": "Category",
  "admin.short": "Short description",
  "admin.full": "Full description",
  "admin.objectives": "Objectives",
  "admin.technologies": "Technologies (comma separated)",
  "admin.github": "GitHub link",
  "admin.demo": "Demo link",
  "admin.noAccess": "Access restricted to administrators.",
  "admin.confirmDelete": "Permanently delete this project?",
  "admin.backToSite": "Back to site",
  "admin.dashboard": "Projects",
};

const dicts: Record<Lang, Dict> = { pt, en };

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nCtx | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt");

  useEffect(() => {
    const stored = localStorage.getItem("gd-lang") as Lang | null;
    if (stored === "pt" || stored === "en") setLangState(stored);
    else if (navigator.language.toLowerCase().startsWith("en")) setLangState("en");
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("gd-lang", l);
  };

  const t = (key: string) => dicts[lang][key] ?? key;

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
