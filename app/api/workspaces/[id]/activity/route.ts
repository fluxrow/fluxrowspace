import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const logs = await db.activityLog.findMany({
            where: { id: params.id },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 50 // Limit to last 50 for now
        });

        return NextResponse.json(logs);
    } catch (error) {
        console.error("[ACTIVITY_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
