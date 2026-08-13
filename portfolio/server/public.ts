import { db } from './db';

export async function getPublicProfile() {
  const profile = await db.siteProfile.findFirst();
  return profile;
}

export async function getPublicSkillGroups() {
  return await db.skillGroup.findMany({
    orderBy: { order: 'asc' },
    include: {
      skills: {
        orderBy: { createdAt: 'asc' },
      },
    },
  });
}

export async function getPublicLearningTracks() {
  return await db.learningTrack.findMany({
    orderBy: { order: 'asc' },
  });
}

export async function getPublicPublishedProjects() {
  return await db.project.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getPublicProjectBySlug(slug: string) {
  return await db.project.findFirst({
    where: { slug, status: 'PUBLISHED' },
  });
}
