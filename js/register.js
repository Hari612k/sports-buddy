import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { logAction } from "./logger.js";

const registerBtn = document.getElementById("registerBtn");
const regEmail = document.getElementById("regEmail");
const regPassword = document.getElementById("regPassword");
const registerError = document.getElementById("registerError");

registerBtn.addEventListener("click", async () => {
  const email = regEmail.value.trim();
  const password = regPassword.value;

  if (!email || !password) {
    registerError.textContent = "Please fill in all fields.";
    return;
  }

  if (email === "admin@sportsbuddy.com") {
    registerError.textContent = "You cannot register using the admin email.";
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Registration successful:", userCredential.user);

    await logAction("User Registered", email, "New user registered successfully");

    window.location.href = "welcome.html";
  } catch (error) {
    console.error("Registration error:", error.message);

    let errorMessage = "Registration failed. Please try again.";
    if (error.code === "auth/email-already-in-use") {
      errorMessage = "This email is already registered.";
    } else if (error.code === "auth/weak-password") {
      errorMessage = "Password should be at least 6 characters.";
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "Please enter a valid email.";
    }

    registerError.textContent = errorMessage;
    await logAction("Registration Failed", email, error.message);
  }
});
