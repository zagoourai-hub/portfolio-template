import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createSessionCookie, verifyOwnerCredentials } from '@/server/auth';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Email atau password tidak valid.' },
        { status: 400 }
      );
    }

    const user = await verifyOwnerCredentials(parsed.data.email, parsed.data.password);
    if (!user) {
      return NextResponse.json(
        { error: 'Kredensial login salah.' },
        { status: 401 }
      );
    }

    await createSessionCookie(user.email, user.id);

    return NextResponse.json({
      success: true,
      user: { email: user.email },
    });
  } catch {
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server.' },
      { status: 500 }
    );
  }
}
