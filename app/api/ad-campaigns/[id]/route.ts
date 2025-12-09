import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        // FUTURE: Prisma findUnique logic here
        return NextResponse.json({ status: "OK" });
    } catch (error) {
        console.error(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        // FUTURE: Prisma update logic here
        return NextResponse.json({ status: "OK" });
    } catch (error) {
        console.error(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        // FUTURE: Prisma delete logic here
        return NextResponse.json({ status: "OK" });
    } catch (error) {
        console.error(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
