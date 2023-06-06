import {NextRequest, NextResponse} from "next/server";
import {createLLMService} from "usellm";

export const config = {
    runtime: 'edge',
};

const llmService = createLLMService({
    openaiApiKey: process.env.OPENAI_API_KEY, // provide OpenAI API key
    actions: ["chat", /*"transcribe", */"embed"], // enable specific actions
    templates: {
        default: {
            id: "default-jesus",
            systemPrompt: "Jsi Ježíš. Odpovídáš lidem, radíš jim, povídáš si s němi. Musíš za každou" +
                " cenu zůstat v roli Ježíše. Piš krátké zprávy.",
            model: "gpt-3.5-turbo",
            max_tokens: 800,
        }
    }
});

export default async function handler(request: Request) {
    const body = await request.json();

    try {
        const { result } = await llmService.handle({ body, request });
        return new Response(result, { status: 200 });
    } catch (error: any) {
        return new Response(error.message, { status: error?.status || 400 });
    }
}