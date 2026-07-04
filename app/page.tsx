import Link from "next/link";

export default function Home() {
  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold">Rural Link AI</h1>
      <p className="mt-4">Connecting mountain communities in Lassen County with local work.</p>

      <div className="mt-6 flex gap-4">
        <Link href="/browse">Browse Jobs</Link>
        <Link href="/post-job">Post a Job</Link>
      </div>
    </main>
  );
}
