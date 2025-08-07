import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { logAction } from "./logger.js";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorDisplay = document.getElementById("error");

const forgotLink = document.getElementById("forgotPasswordLink");
const resetContainer = document.getElementById("resetContainer");
const resetEmailInput = document.getElementById("resetEmail");
const resetBtn = document.getElementById("resetBtn");
const resetMsg = document.getElementById("resetMessage");

loginBtn?.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    errorDisplay.textContent = "Please enter both email and password.";
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await logAction("Login Success", email, "User successfully logged in");

    if (email === "sportsbuddy.aug5@gmail.com") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "user.html";
    }
  } catch (error) {
    let errorMessage = "Login failed. Please check your credentials.";
    if (error.code === "auth/user-not-found") {
      errorMessage = "User not found.";
    } else if (error.code === "auth/wrong-password") {
      errorMessage = "Incorrect password.";
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "Invalid email format.";
    }

    errorDisplay.textContent = errorMessage;
    await logAction("Login Failed", email, error.message);
  }
});

forgotLink?.addEventListener("click", (e) => {
  e.preventDefault();
  resetContainer.style.display = "block";
});

resetBtn?.addEventListener("click", async () => {
  const email = resetEmailInput.value.trim();

  if (!email) {
    resetMsg.style.color = "red";
    resetMsg.textContent = "Please enter your email.";
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email, {
      url: "https://hari612k.github.io/sports-buddy",
      handleCodeInApp: true,
    });

    resetMsg.style.color = "green";
    resetMsg.textContent = "Reset link sent to your email.";
    await logAction("Password Reset Sent", email, "Reset email sent.");
  } catch (error) {
    console.error("Reset error:", error.code);
    let msg = "Failed to send reset link.";
    if (error.code === "auth/user-not-found") {
      msg = "No account found with that email.";
    } else if (error.code === "auth/invalid-email") {
      msg = "Invalid email format.";
    }
    resetMsg.style.color = "red";
    resetMsg.textContent = msg;
    await logAction("Password Reset Failed", email, error.message);
  }
});
