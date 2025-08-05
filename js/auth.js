import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { logAction } from "./logger.js";

const loginBtn = document.getElementById("loginBtn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorDisplay = document.getElementById("error");

loginBtn.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    errorDisplay.textContent = "Please enter both email and password.";
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Login success:", userCredential.user);

    await logAction("Login Success", email, "User successfully logged in");

    if (email === "admin@sportsbuddy.com") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "user.html";
    }

  } catch (error) {
    console.error("Login error:", error.message);
    errorDisplay.textContent = "Invalid email or password.";
    await logAction("Login Failed", email, error.message);
  }
});
