import { z } from 'zod';
import { db } from './db';

export const skillGroupSchema = z.object({
  name: z.string().min(1, 'Nama grup keahlian wajib diisi'),
  order: z.number().int().default(0),
});

export const skillSchema = z.object({
  name: z.string().min(1, 'Nama skill wajib diisi'),
  level: z.string().default('Intermediate'),
  category: z.string().default('General'),
  groupId: z.string().min(1, 'Grup ID wajib dipilih'),
});

export async function getSkillGroupsWithSkills() {
  return await db.skillGroup.findMany({
    orderBy: { order: 'asc' },
    include: {
      skills: {
        orderBy: { createdAt: 'asc' },
      },
    },
  });
}

export async function createSkillGroup(data: z.infer<typeof skillGroupSchema>) {
  return await db.skillGroup.create({ data });
}

export async function deleteSkillGroup(id: string) {
  return await db.skillGroup.delete({ where: { id } });
}

export async function createSkill(data: z.infer<typeof skillSchema>) {
  return await db.skill.create({ data });
}

export async function deleteSkill(id: string) {
  return await db.skill.delete({ where: { id } });
}
