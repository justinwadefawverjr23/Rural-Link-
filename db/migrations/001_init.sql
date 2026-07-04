-- db/migrations/001_init.sql
-- Initial schema for Rural Link

-- If you use gen_random_uuid(), ensure pgcrypto is enabled (Supabase default) —
-- alternatively use uuid_generate_v4() with the uuid-ossp extension.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text,
  role text DEFAULT 'worker',
  created_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  description text,
  location text,
  pay_type text,
  price numeric,
  boosted boolean DEFAULT false,
  featured_until timestamp,
  user_id uuid REFERENCES users(id),
  created_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES jobs(id),
  user_id uuid REFERENCES users(id),
  message text,
  created_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  type text,
  amount numeric,
  stripe_session_id text,
  status text DEFAULT 'pending',
  created_at timestamp DEFAULT now()
);
