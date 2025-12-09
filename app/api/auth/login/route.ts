import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyPassword, createSession } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return new NextResponse("Missing fields", { status: 400 });
        }

        const user = await db.user.findUnique({
            where: { email },
        });

        if (!user) {
            return new NextResponse("Invalid credentials", { status: 401 });
        }

        const isValid = await verifyPassword(password, user.password_hash);

        if (!isValid) {
            return new NextResponse("Invalid credentials", { status: 401 });
        }

        const session = await createSession(user);

        // In a real app, set a cookie here
        return NextResponse.json(session);
    } catch (error) {
        console.error("[LOGIN_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
