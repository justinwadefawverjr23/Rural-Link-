import { generateJobHelp } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    if (!prompt) return new Response(JSON.stringify({ error: "No prompt provided" }), { status: 400 });

    const result = await generateJobHelp(prompt);
    return new Response(JSON.stringify({ result }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "AI request failed" }), { status: 500 });
  }
}
