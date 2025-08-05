import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export async function logAction(action, email = "Unknown", details = "") {
  try {
    await addDoc(collection(db, "logs"), {
      action,
      email,
      details,
      timestamp: serverTimestamp()
    });
    console.log(`Logged: ${action}`);
  } catch (error) {
    console.error("Error logging action:", error);
  }
}
