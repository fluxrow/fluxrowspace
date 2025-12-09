import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import OpenAI from 'openai';

// Mock checkLimit for now if it doesn't exist
const checkLimit = async (workspaceId: string, limitType: string, currentUsage: number) => {
    return true; // Allow all for now
};

export async function POST(req: Request) {
    try {
        const { prompt, context, imageContext, workspaceId } = await req.json();

        if (!workspaceId) {
            return new NextResponse("Workspace ID required", { status: 400 });
        }

        // Check AI generation limits
        const currentUsage = await db.workspaceUsage.findFirst({
            where: {
                workspaceId,
                month: new Date().toISOString().slice(0, 7) // YYYY-MM
            }
        });

        const usageCount = currentUsage?.aiGenerations || 0;
        const canGenerate = await checkLimit(workspaceId, 'aiGenerationsPerMonth', usageCount);

        if (!canGenerate) {
            return new NextResponse("AI generation limit reached. Upgrade to Pro.", { status: 403 });
        }

        // Fetch API Key
        const credential = await db.integrationCredential.findFirst({
            where: { workspace_id: workspaceId, type: 'OPENAI' }
        });

        if (!credential || !credential.data_encrypted) {
            return new NextResponse("OpenAI API Key not found. Please connect in Settings.", { status: 400 });
        }

        // Cast to any to access apiKey property safely
        const apiKey = (credential.data_encrypted as any).apiKey;

        if (!apiKey) {
            return new NextResponse("Invalid OpenAI configuration.", { status: 400 });
        }

        const openai = new OpenAI({ apiKey });

        const systemPrompt = `You are an expert social media manager. 
        Generate a creative caption and a detailed image generation prompt based on the user's request.
        Return the result as a valid JSON object with exactly two keys:
        - "main_caption": The text for the social media post (include emojis).
        - "prompt_image": A detailed prompt to generate an image for this post (e.g. for DALL-E or Midjourney).
        `;

        const userPrompt = `Topic: ${prompt || "General Content"}
        Context: ${context || ""}
        Image Style: ${imageContext || ""}
        `;

        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            model: "gpt-3.5-turbo",
            response_format: { type: "json_object" },
        });

        const content = completion.choices[0].message.content;

        if (!content) {
            throw new Error("No content generated");
        }

        const responseData = JSON.parse(content);

        // Increment usage
        const month = new Date().toISOString().slice(0, 7);
        await db.workspaceUsage.upsert({
            where: {
                workspaceId_month: {
                    workspaceId,
                    month
                }
            },
            update: {
                aiGenerations: { increment: 1 }
            },
            create: {
                workspaceId,
                month,
                aiGenerations: 1
            }
        });

        return NextResponse.json(responseData);

    } catch (error) {
        console.error("[OPENAI_GENERATE]", error);
        return new NextResponse("Internal Error: " + (error as Error).message, { status: 500 });
    }
}
