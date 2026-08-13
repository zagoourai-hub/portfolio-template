import { NextResponse } from 'next/server';
import { requireAdminSession } from '@/server/guard';
import {
  createSkill,
  createSkillGroup,
  deleteSkill,
  deleteSkillGroup,
  getSkillGroupsWithSkills,
  skillGroupSchema,
  skillSchema,
} from '@/server/skills';

export async function GET() {
  const auth = await requireAdminSession();
  if (auth.response) return auth.response;

  try {
    const groups = await getSkillGroupsWithSkills();
    return NextResponse.json({ groups });
  } catch {
    return NextResponse.json({ error: 'Gagal mengambil data skills' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await requireAdminSession();
  if (auth.response) return auth.response;

  try {
    const body = await request.json();
    if (body.type === 'group') {
      const parsed = skillGroupSchema.safeParse(body.data);
      if (!parsed.success) {
        return NextResponse.json({ error: 'Validasi group gagal' }, { status: 400 });
      }
      const group = await createSkillGroup(parsed.data);
      return NextResponse.json({ group });
    } else if (body.type === 'skill') {
      const parsed = skillSchema.safeParse(body.data);
      if (!parsed.success) {
        return NextResponse.json({ error: 'Validasi skill gagal' }, { status: 400 });
      }
      const skill = await createSkill(parsed.data);
      return NextResponse.json({ skill });
    }

    return NextResponse.json({ error: 'Tipe request tidak dikenal' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Gagal membuat item' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const auth = await requireAdminSession();
  if (auth.response) return auth.response;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const type = searchParams.get('type');

    if (!id || !type) {
      return NextResponse.json({ error: 'ID dan type wajib diisi' }, { status: 400 });
    }

    if (type === 'group') {
      await deleteSkillGroup(id);
    } else if (type === 'skill') {
      await deleteSkill(id);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Gagal menghapus item' }, { status: 500 });
  }
}
