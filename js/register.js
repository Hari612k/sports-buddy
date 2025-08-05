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

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Registration successful:", userCredential.user);

    await logAction("User Registered", email, "New user registered successfully");

    window.location.href = "user.html";
  } catch (error) {
    console.error("Registration error:", error.message);
    registerError.textContent = error.message;

    await logAction("Registration Failed", email, error.message);
  }
});
