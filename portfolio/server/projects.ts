import { z } from 'zod';
import { db } from './db';

export const projectSchema = z.object({
  title: z.string().min(1, 'Judul project wajib diisi'),
  slug: z.string().optional(),
  summary: z.string().min(1, 'Summary wajib diisi'),
  content: z.string().min(1, 'Content wajib diisi'),
  category: z.string().default('Personal'),
  tags: z.string().min(1, 'Tags wajib diisi'),
  demoUrl: z.string().url('URL demo tidak valid').optional().or(z.literal('')),
  repoUrl: z.string().url('URL repo tidak valid').optional().or(z.literal('')),
  imageUrl: z.string().optional().or(z.literal('')),
  status: z.enum(['DRAFT', 'PUBLISHED']).default('DRAFT'),
  featured: z.boolean().default(false),
});

export type ProjectInput = z.infer<typeof projectSchema>;

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function getProjectsAdmin() {
  return await db.project.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function getProjectById(id: string) {
  return await db.project.findUnique({ where: { id } });
}

export async function createProject(data: ProjectInput) {
  let slug = data.slug ? slugify(data.slug) : slugify(data.title);
  let count = 1;
  const baseSlug = slug;

  while (await db.project.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  return await db.project.create({
    data: {
      ...data,
      slug,
    },
  });
}

export async function updateProject(id: string, data: Partial<ProjectInput>) {
  let slug = data.slug ? slugify(data.slug) : undefined;

  if (slug) {
    const existing = await db.project.findFirst({
      where: { slug, NOT: { id } },
    });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }
  }

  return await db.project.update({
    where: { id },
    data: {
      ...data,
      ...(slug ? { slug } : {}),
    },
  });
}

export async function deleteProject(id: string) {
  return await db.project.delete({ where: { id } });
}
