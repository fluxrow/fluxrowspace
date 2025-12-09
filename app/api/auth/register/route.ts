import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return new NextResponse("Missing fields", { status: 400 });
        }

        const existingUser = await db.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return new NextResponse("User already exists", { status: 409 });
        }

        const hashedPassword = await hashPassword(password);

        const user = await db.user.create({
            data: {
                name,
                email,
                password_hash: hashedPassword,
            },
        });

        return NextResponse.json({
            id: user.id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        console.error("[REGISTER_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
