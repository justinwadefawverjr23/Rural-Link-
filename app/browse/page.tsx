import { supabase } from "@/lib/supabaseClient";

export default async function Browse() {
  const { data, error } = await supabase.from("jobs").select("*");

  if (error) {
    return (
      <main className="p-10">
        <h1 className="text-2xl font-bold">Available Jobs</h1>
        <p className="text-red-600">Error loading jobs</p>
      </main>
    );
  }

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">Available Jobs</h1>

      <div className="grid gap-4 mt-6">
        {data?.length ? (
          data.map((job: any) => (
            <div key={job.id} className="border p-4 rounded">
              <h2 className="font-bold">{job.title}</h2>
              <p>{job.description}</p>
              <p>{job.location}</p>
            </div>
          ))
        ) : (
          <p>No jobs available</p>
        )}
      </div>
    </main>
  );
}
