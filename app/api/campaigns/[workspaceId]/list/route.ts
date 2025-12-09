```typescript
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { workspaceId: string } }
) {
  try {
    const { workspaceId } = params;

    const campaigns = await db.campaign.findMany({
      where: {
        workspaceId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        status: true,
        budget: true,
        createdAt: true,
      },
    });

    return NextResponse.json(campaigns);
  } catch (error) {
    console.error("ROUTE_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
```
