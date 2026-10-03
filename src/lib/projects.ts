import { supabase } from "@/integrations/supabase/client";

export interface Project {
  id: string;
  name: string;
  category: string;
  short_description: string;
  full_description: string;
  objectives: string;
  technologies: string[];
  images: string[];
  github_url: string | null;
  demo_url: string | null;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

const BUCKET = "project-images";

/** Resolve a list of storage paths to signed, displayable URLs. */
export async function resolveImageUrls(paths: string[]): Promise<string[]> {
  if (!paths || paths.length === 0) return [];
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrls(paths, 60 * 60 * 24 * 7); // 7 days
  if (error || !data) return [];
  return data.map((d) => d.signedUrl).filter(Boolean) as string[];
}

export async function fetchPublishedProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Project[];
}

export async function fetchAllProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Project[];
}

export async function uploadProjectImages(files: File[]): Promise<string[]> {
  const paths: string[] = [];
  for (const file of files) {
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });
    if (error) throw error;
    paths.push(path);
  }
  return paths;
}
