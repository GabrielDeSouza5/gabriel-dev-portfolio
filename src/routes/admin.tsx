import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Upload,
  ArrowLeft,
  X,
  Loader2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/use-auth";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import {
  fetchAllProjects,
  resolveImageUrls,
  uploadProjectImages,
  type Project,
} from "@/lib/projects";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Gabriel Dev" },
      {
        name: "description",
        content: "Área administrativa privada do portfólio Gabriel Dev.",
      },
      { property: "og:title", content: "Admin — Gabriel Dev" },
      {
        property: "og:description",
        content: "Área administrativa privada do portfólio Gabriel Dev.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { session, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!session) return <LoginView />;
  if (!isAdmin) return <NoAccessView />;
  return <Dashboard />;
}

/* ---------------- Login ---------------- */

function LoginView() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    const fn =
      mode === "signin"
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: window.location.origin + "/admin" },
          });
    const { error } = await fn;
    if (error) setError(error.message);
    setBusy(false);
  };

  return (
    <div className="grid min-h-screen place-items-center bg-background px-4">
      <div className="w-full max-w-sm">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("admin.backToSite")}
        </Link>
        <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
          <h1 className="text-2xl font-bold">{t("admin.title")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "signin" ? t("admin.signin") : t("admin.login")}
          </p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <input
              type="email"
              required
              placeholder={t("admin.email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring"
            />
            <input
              type="password"
              required
              minLength={6}
              placeholder={t("admin.password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring"
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <button
              type="submit"
              disabled={busy}
              className="hover-lift flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
            >
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              {mode === "signin" ? t("admin.signin") : t("admin.login")}
            </button>
          </form>
          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="mt-4 w-full text-center text-xs text-muted-foreground hover:text-foreground"
          >
            {mode === "signin"
              ? "Criar conta de administrador / Create admin account"
              : "Já tenho conta / I already have an account"}
          </button>
        </div>
      </div>
    </div>
  );
}

function NoAccessView() {
  const { t } = useI18n();
  return (
    <div className="grid min-h-screen place-items-center bg-background px-4 text-center">
      <div>
        <p className="text-lg font-semibold">{t("admin.noAccess")}</p>
        <button
          onClick={() => supabase.auth.signOut()}
          className="mt-4 inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm"
        >
          <LogOut className="h-4 w-4" />
          {t("admin.logout")}
        </button>
      </div>
    </div>
  );
}

/* ---------------- Dashboard ---------------- */

const emptyDraft: Partial<Project> = {
  name: "",
  category: "",
  short_description: "",
  full_description: "",
  objectives: "",
  technologies: [],
  images: [],
  github_url: "",
  demo_url: "",
  published: false,
  sort_order: 0,
};

function Dashboard() {
  const { t } = useI18n();
  const { theme, toggle } = useTheme();
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Partial<Project> | null>(null);

  const load = () => fetchAllProjects().then(setProjects).catch(() => {});

  useEffect(() => {
    load();
  }, []);

  const togglePublish = async (p: Project) => {
    await supabase
      .from("projects")
      .update({ published: !p.published })
      .eq("id", p.id);
    load();
  };

  const remove = async (p: Project) => {
    if (!confirm(t("admin.confirmDelete"))) return;
    await supabase.from("projects").delete().eq("id", p.id);
    load();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-border glass">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-6 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground font-display text-xs">
              GD
            </span>
            <h1 className="truncate font-display text-lg font-semibold">
              {t("admin.dashboard")}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              className="rounded-lg border border-border px-3 py-2 text-xs"
            >
              {theme === "dark" ? "Light" : "Dark"}
            </button>
            <Link
              to="/"
              className="rounded-lg border border-border px-3 py-2 text-xs"
            >
              {t("admin.backToSite")}
            </Link>
            <button
              onClick={() => supabase.auth.signOut()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground"
            >
              <LogOut className="h-3.5 w-3.5" />
              {t("admin.logout")}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <button
          onClick={() => setEditing({ ...emptyDraft })}
          className="hover-lift mb-8 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
        >
          <Plus className="h-4 w-4" />
          {t("admin.newProject")}
        </button>

        <div className="space-y-3">
          {projects.map((p) => (
            <div
              key={p.id}
              className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="truncate font-semibold">{p.name}</h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      p.published
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {p.published ? t("admin.published") : t("admin.draft")}
                  </span>
                </div>
                <p className="truncate text-sm text-muted-foreground">
                  {p.category}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <IconBtn onClick={() => togglePublish(p)} title={t("admin.publish")}>
                  {p.published ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </IconBtn>
                <IconBtn onClick={() => setEditing(p)} title={t("admin.editProject")}>
                  <Pencil className="h-4 w-4" />
                </IconBtn>
                <IconBtn onClick={() => remove(p)} title={t("admin.delete")} danger>
                  <Trash2 className="h-4 w-4" />
                </IconBtn>
              </div>
            </div>
          ))}
        </div>
      </main>

      {editing && (
        <ProjectEditor
          draft={editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            load();
          }}
        />
      )}
    </div>
  );
}

function IconBtn({
  children,
  onClick,
  title,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`grid h-9 w-9 place-items-center rounded-lg border border-border transition-colors hover:bg-accent ${
        danger ? "text-destructive" : "text-muted-foreground"
      }`}
    >
      {children}
    </button>
  );
}

/* ---------------- Editor ---------------- */

function ProjectEditor({
  draft,
  onClose,
  onSaved,
}: {
  draft: Partial<Project>;
  onClose: () => void;
  onSaved: () => void;
}) {
  const { t } = useI18n();
  const [form, setForm] = useState<Partial<Project>>(draft);
  const [techInput, setTechInput] = useState(
    (draft.technologies ?? []).join(", "),
  );
  const [images, setImages] = useState<string[]>(draft.images ?? []);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [busy, setBusy] = useState(false);
  const isNew = !draft.id;

  useEffect(() => {
    resolveImageUrls(images).then(setPreviews);
  }, [images]);

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setUploading(true);
    try {
      const paths = await uploadProjectImages(files);
      setImages((prev) => [...prev, ...paths]);
    } catch {
      /* ignore */
    }
    setUploading(false);
    e.target.value = "";
  };

  const removeImage = (path: string) => {
    setImages((prev) => prev.filter((p) => p !== path));
    supabase.storage.from("project-images").remove([path]);
  };

  const save = async () => {
    setBusy(true);
    const payload = {
      name: form.name ?? "",
      category: form.category ?? "",
      short_description: form.short_description ?? "",
      full_description: form.full_description ?? "",
      objectives: form.objectives ?? "",
      technologies: techInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      images,
      github_url: form.github_url || null,
      demo_url: form.demo_url || null,
      published: form.published ?? false,
      sort_order: form.sort_order ?? 0,
    };
    if (isNew) {
      await supabase.from("projects").insert(payload);
    } else {
      await supabase.from("projects").update(payload).eq("id", draft.id!);
    }
    setBusy(false);
    onSaved();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-background/70 p-4 backdrop-blur-md sm:p-8"
      onClick={onClose}
    >
      <div
        className="fade-in-up my-auto w-full max-w-2xl rounded-3xl border border-border bg-card p-7 shadow-glass sm:p-9"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {isNew ? t("admin.newProject") : t("admin.editProject")}
          </h2>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <EditField
            label={t("admin.name")}
            value={form.name ?? ""}
            onChange={(v) => setForm({ ...form, name: v })}
          />
          <EditField
            label={t("admin.category")}
            value={form.category ?? ""}
            onChange={(v) => setForm({ ...form, category: v })}
          />
          <EditField
            label={t("admin.short")}
            value={form.short_description ?? ""}
            onChange={(v) => setForm({ ...form, short_description: v })}
          />
          <EditArea
            label={t("admin.full")}
            value={form.full_description ?? ""}
            onChange={(v) => setForm({ ...form, full_description: v })}
          />
          <EditArea
            label={t("admin.objectives")}
            value={form.objectives ?? ""}
            onChange={(v) => setForm({ ...form, objectives: v })}
          />
          <EditField
            label={t("admin.technologies")}
            value={techInput}
            onChange={setTechInput}
          />
          <EditField
            label={t("admin.github")}
            value={form.github_url ?? ""}
            onChange={(v) => setForm({ ...form, github_url: v })}
          />
          <EditField
            label={t("admin.demo")}
            value={form.demo_url ?? ""}
            onChange={(v) => setForm({ ...form, demo_url: v })}
          />

          {/* Images */}
          <div>
            <label className="mb-1.5 block text-sm text-muted-foreground">
              {t("admin.images")}
            </label>
            <div className="flex flex-wrap gap-3">
              {previews.map((src, i) => (
                <div key={i} className="relative h-20 w-28 overflow-hidden rounded-lg border border-border">
                  <img src={src} alt="" className="h-full w-full object-cover" />
                  <button
                    onClick={() => removeImage(images[i])}
                    className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-background/80 text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <label className="grid h-20 w-28 cursor-pointer place-items-center rounded-lg border border-dashed border-border text-muted-foreground transition-colors hover:bg-accent">
                {uploading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Upload className="h-5 w-5" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={onUpload}
                />
              </label>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.published ?? false}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
              className="h-4 w-4 accent-[var(--primary)]"
            />
            {t("admin.published")}
          </label>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold"
          >
            {t("admin.cancel")}
          </button>
          <button
            onClick={save}
            disabled={busy || uploading}
            className="hover-lift inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            {isNew ? t("admin.create") : t("admin.save")}
          </button>
        </div>
      </div>
    </div>
  );
}

function EditField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm text-muted-foreground">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-ring"
      />
    </div>
  );
}

function EditArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm text-muted-foreground">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full resize-none rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-ring"
      />
    </div>
  );
}
