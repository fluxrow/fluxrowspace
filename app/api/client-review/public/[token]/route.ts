import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { mapBriefDetail } from "@/lib/client-review-mappers";

export async function GET(
    req: Request,
    { params }: { params: { token: string } }
) {
    try {
        const token = params.token;

        if (!token) {
            return new NextResponse("Token required", { status: 400 });
        }

        // Buscar brief pelo approvalToken
        const brief = await db.contentBrief.findFirst({
            where: { approvalToken: token },
            include: {
                media_assets: true,
                ai_generated: true,
                project: {
                    select: {
                        id: true,
                        name: true,
                        logoUrl: true,
                    }
                }
            }
        });

        if (!brief) {
            return new NextResponse("Invalid token", { status: 404 });
        }

        // Usar mapper para enviar dados limpos
        const mapped = mapBriefDetail(brief);

        return NextResponse.json({
            brief: mapped,
            project: brief.project
        });
    } catch (err) {
        console.error("PUBLIC_REVIEW_TOKEN_ERROR", err);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
