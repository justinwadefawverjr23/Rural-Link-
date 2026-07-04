import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Boost Job Listing" },
            unit_amount: 500
          },
          quantity: 1
        }
      ],
      success_url: "http://localhost:3000/browse",
      cancel_url: "http://localhost:3000/browse"
    });

    return new Response(JSON.stringify({ url: session.url }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to create checkout session" }), { status: 500 });
  }
}
