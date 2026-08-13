import { NextResponse } from 'next/server';
import { requireAdminSession } from '@/server/guard';
import { createProject, getProjectsAdmin, projectSchema } from '@/server/projects';

export async function GET() {
  const auth = await requireAdminSession();
  if (auth.response) return auth.response;

  try {
    const projects = await getProjectsAdmin();
    return NextResponse.json({ projects });
  } catch {
    return NextResponse.json({ error: 'Gagal mengambil daftar project' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await requireAdminSession();
  if (auth.response) return auth.response;

  try {
    const body = await request.json();
    const parsed = projectSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validasi data project gagal', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const project = await createProject(parsed.data);
    return NextResponse.json({ project });
  } catch {
    return NextResponse.json({ error: 'Gagal membuat project' }, { status: 500 });
  }
}
