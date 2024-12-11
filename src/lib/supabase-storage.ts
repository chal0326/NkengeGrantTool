import { supabase } from './supabase';

export async function uploadFile(
  bucket: string,
  path: string,
  file: File
): Promise<string | null> {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (error) {
    console.error('Error uploading file:', error);
    return null;
  }

  return data.path;
}

export async function uploadFiles(
  bucket: string,
  basePath: string,
  files: FileList
): Promise<string[]> {
  const uploadPromises = Array.from(files).map((file) => {
    const path = `${basePath}/${file.name}`;
    return uploadFile(bucket, path, file);
  });

  const results = await Promise.all(uploadPromises);
  return results.filter((path): path is string => path !== null);
}