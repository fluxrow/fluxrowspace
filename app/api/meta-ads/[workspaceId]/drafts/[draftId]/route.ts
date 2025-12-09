import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { workspaceId: string; draftId: string } }) {
    try {
        return NextResponse.json({ status: "OK" });
    } catch (error) {
        console.error(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { workspaceId: string; draftId: string } }) {
    try {
        return NextResponse.json({ status: "OK" });
    } catch (error) {
        console.error(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { workspaceId: string; draftId: string } }) {
    try {
        return NextResponse.json({ status: "OK" });
    } catch (error) {
        console.error(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
