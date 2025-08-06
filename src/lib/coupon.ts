import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/lib/affiliateTracking";
// Coupon interface
export interface Coupon {
  code: string;
  discount: number;
  type: "fixed" | "percentage";
  minAmount: number;
  fabCourse: string;
}

// Function to validate coupon from Firestore
export const validateCouponFromFirestore = async (
  couponCode: string
): Promise<Coupon | null> => {
  try {
    const normalizedCode = couponCode.toUpperCase().trim();

    // Query the coupons collection
    const couponsRef = collection(db, "coupons");
    const q = query(couponsRef, where("code", "==", normalizedCode));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }
    const couponDoc = querySnapshot.docs[0];
    const couponData = couponDoc.data() as Coupon;
    return couponData;
  } catch (error) {
    console.error("Error validating coupon:", error);
    throw error;
  }
};

// Create a new coupon
export const createCoupon = async (
  couponData: Coupon
): Promise<{ id: string; coupon: Coupon }> => {
  try {
    const normalizedCode = couponData.code.toUpperCase().trim();

    // Check if coupon code already exists
    const existingCoupon = await validateCouponFromFirestore(normalizedCode);
    if (existingCoupon) {
      throw new Error(`Coupon with code '${normalizedCode}' already exists`);
    }

    // Validate input
    if (!normalizedCode || normalizedCode.length < 3) {
      throw new Error("Coupon code must be at least 3 characters long");
    }

    if (couponData.discount <= 0) {
      throw new Error("Discount must be greater than 0");
    }

    if (couponData.type === "percentage" && couponData.discount > 100) {
      throw new Error("Percentage discount cannot exceed 100%");
    }

    // Prepare coupon document
    const coupon: Coupon = {
      code: normalizedCode,
      discount: couponData.discount,
      type: couponData.type,
      minAmount: couponData.minAmount,
      fabCourse: couponData?.fabCourse,
    };

    // Add to Firestore
    const docRef = await addDoc(collection(db, "coupons"), coupon);

    console.log(
      `✅ Coupon '${normalizedCode}' created successfully with ID: ${docRef.id}`
    );

    return { id: docRef.id, coupon };
  } catch (error) {
    console.error("Error creating coupon:", error);
    throw error;
  }
};

// Update an existing coupon
export const updateCoupon = async (
  couponId: string,
  updateData: Partial<Coupon>
): Promise<{ id: string; coupon: Coupon }> => {
  try {
    // Validate coupon ID
    if (!couponId || couponId.trim() === "") {
      throw new Error("Coupon ID is required");
    }

    // Get reference to the coupon document
    const couponRef = doc(db, "coupons", couponId);

    // Check if coupon exists
    const couponSnap = await getDoc(couponRef);
    if (!couponSnap.exists()) {
      throw new Error(`Coupon with ID '${couponId}' not found`);
    }

    const existingCoupon = couponSnap.data() as Coupon;

    // Prepare update data with validation
    const updatedFields: Partial<Coupon> = {};

    // Handle code update
    if (updateData.code !== undefined) {
      const normalizedCode = updateData.code.toUpperCase().trim();

      if (!normalizedCode || normalizedCode.length < 3) {
        throw new Error("Coupon code must be at least 3 characters long");
      }

      // Check if new code already exists (but not for the current coupon)
      if (normalizedCode !== existingCoupon.code) {
        const existingCouponWithCode = await validateCouponFromFirestore(
          normalizedCode
        );
        if (existingCouponWithCode) {
          throw new Error(
            `Coupon with code '${normalizedCode}' already exists`
          );
        }
      }

      updatedFields.code = normalizedCode;
    }

    // Handle discount update
    if (updateData.discount !== undefined) {
      if (updateData.discount <= 0) {
        throw new Error("Discount must be greater than 0");
      }

      const couponType = updateData.type || existingCoupon.type;
      if (couponType === "percentage" && updateData.discount > 100) {
        throw new Error("Percentage discount cannot exceed 100%");
      }

      updatedFields.discount = updateData.discount;
    }

    // Handle type update
    if (updateData.type !== undefined) {
      const discount = updateData.discount || existingCoupon.discount;
      if (updateData.type === "percentage" && discount > 100) {
        throw new Error("Percentage discount cannot exceed 100%");
      }

      updatedFields.type = updateData.type;
    }

    // Update the document in Firestore
    await updateDoc(couponRef, updatedFields);

    // Get the updated coupon data
    const updatedCouponSnap = await getDoc(couponRef);
    const updatedCoupon = updatedCouponSnap.data() as Coupon;

    console.log(
      `✅ Coupon '${updatedCoupon.code}' updated successfully with ID: ${couponId}`
    );

    return { id: couponId, coupon: updatedCoupon };
  } catch (error) {
    console.error("Error updating coupon:", error);
    throw error;
  }
};
