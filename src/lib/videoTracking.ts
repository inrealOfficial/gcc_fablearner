import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "./firebase";

export interface LandingVideoInfo {
  name?: string;
  phone?: string;
  landedAt: any;
  clickedPlay: boolean;
  playClickedAt?: any;
  watchDuration?: number;
  videoStartTime?: any;
  videoEndTime?: any;
  userAgent?: string;
  referrer?: string;
  ip?: string;
  sessionId: string;
  fingerprint?: string;
  visitCount?: number;
  lastVisitAt?: any;
  lastActivityAt?: any; // Track last activity
  isgcc?: any;
}

// Generate a more reliable browser fingerprint
const generateFingerprint = (): string => {
  if (typeof window === "undefined") return "";

  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillText("fingerprint", 10, 10);
    }
    const canvasFingerprint = canvas.toDataURL();

    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      screen.width + "x" + screen.height,
      new Date().getTimezoneOffset(),
      navigator.cookieEnabled,
      navigator.doNotTrack || "unknown",
      canvasFingerprint.slice(-50),
    ].join("|");

    return btoa(fingerprint).slice(0, 32);
  } catch (error) {
    // Fallback fingerprint
    return btoa(navigator.userAgent + screen.width + screen.height).slice(
      0,
      32
    );
  }
};

// Check for existing record with better time-based logic
const findExistingRecord = async (params: {
  phone?: string;
  fingerprint?: string;
}) => {
  try {
    // First priority: check by phone number within last 24 hours
    if (params.phone) {
      const oneDayAgo = new Date();
      oneDayAgo.setHours(oneDayAgo.getHours() - 24);

      const phoneQuery = query(
        collection(db, "landing-video-info"),
        where("phone", "==", params.phone),
        where("lastVisitAt", ">=", oneDayAgo),
        orderBy("lastVisitAt", "desc"),
        limit(1)
      );

      const phoneSnapshot = await getDocs(phoneQuery);
      if (!phoneSnapshot.empty) {
        const doc = phoneSnapshot.docs[0];
        const data = doc.data();

        // Only return if it's within the last 6 hours (more restrictive)
        const sixHoursAgo = new Date();
        sixHoursAgo.setHours(sixHoursAgo.getHours() - 6);

        if (data.lastVisitAt?.toDate() > sixHoursAgo) {
          return doc;
        }
      }
    }

    // Second priority: check by browser fingerprint within last 2 hours
    if (params.fingerprint) {
      const twoHoursAgo = new Date();
      twoHoursAgo.setHours(twoHoursAgo.getHours() - 2);

      const fingerprintQuery = query(
        collection(db, "landing-video-info"),
        where("fingerprint", "==", params.fingerprint),
        where("lastVisitAt", ">=", twoHoursAgo),
        orderBy("lastVisitAt", "desc"),
        limit(1)
      );

      const fingerprintSnapshot = await getDocs(fingerprintQuery);
      if (!fingerprintSnapshot.empty) {
        return fingerprintSnapshot.docs[0];
      }
    }

    return null;
  } catch (error) {
    console.error("Error finding existing record:", error);
    return null;
  }
};

// Create initial tracking record when user lands (or update existing)
export const createLandingRecord = async (urlParams: {
  name?: string;
  phone?: string;
}) => {
  try {
    const fingerprint = generateFingerprint();
    const sessionId = `session_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    // Check for existing record
    const existingDoc = await findExistingRecord({
      phone: urlParams.phone,
      fingerprint,
    });

    if (existingDoc) {
      // Update existing record
      const existingData = existingDoc.data() as LandingVideoInfo;
      const docRef = doc(db, "landing-video-info", existingDoc.id);

      // Only update if last visit was more than 30 minutes ago
      const thirtyMinutesAgo = new Date();
      thirtyMinutesAgo.setMinutes(thirtyMinutesAgo.getMinutes() - 30);

      const shouldUpdate =
        !existingData.lastVisitAt ||
        existingData.lastVisitAt.toDate() < thirtyMinutesAgo;

      if (shouldUpdate) {
        await updateDoc(docRef, {
          ...(urlParams.name && { name: urlParams.name }),
          ...(urlParams.phone && { phone: urlParams.phone }),
          lastVisitAt: serverTimestamp(),
          lastActivityAt: serverTimestamp(),
          visitCount: (existingData.visitCount || 1) + 1,
          // Reset video tracking for new session
          clickedPlay: false,
          playClickedAt: null,
          watchDuration: 0,
          videoStartTime: null,
          videoEndTime: null,
          sessionId, // New session ID
        });
      }

      return {
        docId: existingDoc.id,
        sessionId: existingData.sessionId, // Keep original session ID
        isReturningUser: true,
      };
    } else {
      // Create new record
      const trackingData: Partial<LandingVideoInfo> = {
        name: urlParams.name || null,
        phone: urlParams.phone || null,
        landedAt: serverTimestamp(),
        lastVisitAt: serverTimestamp(),
        lastActivityAt: serverTimestamp(),
        clickedPlay: false,
        userAgent: typeof window !== "undefined" ? navigator.userAgent : "",
        referrer: typeof window !== "undefined" ? document.referrer : "",
        fingerprint,
        sessionId,
        visitCount: 1,
        watchDuration: 0,
        isgcc: true,
      };

      const docRef = await addDoc(
        collection(db, "landing-video-info"),
        trackingData
      );

      return {
        docId: docRef.id,
        sessionId,
        isReturningUser: false,
      };
    }
  } catch (error) {
    console.error("Error creating/updating landing record:", error);
    return null;
  }
};

// Update when play button is clicked
export const trackPlayClick = async (docId: string) => {
  try {
    const docRef = doc(db, "landing-video-info", docId);
    await updateDoc(docRef, {
      clickedPlay: true,
      playClickedAt: serverTimestamp(),
      videoStartTime: serverTimestamp(),
      lastActivityAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error tracking play click:", error);
  }
};

// Update watch duration
export const updateWatchDuration = async (docId: string, duration: number) => {
  try {
    const docRef = doc(db, "landing-video-info", docId);
    await updateDoc(docRef, {
      watchDuration: duration,
      videoEndTime: serverTimestamp(),
      lastActivityAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating watch duration:", error);
  }
};
