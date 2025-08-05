# Sports Buddy 🏏🏃‍♂️🏀

**Sports Buddy** is a web-based platform that helps users connect over local sports events. It allows users to register, log in, join existing sports, or create and manage their own events. Admins can manage sports categories, cities, and areas to keep the platform organized.

---

## 🔧 Features

### 👤 User Modules

- Register and login with Firebase Authentication
- View and join available sports (like Cricket, Football, etc.)
- Add custom sports events (name, location, time)
- Edit or delete your own created sports events
- Responsive dashboard with logout option

### 🔐 Admin Modules

- Secure login
- View all registered users and joined sports
- Add / update / delete:
  - Sports Categories
  - Cities
  - Areas
- Real-time search and filter
- Action logging for all major admin tasks

---

## 🧠 System Architecture

- **Frontend:** HTML5, CSS3, JavaScript (modular)
- **Backend:** Firebase Authentication, Firestore (NoSQL DB)
- **Hosting:** Static files (locally hosted), Firebase cloud services

---

## 📁 Folder Structure

```
/
├── css/
│   └── styles.css
├── js/
│   ├── firebase.js
│   ├── auth.js
│   ├── register.js
│   ├── admin-functions.js
│   ├── user-functions.js
│   └── logger.js
├── assets/
│   └── (logo + background + sport icons)
├── index.html
├── login.html
├── register.html
├── user.html
├── admin.html
├── README.md
└── report.docx
```

---

## 🗃️ Firestore Schema

### Collections:

- **joinedSports:** `{ email, sport, timestamp }`
- **userEvents:** `{ email, name, location, time, timestamp }`
- **sportsCategories:** `{ name }`
- **cities:** `{ name }`
- **areas:** `{ name }`
- **logs:** `{ actor, action, description, timestamp }`

---

## 📝 Logging

All major actions (e.g. login, event creation, deletion, admin CRUD tasks) are logged in the **logs** Firestore collection for tracking and debugging.

---

## 🚀 How to Run the Project Locally

1. Clone the repository:

   ```
   git clone https://github.com/Hari612k/sports-buddy.git
   ```

2. Open in VS Code or any IDE.

3. Replace Firebase config in `js/firebase.js` with your own Firebase project credentials.

4. Open `index.html` in your browser to get started.

---

## 🧪 Test Cases

| Module            | Action               | Expected Result              |
| ----------------- | -------------------- | ---------------------------- |
| User Registration | New user fills form  | Account created & redirected |
| Login             | Valid credentials    | Dashboard loaded             |
| Add Event         | Fill and submit form | Event shown in list          |
| Edit Event        | Click edit → update  | Event data updated           |
| Delete Event      | Click delete         | Event removed                |
| Admin Login       | Correct login        | Admin dashboard shown        |
| Admin Add City    | Submit new city      | City added to list           |
| Logging           | Any action           | Log created in Firestore     |

---

## 💡 Deployment Justification

- **Firebase** was chosen for its real-time database and authentication features, simplifying backend work for a lightweight web app.
- The app can be hosted locally or on Firebase Hosting if needed.
- All assets are frontend-based, with Firebase as backend, making deployment platform-independent.

---

## 👤 Author

**Harikrishna Gangadi**  
📧 gangadiharikrishna314@gmail.com  
🔗 [LinkedIn](https://www.linkedin.com/in/hari-krishna-358050303/)  
💻 [GitHub](https://github.com/Hari612k)
