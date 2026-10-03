
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon, public;

-- Storage policies for project-images bucket
CREATE POLICY "Anyone can view project images" ON storage.objects
  FOR SELECT USING (bucket_id = 'project-images');
CREATE POLICY "Admins can upload project images" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update project images" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete project images" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'));
