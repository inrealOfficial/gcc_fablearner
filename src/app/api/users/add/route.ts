import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/affiliateTracking";
import Stripe from "stripe";
import { addDoc, collection } from "firebase/firestore";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

export async function POST(req: NextRequest) {
  try {
    const { session_id } = await req.json();
    if (!session_id) {
      return NextResponse.json(
        { error: "Missing session_id" },
        { status: 400 }
      );
    }

    // Fetch session from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }
    console.log("Session:", session);

    // Extract user info
    const email =
      session.customer_email || session.customer_details?.email || "";
    const name = session.customer_details?.name || "";
    // Get phone from metadata instead of customer_details
    const phone =
      session.metadata?.phone || session.metadata?.customerPhone || "";
    const country = session.customer_details?.address?.country || "";
    const transactionDateTime = session.created
      ? new Date(session.created * 1000).toISOString()
      : new Date().toISOString();

    // Prepare user data
    const userData = {
      course: "FABREADER PREMIUM",
      email,
      name,
      phone,
      country,
      value: "gcc",
      saturdayLink: "",
      status: "success",
      sundayLink: "",
      transactionDateTime,
    };

    const response = await addDoc(collection(db, "users"), userData);
    console.log("Firestore addDoc response:", response.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error adding user to Firestore:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
