import { auth, db } from "./firebase.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { logAction } from "./logger.js";

let currentUserEmail = "";

onAuthStateChanged(auth, async (user) => {
  if (!user) return window.location.href = "login.html";

  currentUserEmail = user.email;

  await logAction("Admin Login", user.email, "Accessed Admin Panel");

  loadJoinedSports();
  loadCollection("sports", "sportCategoryList");
  loadCollection("cities", "cityList");
  loadCollection("areas", "areaList");

  setupFormHandler("sportCategoryForm", "sportCategoryInput", "sports");
  setupFormHandler("cityForm", "cityInput", "cities");
  setupFormHandler("areaForm", "areaInput", "areas");
});

async function loadJoinedSports() {
  const userTableBody = document.getElementById("userTableBody");
  const noDataMessage = document.getElementById("noDataMessage");
  const searchInput = document.getElementById("searchInput");

  userTableBody.innerHTML = "";
  const snapshot = await getDocs(collection(db, "joinedSports"));

  if (snapshot.empty) {
    noDataMessage.style.display = "block";
    return;
  }

  const rows = [];

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${data.email || "Unknown"}</td>
      <td>${data.sport || "N/A"}</td>
      <td>${data.timestamp?.toDate().toLocaleString() || "N/A"}</td>
      <td><button class="remove-btn" data-id="${docSnap.id}">Remove</button></td>
    `;

    row.querySelector(".remove-btn").addEventListener("click", async () => {
      try {
        await deleteDoc(doc(db, "joinedSports", docSnap.id));
        row.remove();
        await logAction("Delete Entry", data.email, `Removed: ${data.sport}`);
        if (!userTableBody.children.length) noDataMessage.style.display = "block";
      } catch (err) {
        if (err.code === "permission-denied") {
          alert("You don't have permission to delete this item.");
        } else {
          alert("Failed to delete.");
        }
        console.error("Delete error:", err);
        await logAction("Delete Error", "Admin", err.message);
      }
    });

    userTableBody.appendChild(row);
    rows.push(row);
  });

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    rows.forEach((row) => {
      const email = row.children[0].textContent.toLowerCase();
      const sport = row.children[1].textContent.toLowerCase();
      const match = email.includes(searchTerm) || sport.includes(searchTerm);
      row.style.display = match ? "" : "none";
    });
  });
}

async function loadCollection(collectionName, listId) {
  const ul = document.getElementById(listId);
  ul.innerHTML = "";

  const snapshot = await getDocs(collection(db, collectionName));
  snapshot.forEach((docSnap) => {
    const li = document.createElement("li");
    li.textContent = docSnap.data().name;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Remove";
    deleteBtn.className = "delete-btn";

    deleteBtn.addEventListener("click", async () => {
      if (currentUserEmail !== "sportsbuddy.aug5@gmail.com") {
        alert("You don't have permission to delete this item.");
        return;
      }

      try {
        await deleteDoc(doc(db, collectionName, docSnap.id));
        await logAction("Delete", "Admin", `Deleted ${docSnap.data().name} from ${collectionName}`);
        loadCollection(collectionName, listId);
      } catch (err) {
        console.error("Delete error:", err);
      }
    });

    li.appendChild(deleteBtn);
    ul.appendChild(li);
  });
}

function setupFormHandler(formId, inputId, collectionName) {
  const form = document.getElementById(formId);
  const input = document.getElementById(inputId);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (currentUserEmail !== "sportsbuddy.aug5@gmail.com") {
      alert("You don't have permission to add items in this section.");
      return;
    }

    const value = input.value.trim();
    if (!value) return;

    try {
      await addDoc(collection(db, collectionName), { name: value });
      await logAction("Add", "Admin", `Added ${value} to ${collectionName}`);
      input.value = "";
      loadCollection(collectionName, formId.replace("Form", "List"));
    } catch (err) {
      console.error("Add error:", err);
    }
  });
}
