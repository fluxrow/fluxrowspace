import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        return NextResponse.json({ status: "OK" });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
