import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const presets = await db.contentPreset.findMany({
            where: { projectId: params.id },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(presets);
    } catch (error) {
        console.error("[PRESETS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
    try {
        const body = await req.json();
        const { name, description, aiCaptionPrompt, aiImagePrompt } = body;

        const preset = await db.contentPreset.create({
            data: {
                projectId: params.id,
                name,
                description,
                aiCaptionPrompt,
                aiImagePrompt,
            },
        });

        return NextResponse.json(preset);
    } catch (error) {
        console.error("[PRESETS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
