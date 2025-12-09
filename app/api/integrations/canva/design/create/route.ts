import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { title, width, height } = await req.json();

        // Call Canva Connect API
        // POST /v1/designs

        // Mock response
        const mockDesign = {
            id: "DAF_mock_design_id",
            title: title || "Untitled Design",
            url: "https://www.canva.com/design/DAF_mock_design_id/edit",
            thumbnail_url: "https://via.placeholder.com/300x400",
        };

        return NextResponse.json(mockDesign);
    } catch (error) {
        console.error("[CANVA_CREATE_DESIGN]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
