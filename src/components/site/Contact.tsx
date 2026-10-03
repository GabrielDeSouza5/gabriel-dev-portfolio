import { useState } from "react";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(1).max(2000),
});

const socials = [
  { icon: Github, href: "https://github.com/", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:gabriel@example.com", label: "Email" },
];

export function Contact() {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle",
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    const { error } = await supabase.from("contact_messages").insert(parsed.data);
    if (error) {
      setStatus("error");
      return;
    }
    setStatus("ok");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="relative px-6 py-28">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
        <div className="reveal">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {t("contact.label")}
          </p>
          <h2 className="mt-4 text-balance text-4xl font-bold sm:text-5xl">
            {t("contact.title")}
          </h2>
          <p className="mt-5 max-w-md text-lg text-muted-foreground">
            {t("contact.subtitle")}
          </p>
          <div className="mt-8 flex gap-3">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="hover-lift grid h-12 w-12 place-items-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="reveal space-y-4 rounded-2xl border border-border bg-card p-7 shadow-soft"
        >
          <Field
            label={t("contact.name")}
            value={form.name}
            onChange={(v) => setForm({ ...form, name: v })}
          />
          <Field
            label={t("contact.email")}
            type="email"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
          />
          <div>
            <label className="mb-1.5 block text-sm text-muted-foreground">
              {t("contact.message")}
            </label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={4}
              maxLength={2000}
              className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-ring"
            />
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="hover-lift flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            {status === "sending" ? t("contact.sending") : t("contact.send")}
            <Send className="h-4 w-4" />
          </button>
          {status === "ok" && (
            <p className="text-center text-sm text-foreground">
              {t("contact.success")}
            </p>
          )}
          {status === "error" && (
            <p className="text-center text-sm text-destructive">
              {t("contact.error")}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm text-muted-foreground">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-ring"
      />
    </div>
  );
}
