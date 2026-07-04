# Rural Link AI

A small Next.js app and starter for connecting rural communities with local work. The repository previously contained code fragments in the README; this commit splits those snippets into runnable project files.

Quick start

1. Copy .env.example to .env.local and fill in values:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - STRIPE_SECRET_KEY
   - OPENAI_API_KEY

2. Install dependencies:
   npm install

3. Run the development server:
   npm run dev

Notes and considerations

- Do NOT commit secrets. Use environment variables or GitHub Actions secrets.
- The DB migration uses gen_random_uuid() which requires the pgcrypto extension in Postgres. See db/migrations/001_init.sql for details.
- Stripe amounts are in the smallest currency unit (cents for USD). unit_amount: 500 means $5.00.
- Ensure Supabase Row-Level Security (RLS) is configured appropriately if you expose anon keys to the client.

Files created
- app/
- app/api/
- lib/
- db/migrations/
- .env.example

If anything doesn't work after npm install, tell me the error and I will help fix it.
