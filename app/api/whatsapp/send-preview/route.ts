import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { logActivity } from "@/lib/activity";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { phone, message, briefIds, workspaceId } = body;

        if (!phone || !briefIds || !briefIds.length || !workspaceId) {
            return new NextResponse("Phone, Brief IDs, and Workspace ID required", { status: 400 });
        }

        const briefs = await db.contentBrief.findMany({
            where: { id: { in: briefIds } },
            include: {
                media_assets: true,
                ai_generated: true
            }
        });

        // Mock sending preview
        console.log(`[WHATSAPP_PREVIEW] Sending to ${phone}:`);
        console.log(`Message: ${message}`);
        briefs.forEach(brief => {
            console.log(`- Brief: ${brief.title}`);
            console.log(`  Caption: ${brief.ai_generated?.main_caption}`);
            console.log(`  Image: ${brief.media_assets[0]?.url}`);
        });

        await logActivity({
            workspaceId,
            action: "WHATSAPP_PREVIEW_SENT",
            targetType: "CONTENT_BRIEF",
            targetId: briefIds[0],
            metadata: { phone, count: briefIds.length }
        });

        return NextResponse.json({ success: true, message: "Preview sent to WhatsApp" });

    } catch (error) {
        console.error("[WHATSAPP_PREVIEW]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
