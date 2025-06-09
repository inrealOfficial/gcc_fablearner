import { NextResponse } from "next/server";

// Define coupon types with their values
const COUPONS = {
  // 100 Rs off coupons
  FAB100: { discount: 100, type: "fixed" },
  WELCOME100: { discount: 100, type: "fixed" },
  READ100: { discount: 100, type: "fixed" },

  // 200 Rs off coupons
  FAB200: { discount: 200, type: "fixed" },
  SPECIAL200: { discount: 200, type: "fixed" },
  PARENT200: { discount: 200, type: "fixed" },

  // 300 Rs off coupons
  FAB300: { discount: 300, type: "fixed" },
  LEARN300: { discount: 300, type: "fixed" },
  SUMMER300: { discount: 300, type: "fixed" },

  // 400 Rs off coupons
  FAB400: { discount: 400, type: "fixed" },
  SUPER400: { discount: 400, type: "fixed" },
  PREMIUM400: { discount: 400, type: "fixed" },

  // 500 Rs off coupons
  FAB500: { discount: 500, type: "fixed" },
  MAXSAVE: { discount: 500, type: "fixed" },
  VIP500: { discount: 500, type: "fixed" },
};

export async function POST(request: Request) {
  try {
    const { couponCode } = await request.json();
    const normalizedCode = couponCode.toUpperCase().trim();

    // Check if coupon exists
    if (COUPONS.hasOwnProperty(normalizedCode)) {
      const coupon = COUPONS[normalizedCode as keyof typeof COUPONS];

      return NextResponse.json({
        valid: true,
        coupon: {
          code: normalizedCode,
          ...coupon,
        },
      });
    }

    // Return invalid if not found
    return NextResponse.json({ valid: false, message: "Invalid coupon code" });
  } catch (error) {
    console.error("Error validating coupon:", error);
    return NextResponse.json(
      { valid: false, message: "Error processing coupon" },
      { status: 500 }
    );
  }
}
