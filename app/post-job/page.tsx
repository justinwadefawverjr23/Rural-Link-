"use client";

import { useState } from "react";

export default function PostJob() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function submit() {
    if (!title || !description) {
      setMessage("Please fill in all fields");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description })
      });

      if (!res.ok) throw new Error("Failed to post job");

      setTitle("");
      setDescription("");
      setMessage("Job posted successfully");
    } catch (err) {
      setMessage("Error posting job");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-10">
      <h1>Post a Job</h1>

      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

      <button onClick={submit} disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>

      {message && <p>{message}</p>}
    </main>
  );
}
