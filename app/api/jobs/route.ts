import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  try {
    const { data, error } = await supabase.from("jobs").select("*");
    if (error) throw error;
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch jobs" }), { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body?.title || !body?.description) {
      return new Response(JSON.stringify({ error: "Invalid input" }), { status: 400 });
    }

    const { data, error } = await supabase.from("jobs").insert({
      title: body.title,
      description: body.description
    });

    if (error) throw error;

    return new Response(JSON.stringify(data), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to create job" }), { status: 500 });
  }
}
