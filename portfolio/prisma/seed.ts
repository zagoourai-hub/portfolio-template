import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import path from 'path';
import crypto from 'crypto';

// Relative path from seed file location to databases/dev.db
const dbPath = path.resolve(__dirname, '../../databases/dev.db');
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

async function main() {
  console.log('Seeding database at:', dbPath);

  // 1. Admin User
  const adminEmail = process.env.ADMIN_EMAIL || 'owner@example.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'superpassword123';
  const passwordHash = hashPassword(adminPassword);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: {
      email: adminEmail,
      passwordHash,
    },
  });

  // 2. Site Profile
  await prisma.siteProfile.deleteMany();
  await prisma.siteProfile.create({
    data: {
      name: 'Risz Developer',
      title: 'GenZ Student & Fullstack Dev',
      bio: 'Pelajar SMA / SMK yang suka ngulik Web Engineering, Next.js, dan bikin tool bermanfaat buat temen sekolah & komunitas.',
      email: 'risz@example.com',
      githubUrl: 'https://github.com/example/risz',
      linkedinUrl: 'https://linkedin.com/in/example-risz',
      avatarUrl: '/images/studio-hero.png',
    },
  });

  // 3. Skill Groups & Skills
  await prisma.skill.deleteMany();
  await prisma.skillGroup.deleteMany();

  const skillGroups = [
    {
      name: 'Languages & Core',
      order: 1,
      skills: [
        { name: 'TypeScript', level: 'Primary', category: 'Language' },
        { name: 'JavaScript (ES6+)', level: 'Core', category: 'Language' },
        { name: 'HTML5 & Semantic DOM', level: 'Core', category: 'Web' },
        { name: 'CSS3 & Modern Layouts', level: 'Core', category: 'Web' },
      ],
    },
    {
      name: 'Frameworks & Libraries',
      order: 2,
      skills: [
        { name: 'Next.js 16 (App Router)', level: 'Daily', category: 'Framework' },
        { name: 'React 19', level: 'Daily', category: 'Library' },
        { name: 'Tailwind CSS v4', level: 'Daily', category: 'Styling' },
        { name: 'Zustand & TanStack Query', level: 'Daily', category: 'State' },
      ],
    },
    {
      name: 'Tools & Ecosystem',
      order: 3,
      skills: [
        { name: 'Git & GitHub', level: 'Daily', category: 'Tool' },
        { name: 'Prisma v7', level: 'Learning', category: 'Database' },
        { name: 'VS Code & Neovim', level: 'Primary', category: 'Tool' },
        { name: 'Node.js & Bun', level: 'Primary', category: 'Runtime' },
      ],
    },
  ];

  for (const groupData of skillGroups) {
    const group = await prisma.skillGroup.create({
      data: {
        name: groupData.name,
        order: groupData.order,
      },
    });

    for (const skillData of groupData.skills) {
      await prisma.skill.create({
        data: {
          name: skillData.name,
          level: skillData.level,
          category: skillData.category,
          groupId: group.id,
        },
      });
    }
  }

  // 4. Learning Tracks
  await prisma.learningTrack.deleteMany();
  const learningTracks = [
    {
      title: 'Web Engine Fundamentals',
      provider: 'Self-taught',
      status: 'Completed',
      order: 1,
    },
    {
      title: 'Fullstack React & Next.js',
      provider: 'Independent Labs',
      status: 'In Progress',
      order: 2,
    },
    {
      title: 'Ship & Document',
      provider: 'Open Source',
      status: 'Planned',
      order: 3,
    },
  ];

  for (const track of learningTracks) {
    await prisma.learningTrack.create({ data: track });
  }

  // 5. Projects
  await prisma.project.deleteMany();
  const projects = [
    {
      slug: 'jadwal-belajar',
      title: 'Jadwal Belajar Pro',
      summary: 'Aplikasi web responsif buat atur jadwal pelajaran, counter deadline tugas, dan track jam belajar harian tanpa distrasi.',
      content: 'Bikin daftar mata pelajaran & deadline tugas tetep gampang dibaca pas pelajaran makin banyak tanpa bikin lemot di HP terjangkau. Pake Vanilla JS & CSS grid layout. Data disimpan di LocalStorage.',
      category: 'School',
      tags: 'HTML5, CSS3, JavaScript, LocalStorage',
      demoUrl: 'https://jadwal-belajar.example.com',
      repoUrl: 'https://github.com/example/jadwal-belajar',
      imageUrl: '/images/studio-work.png',
      status: 'PUBLISHED',
      featured: true,
    },
    {
      slug: 'papan-kelas',
      title: 'Papan Kelas Hub',
      summary: 'Dashboard pengumuman interaktif kelas dengan widget piket harian, countdown ujian, dan card catatan bersama.',
      content: 'Menggunakan Next.js App Router dengan Server Components untuk data statis & Zustand untuk UI state interaktif.',
      category: 'Lab',
      tags: 'React 19, Next.js 16, Tailwind CSS v4, TypeScript',
      demoUrl: 'https://papan-kelas.example.com',
      repoUrl: 'https://github.com/example/papan-kelas',
      imageUrl: '/images/studio-hero.png',
      status: 'PUBLISHED',
      featured: true,
    },
    {
      slug: 'catatan-koding',
      title: 'Catatan Koding DevLog',
      summary: 'Platform catatan teknis markdown personal tempat nyimpen error log, snippet berguna, dan cheatsheet koding.',
      content: 'Bikin SQLite DB lewat Prisma ORM, render Markdown dengan syntax highlighter, dan filter pencarian real-time.',
      category: 'Personal',
      tags: 'Next.js 16, Prisma, SQLite, Tailwind v4',
      demoUrl: 'https://catatan-koding.example.com',
      repoUrl: 'https://github.com/example/catatan-koding',
      imageUrl: '/images/studio-contact.png',
      status: 'DRAFT',
      featured: false,
    },
  ];

  for (const proj of projects) {
    await prisma.project.create({ data: proj });
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
