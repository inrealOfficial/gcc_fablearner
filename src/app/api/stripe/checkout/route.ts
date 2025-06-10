// app/api/stripe/checkout/route.ts
import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { url } from "inspector";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

export async function POST(req: NextRequest) {
  try {
    const {
      amount,
      productName,
      customerEmail,
      customerName,
      customerPhone,
      couponCode,
      metadata,
    } = await req.json();

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "aed", // or 'usd' based on your preference
            product_data: {
              name: productName,
              description: "FAB MASTERCLASS - Complete Course Access",
            },
            unit_amount: Math.round(amount * 100), // Convert to smallest currency unit (paise for INR)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: customerEmail,
      metadata: {
        ...metadata,
        customerPhone: customerPhone,
        couponCode: couponCode || "none",
      },
      success_url: `${req.nextUrl.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/payment/failure`,
      // Optional: Auto-fill customer details
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["AE", "SA", "KW", "QA", "BH", "OM"],
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

// Optional: Handle other HTTP methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
