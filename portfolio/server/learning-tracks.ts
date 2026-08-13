import { z } from 'zod';
import { db } from './db';

export const learningTrackSchema = z.object({
  title: z.string().min(1, 'Judul learning track wajib diisi'),
  provider: z.string().min(1, 'Provider/Penyelenggara wajib diisi'),
  status: z.string().default('In Progress'),
  certificateUrl: z.string().url('URL Sertifikat tidak valid').optional().or(z.literal('')),
  order: z.number().int().default(0),
});

export async function getLearningTracks() {
  return await db.learningTrack.findMany({
    orderBy: { order: 'asc' },
  });
}

export async function createLearningTrack(data: z.infer<typeof learningTrackSchema>) {
  return await db.learningTrack.create({ data });
}

export async function deleteLearningTrack(id: string) {
  return await db.learningTrack.delete({ where: { id } });
}
