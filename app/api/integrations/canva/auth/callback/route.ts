import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!code) {
        return new NextResponse("Missing code", { status: 400 });
    }

    // Exchange code for token
    // const tokenResponse = await fetch("https://www.canva.com/api/oauth/v1/token", { ... });

    // Mock token response
    const mockToken = {
        access_token: "mock_canva_access_token",
        refresh_token: "mock_canva_refresh_token",
        expires_in: 3600,
    };

    if (!state) {
        return new NextResponse("Missing state (workspaceId)", { status: 400 });
    }

    // Save to IntegrationCredential
    // In a real app, identify the workspace from state or session
    const workspaceId = state;

    await db.integrationCredential.create({
        data: {
            workspace_id: workspaceId,
            type: 'CANVA',
            data_encrypted: mockToken, // Encrypt this in production
        }
    });

    // Redirect user to /workspace/[workspaceId]/settings/integrations?canva=connected
    return NextResponse.redirect(new URL(`/workspaces/${workspaceId}/settings/integrations?canva=connected`, req.url));
}
