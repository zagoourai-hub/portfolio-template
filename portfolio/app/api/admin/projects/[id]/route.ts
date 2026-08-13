import { NextResponse } from 'next/server';
import { requireAdminSession } from '@/server/guard';
import { deleteProject, getProjectById, projectSchema, updateProject } from '@/server/projects';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminSession();
  if (auth.response) return auth.response;

  try {
    const { id } = await params;
    const project = await getProjectById(id);
    if (!project) {
      return NextResponse.json({ error: 'Project tidak ditemukan' }, { status: 404 });
    }
    return NextResponse.json({ project });
  } catch {
    return NextResponse.json({ error: 'Gagal mengambil detail project' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminSession();
  if (auth.response) return auth.response;

  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = projectSchema.partial().safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validasi update project gagal', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const updated = await updateProject(id, parsed.data);
    return NextResponse.json({ project: updated });
  } catch {
    return NextResponse.json({ error: 'Gagal memperbarui project' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminSession();
  if (auth.response) return auth.response;

  try {
    const { id } = await params;
    await deleteProject(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Gagal menghapus project' }, { status: 500 });
  }
}
