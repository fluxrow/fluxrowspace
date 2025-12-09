import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const templates = await db.brandTemplate.findMany({
            where: { projectId: params.id },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(templates);
    } catch (error) {
        console.error("[TEMPLATES_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
    try {
        const body = await req.json();
        const { name, templateType, canvaTemplateId } = body;

        // 1. Mock Canva Design Creation
        // In a real app, we would call Canva API here to create a design from the templateId or blank
        // const canvaDesign = await canva.createDesign(...)
        const mockCanvaId = canvaTemplateId || `canva-design-${Date.now()}`;
        const mockPreviewUrl = "https://via.placeholder.com/300x400?text=Template+Preview";

        // 2. Save to DB
        const template = await db.brandTemplate.create({
            data: {
                projectId: params.id,
                name,
                templateType,
                canvaTemplateId: mockCanvaId,
                previewUrl: mockPreviewUrl,
            },
        });

        return NextResponse.json(template);
    } catch (error) {
        console.error("[TEMPLATES_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
