import { NextResponse } from 'next/server';

const CANVA_AUTH_URL = "https://www.canva.com/api/oauth/v1/authorize";
const CLIENT_ID = process.env.CANVA_CLIENT_ID || "mock_client_id";
const REDIRECT_URI = process.env.CANVA_REDIRECT_URI || "http://localhost:3000/api/integrations/canva/auth/callback";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get('workspaceId');

    if (!workspaceId) {
        return new NextResponse("Workspace ID required", { status: 400 });
    }

    // Generate PKCE verifier and challenge in a real app
    // For now, we just redirect to Canva

    const params = new URLSearchParams({
        response_type: "code",
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        scope: "design:content:read design:content:write design:meta:read",
        code_challenge: "mock_challenge", // Implement PKCE
        code_challenge_method: "S256",
        state: workspaceId, // Pass workspaceId as state
    });

    return NextResponse.redirect(`${CANVA_AUTH_URL}?${params.toString()}`);
}
