import { NextResponse } from 'next/server';
import { requireAdminSession } from '@/server/guard';
import {
  createLearningTrack,
  deleteLearningTrack,
  getLearningTracks,
  learningTrackSchema,
} from '@/server/learning-tracks';

export async function GET() {
  const auth = await requireAdminSession();
  if (auth.response) return auth.response;

  try {
    const tracks = await getLearningTracks();
    return NextResponse.json({ tracks });
  } catch {
    return NextResponse.json({ error: 'Gagal mengambil data learning tracks' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await requireAdminSession();
  if (auth.response) return auth.response;

  try {
    const body = await request.json();
    const parsed = learningTrackSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Validasi data gagal' }, { status: 400 });
    }

    const track = await createLearningTrack(parsed.data);
    return NextResponse.json({ track });
  } catch {
    return NextResponse.json({ error: 'Gagal membuat learning track' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const auth = await requireAdminSession();
  if (auth.response) return auth.response;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID wajib diisi' }, { status: 400 });
    }

    await deleteLearningTrack(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Gagal menghapus learning track' }, { status: 500 });
  }
}
