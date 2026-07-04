{
  "name": "rural-link-ai",
  "version": "1.0.0",
  "dependencies": {
    "next": "14.2.0",
    "react": "18.3.0",
    "react-dom": "18.3.0",
    "@supabase/supabase-js": "^2.45.0",
    "stripe": "^16.0.0",
    "openai": "^4.0.0"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
import { supabase } from "./supabaseClient";

export async function signUp(email: string, password: string) {
  return await supabase.auth.signUp({ email, password });
}

export async function signIn(email: string, password: string) {
  return await supabase.auth.signInWithPassword({ email, password });
}

export async function signOut() {
  return await supabase.auth.signOut();
}
// lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
// lib/stripe.ts
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});
// lib/ai.ts
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function generateJobHelp(prompt: string) {
  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You help rural users write clear job posts and estimate fair pricing."
      },
      { role: "user", content: prompt }
    ]
  });

  return res.choices[0].message.content;
}
create table users (
  id uuid primary key default gen_random_uuid(),
  email text,
  role text default 'worker',
  created_at timestamp default now()
);

create table jobs (
  id uuid primary key default gen_random_uuid(),
  title text,
  description text,
  location text,
  pay_type text,
  price numeric,
  boosted boolean default false,
  featured_until timestamp,
  user_id uuid references users(id),
  created_at timestamp default now()
);

create table applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references jobs(id),
  user_id uuid references users(id),
  message text,
  created_at timestamp default now()
);

create table payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  type text,
  amount numeric,
  stripe_session_id text,
  status text default 'pending',
  created_at timestamp default now()
);
// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold">Rural Link AI</h1>
      <p className="mt-4">
        Connecting mountain communities in Lassen County with local work.
      </p>

      <div className="mt-6 flex gap-4">
        <Link href="/browse">Browse Jobs</Link>
        <Link href="/post-job">Post a Job</Link>
      </div>
    </main>
  );
}
// app/browse/page.tsx
import { supabase } from "@/lib/supabaseClient";

export default async function Browse() {
  const { data } = await supabase.from("jobs").select("*");

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">Available Jobs</h1>

      <div className="grid gap-4 mt-6">
        {data?.map((job) => (
          <div key={job.id} className="border p-4 rounded">
            <h2 className="font-bold">{job.title}</h2>
            <p>{job.description}</p>
            <p>{job.location}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
// app/post-job/page.tsx
"use client";

import { useState } from "react";

export default function PostJob() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function submit() {
    await fetch("/api/jobs", {
      method: "POST",
      body: JSON.stringify({ title, description })
    });
  }

  return (
    <main className="p-10">
      <h1>Post a Job</h1>

      <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)} />

      <button onClick={submit}>Submit</button>
    </main>
  );
}
// app/api/jobs/route.ts
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  const { data } = await supabase.from("jobs").select("*");
  return Response.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  const { data } = await supabase.from("jobs").insert({
    title: body.title,
    description: body.description
  });

  return Response.json(data);
}
// app/api/stripe/route.ts
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Boost Job Listing"
          },
          unit_amount: 500
        },
        quantity: 1
      }
    ],
    success_url: "http://localhost:3000/browse",
    cancel_url: "http://localhost:3000/browse"
  });

  return Response.json({ url: session.url });
}
// app/api/ai/route.ts
import { generateJobHelp } from "@/lib/ai";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = await generateJobHelp(prompt);

  return Response.json({ result });
}
// app/api/ai/route.ts
import { generateJobHelp } from "@/lib/ai";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = await generateJobHelp(prompt);

  return Response.json({ result });
}
