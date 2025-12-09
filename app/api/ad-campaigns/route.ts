import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        // FUTURE: Prisma create logic here
        return NextResponse.json({ status: "OK" });
    } catch (error) {
        console.error(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        // FUTURE: Prisma list logic here (filter by workspaceId from query)
        return NextResponse.json({ status: "OK" });
    } catch (error) {
        console.error(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
