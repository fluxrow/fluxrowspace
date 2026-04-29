import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { id: string } }) {
    try {
        return NextResponse.json({ status: "OK" });
    } catch (error) {
        console.error(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        return NextResponse.json({ status: "OK" });
    } catch (error) {
        console.error(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
