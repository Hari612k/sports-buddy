import { auth, db } from "./firebase.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { logAction } from "./logger.js";

const welcomeUser = document.getElementById("welcomeUser");
const joinButtons = document.querySelectorAll(".join-btn");
const addEventForm = document.getElementById("addEventForm");
const eventNameInput = document.getElementById("eventName");
const eventLocationInput = document.getElementById("eventLocation");
const eventTimeInput = document.getElementById("eventTime");
const userEventsList = document.getElementById("userEventsList");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const email = user.email;
  if (welcomeUser) {
    welcomeUser.textContent = `👋 Welcome, ${email}`;
  }

  joinButtons.forEach((btn) => {
    const sport = btn.previousElementSibling.textContent;

    btn.addEventListener("click", async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "joinedSports"));

        const alreadyJoined = querySnapshot.docs.some(
          (doc) => doc.data().email === email && doc.data().sport === sport
        );

        if (alreadyJoined) {
          alert(`You've already joined: ${sport}`);
          await logAction("Join Attempt", email, `Already joined: ${sport}`);
          return;
        }

        await addDoc(collection(db, "joinedSports"), {
          email: email,
          sport: sport,
          timestamp: serverTimestamp(),
        });

        alert(`You have successfully joined: ${sport}`);
        await logAction("Join Sport", email, `Joined: ${sport}`);
      } catch (error) {
        console.error("Error joining sport:", error);
        alert("Failed to join sport. Try again.");
        await logAction("Join Error", email, error.message);
      }
    });
  });

  await loadUserEvents(email);

  addEventForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = eventNameInput.value.trim();
    const location = eventLocationInput.value.trim();
    const time = eventTimeInput.value;

    if (!name || !location || !time) {
      alert("Please fill all fields");
      return;
    }

    try {
      await addDoc(collection(db, "userSportsEvents"), {
        email,
        name,
        location,
        time,
        timestamp: serverTimestamp()
      });

      await logAction("Add Event", email, `${name} @ ${location} on ${time}`);
      addEventForm.reset();
      loadUserEvents(email);
    } catch (err) {
      console.error("Error adding event:", err);
      alert("Could not add event.");
    }
  });
});

async function loadUserEvents(email) {
  userEventsList.innerHTML = "";
  const snapshot = await getDocs(collection(db, "userSportsEvents"));

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    if (data.email !== email) return;

    const li = document.createElement("li");
    li.innerHTML = `
      <span><strong>${data.name}</strong> @ ${data.location} on ${data.time}</span><br>
      <div>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;

    const editBtn = li.querySelector(".edit-btn");
    const deleteBtn = li.querySelector(".delete-btn");

    editBtn.addEventListener("click", async () => {
      const newName = prompt("Update event name:", data.name);
      const newLocation = prompt("Update location:", data.location);
      const newTime = prompt("Update time:", data.time);

      if (newName && newLocation && newTime) {
        await updateDoc(doc(db, "userSportsEvents", docSnap.id), {
          name: newName,
          location: newLocation,
          time: newTime
        });

        await logAction("Edit Event", email, `Updated to ${newName}`);
        loadUserEvents(email);
      }
    });

    deleteBtn.addEventListener("click", async () => {
      if (confirm("Are you sure to delete this event?")) {
        await deleteDoc(doc(db, "userSportsEvents", docSnap.id));
        await logAction("Delete Event", email, `Deleted ${data.name}`);
        loadUserEvents(email);
      }
    });

    userEventsList.appendChild(li);
  });
}
