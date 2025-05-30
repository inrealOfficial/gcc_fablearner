import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Get the raw body text
    const rawBody = await request.text();
    console.log("PayU callback raw body:", rawBody);

    // Parse parameters from form data
    const formData = new URLSearchParams(rawBody);
    const status = formData.get("status") || "";
    const queryParams = new URLSearchParams();

    // Safely transfer all parameters
    for (const [key, value] of formData.entries()) {
      if (value !== null && value !== undefined) {
        queryParams.append(key, value);
      }
    }

    // Construct base URL for redirect
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    // Determine destination based on payment status
    let redirectUrl;
    if (status.toLowerCase() === "success") {
      redirectUrl = `${baseUrl}/payment/success?${queryParams.toString()}`;
    } else {
      redirectUrl = `${baseUrl}/payment/failure?${queryParams.toString()}`;
    }

    console.log("Redirecting to:", redirectUrl);

    // Create a Response with 303 status code to force a GET request
    return NextResponse.redirect(redirectUrl, { status: 303 });
  } catch (error) {
    console.error("Payment callback error:", error);

    // Fallback redirect if anything fails
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    return NextResponse.redirect(
      `${baseUrl}/payment/failure?error=processing_error&message=${encodeURIComponent(
        String(error)
      )}`,
      { status: 303 }
    );
  }
}

// Also handle direct GET requests
export async function GET(request: Request) {
  const url = new URL(request.url);
  const status = url.searchParams.get("status") || "";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  if (status.toLowerCase() === "success") {
    return NextResponse.redirect(`${baseUrl}/payment/success${url.search}`);
  } else {
    return NextResponse.redirect(`${baseUrl}/payment/failure${url.search}`);
  }
}
