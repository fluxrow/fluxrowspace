import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'fallback-secret';

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

export async function createSession(user: User) {
    const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '7d' }
    );
    return { token, user: { id: user.id, email: user.email, name: user.name } };
}

export async function getCurrentUser() {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get('auth-token')?.value;
        if (!token) return null;
        const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
        return await db.user.findUnique({ where: { id: payload.userId } });
    } catch {
        return null;
    }
}