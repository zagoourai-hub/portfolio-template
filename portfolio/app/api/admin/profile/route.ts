import { NextResponse } from 'next/server';
import { requireAdminSession } from '@/server/guard';
import { getSiteProfile, siteProfileSchema, updateSiteProfile } from '@/server/profile';

export async function GET() {
  const auth = await requireAdminSession();
  if (auth.response) return auth.response;

  try {
    const profile = await getSiteProfile();
    return NextResponse.json({ profile });
  } catch {
    return NextResponse.json({ error: 'Gagal mengambil data profil' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const auth = await requireAdminSession();
  if (auth.response) return auth.response;

  try {
    const body = await request.json();
    const parsed = siteProfileSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validasi gagal', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const updated = await updateSiteProfile(parsed.data);
    return NextResponse.json({ profile: updated });
  } catch {
    return NextResponse.json({ error: 'Gagal memperbarui profil' }, { status: 500 });
  }
}
