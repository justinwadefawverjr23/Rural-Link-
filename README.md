rural-link-ai/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── browse/page.tsx
│   ├── post-job/page.tsx
│   ├── job/[id]/page.tsx
│   ├── profile/[id]/page.tsx
│   ├── dashboard/page.tsx
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── messages/page.tsx
│   ├── api/
│   │   ├── jobs/route.ts
│   │   ├── auth/route.ts
│   │   ├── messages/route.ts
│   │   ├── reviews/route.ts
│   │   ├── stripe/route.ts
│   │   ├── ai/route.ts
│
├── components/
│   ├── Navbar.tsx
│   ├── JobCard.tsx
│   ├── MessageBox.tsx
│   ├── ReviewCard.tsx
│   ├── ProfileCard.tsx
│
├── lib/
│   ├── supabaseClient.ts
│   ├── stripe.ts
│   ├── ai.ts
│   ├── auth.ts
│
├── middleware.ts
├── package.json
├── .env.local