import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateJobHelp(prompt: string) {
  try {
    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You help rural users write clear job posts and estimate fair pricing." },
        { role: "user", content: prompt }
      ]
    });

    // Depending on SDK, adapt to the correct response shape
    return (res as any).choices?.[0]?.message?.content ?? String(res);
  } catch (err) {
    console.error("OpenAI error", err);
    throw err;
  }
}
