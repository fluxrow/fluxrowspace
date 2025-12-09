import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { designId } = await req.json();

        // Call Canva Connect API
        // POST /v1/designs/{designId}/exports

        // Mock response
        const mockExport = {
            job_id: "export_job_123",
            status: "in_progress",
        };

        return NextResponse.json(mockExport);
    } catch (error) {
        console.error("[CANVA_EXPORT_DESIGN]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
