import { z } from 'zod';
import { db } from './db';

export const siteProfileSchema = z.object({
  name: z.string().min(1, 'Nama wajib diisi'),
  title: z.string().min(1, 'Title wajib diisi'),
  bio: z.string().min(1, 'Bio wajib diisi'),
  email: z.string().email('Email tidak valid'),
  githubUrl: z.string().url('URL GitHub tidak valid').optional().or(z.literal('')),
  linkedinUrl: z.string().url('URL LinkedIn tidak valid').optional().or(z.literal('')),
  avatarUrl: z.string().optional().or(z.literal('')),
});

export type SiteProfileInput = z.infer<typeof siteProfileSchema>;

export async function getSiteProfile() {
  const profile = await db.siteProfile.findFirst();
  return profile;
}

export async function updateSiteProfile(data: SiteProfileInput) {
  const existing = await db.siteProfile.findFirst();
  if (existing) {
    return await db.siteProfile.update({
      where: { id: existing.id },
      data,
    });
  } else {
    return await db.siteProfile.create({
      data,
    });
  }
}
