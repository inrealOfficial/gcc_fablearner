import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  updateDoc,
  increment,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

// Firebase configuration - make sure this is identical in both projects!
const firebaseConfig = {
  apiKey: "AIzaSyDX5eluS4LCSvNd9dDbLvxZV9Y27UlToJY",
  authDomain: "fablearner-3f909.firebaseapp.com",
  projectId: "fablearner-3f909",
  storageBucket: "fablearner-3f909.firebasestorage.app",
  messagingSenderId: "20290802686",
  appId: "1:20290802686:web:46d87a4332391a507726af",
  measurementId: "G-CK9RNZJ8K6",
};

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  // Firebase already initialized
  console.log("Firebase already initialized", error);
}

const db = getFirestore(app);

// Cookie/localStorage names
const AFFILIATE_ID_KEY = "fablearner_affiliate_id";
const CLICK_TRACKED_KEY = "fablearner_click_tracked";

// Session tracking key to prevent multiple counts
const SESSION_TRACKED_KEY = "fablearner_session_tracked";

// Check if tracking has already happened in this session
function hasTrackedThisSession(affiliateId: string): boolean {
  const trackedAffiliates = sessionStorage.getItem(SESSION_TRACKED_KEY);
  if (trackedAffiliates) {
    const parsed = JSON.parse(trackedAffiliates);
    return parsed.includes(affiliateId);
  }
  return false;
}

// Mark affiliate as tracked in this session
function markTrackedInSession(affiliateId: string): void {
  const trackedAffiliates = sessionStorage.getItem(SESSION_TRACKED_KEY);
  let parsed = trackedAffiliates ? JSON.parse(trackedAffiliates) : [];
  if (!parsed.includes(affiliateId)) {
    parsed.push(affiliateId);
    sessionStorage.setItem(SESSION_TRACKED_KEY, JSON.stringify(parsed));
  }
}

// Track affiliate link click - FIXED to query by affiliateId field
export const trackAffiliateClick = async (
  affiliateId: string
): Promise<boolean> => {
  try {
    console.log("Attempting to track click for affiliate:", affiliateId);

    // Check if this affiliate has already been tracked in this session
    if (hasTrackedThisSession(affiliateId)) {
      console.log("Affiliate already tracked in this session:", affiliateId);
      return false;
    }

    // CRITICAL FIX: Query by affiliateId field instead of document ID
    const affiliatesRef = collection(db, "affiliates");
    const affiliateQuery = query(
      affiliatesRef,
      where("affiliateId", "==", affiliateId)
    );
    const querySnapshot = await getDocs(affiliateQuery);

    if (querySnapshot.empty) {
      console.log("No affiliate found with affiliateId:", affiliateId);
      return false;
    }

    // Get the first matching document
    const affiliateDoc = querySnapshot.docs[0];
    console.log("Found affiliate document:", affiliateDoc.id);

    // Increment clicks
    await updateDoc(doc(db, "affiliates", affiliateDoc.id), {
      linkClicks: increment(1),
    });

    // Mark as tracked for this session
    markTrackedInSession(affiliateId);

    console.log("Click tracked successfully for affiliate:", affiliateId);
    return true;
  } catch (error) {
    console.error("Error tracking affiliate click:", error);
    return false;
  }
};

// Track affiliate conversion - FIXED to query by affiliateId field
export const trackAffiliateConversion = async (): Promise<boolean> => {
  try {
    // Get affiliate ID from localStorage or cookie
    const affiliateId =
      localStorage.getItem(AFFILIATE_ID_KEY) || getCookie(AFFILIATE_ID_KEY);

    if (!affiliateId) {
      console.log("No affiliate ID found for conversion tracking");
      return false;
    }

    console.log("Attempting to track conversion for affiliate:", affiliateId);

    // CRITICAL FIX: Query by affiliateId field instead of document ID
    const affiliatesRef = collection(db, "affiliates");
    const affiliateQuery = query(
      affiliatesRef,
      where("affiliateId", "==", affiliateId)
    );
    const querySnapshot = await getDocs(affiliateQuery);

    if (querySnapshot.empty) {
      console.log("No affiliate found with affiliateId:", affiliateId);
      return false;
    }

    // Get the first matching document
    const affiliateDoc = querySnapshot.docs[0];

    // Increment conversions
    await updateDoc(doc(db, "affiliates", affiliateDoc.id), {
      conversions: increment(1),
    });

    console.log("Conversion tracked successfully for affiliate:", affiliateId);

    // Clear affiliate ID to prevent double counting
    localStorage.removeItem(AFFILIATE_ID_KEY);
    deleteCookie(AFFILIATE_ID_KEY);

    return true;
  } catch (error) {
    console.error("Error tracking affiliate conversion:", error);
    return false;
  }
};

// Set affiliate ID in both localStorage and cookie for redundancy
export const setAffiliateId = (affiliateId: string): void => {
  localStorage.setItem(AFFILIATE_ID_KEY, affiliateId);
  setCookie(AFFILIATE_ID_KEY, affiliateId, 30); // 30 days
  console.log("Stored affiliate ID:", affiliateId);
};

// Get affiliate ID from URL query parameter
export const getAffiliateIdFromUrl = (url: string): string | null => {
  try {
    const urlObj = new URL(url);
    const ref = urlObj.searchParams.get("ref");
    console.log("Extracted affiliate ID from URL:", ref);
    return ref;
  } catch (error) {
    console.error("Error parsing URL:", error);
    return null;
  }
};

// Helper functions for cookie management
function setCookie(name: string, value: string, days: number): void {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name: string): string | null {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function deleteCookie(name: string): void {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
}
