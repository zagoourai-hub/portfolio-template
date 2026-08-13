import { NextResponse } from 'next/server';
import { destroySessionCookie } from '@/server/auth';

export async function POST() {
  try {
    await destroySessionCookie();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Gagal melakukan logout.' },
      { status: 500 }
    );
  }
}
