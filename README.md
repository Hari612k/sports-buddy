# Sports Buddy 🏏🏃‍♂️🏀

**Sports Buddy** is a lightweight web platform to help users create and join local sports events. It includes user-friendly modules for users and admin panels for efficient category and location management. Built using Firebase and deployed on Github Pages & Netlify.

---

## 🔧 Features

### 👤 User Modules

- Register and login using Firebase Authentication
- View and join default sports (Cricket, Football, Tennis, etc.)
- Create, update, and delete your own custom sport events
- Responsive design with logout and navigation bar
- Guide page available before and after login for help

### 🔐 Admin Modules

- Admin login with restricted access
- View registered users and the sports they joined
- Manage (add/delete):
  - Sports Categories
  - Cities
  - Areas
- Real-time search and filters
- Logging system for all major actions

---

## 🧠 System Architecture

- **Frontend:** HTML5, CSS3, JavaScript (Modular)
- **Backend:** Firebase Authentication + Firestore (NoSQL)
- **Hosting:** Netlify (Frontend), Firebase (Backend Services)

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
│   ├── navbar.js
│   └── logger.js
├── components/
│   └── navbar.html
├── assets/
│   ├── logo.png
│   ├── background.jpg
│   └── sports/ (icons for each sport)
├── index.html
├── login.html
├── register.html
├── user.html
├── admin.html
├── welcome.html
├── guide.html
├── README.md
└── report.docx
```

---

## 🗃️ Firestore Schema

### Collections:

- **joinedSports**:  
  `{ email, sport, timestamp }`

- **userEvents**:  
  `{ email, name, location, time, timestamp }`

- **sportsCategories**:  
  `{ name }`

- **cities**:  
  `{ name }`

- **areas**:  
  `{ name }`

- **logs**:  
  `{ actor, action, description, timestamp }`

---

## 📝 Logging

All major user and admin actions (login, join/delete sports, admin CRUD) are recorded in the `logs` collection in Firestore for tracking and debugging.

---

## 🚀 How to Run the Project Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/Hari612k/sports-buddy.git
   ```

2. Open the folder in **VS Code** or your preferred IDE.

3. Replace the Firebase config in `js/firebase.js` with your own project credentials.

4. Launch `index.html` in a browser to start.

---

## 🧪 Test Cases

| Module          | Action                | Expected Result              |
| --------------- | --------------------- | ---------------------------- |
| Registration    | New user submits form | Account created & redirected |
| Login           | Valid credentials     | Dashboard loaded             |
| Forgot Password | Email input & submit  | Reset email sent             |
| Add Event       | Fill and submit form  | Event shown in user list     |
| Edit Event      | Click edit & update   | Event updated in real-time   |
| Delete Event    | Click delete button   | Event removed from list      |
| Admin Login     | Enter admin details   | Admin panel loaded           |
| Admin Add City  | Submit city form      | City appears in list         |
| Logging         | Perform any action    | Entry added to `logs`        |

---

## 💡 Deployment Justification

- **Firebase** enables seamless real-time updates and user authentication without a heavy backend setup.
- **Netlify** used for easy and free hosting of static files.
- The app is modular and mobile-friendly.
- Project satisfies the complete functional requirements of the Sports Buddy system.

---

## 🌐 Live Demo

deployed to:

🔗 Github Pages : https://hari612k.github.io/sports-buddy

Netlify : https://sportsbuddyapp.netlify.app/

Project Console: https://console.firebase.google.com/project/sports-buddy-e569a/overview

Hosting URL: https://sports-buddy-e569a.web.app

https://sports-buddy-e569a.firebaseapp.com/

---

## 👤 Author

**Harikrishna Gangadi**  
🔗 [LinkedIn](https://www.linkedin.com/in/hari-krishna-358050303/)  
💻 [GitHub](https://github.com/Hari612k)
