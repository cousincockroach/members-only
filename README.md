# 🔐 Members-Only Clubhouse

A full-stack, role-based web application where users can sign up, authenticate securely, post messages, and unlock exclusive member privileges. Built with Node.js, Express, and PostgreSQL, this application demonstrates robust session-based authentication, password hashing, and conditional view rendering based on user authorization levels.

[Live Link](https://members-only-vc76.onrender.com/)
---

## ✨ Features

* **Secure Authentication & Authorization:** Complete user registration and login workflow powered by Passport.js (`passport-local`) and `express-session`.
* **Cryptographic Password Security:** Passwords are salted and hashed securely using `bcrypt` before being stored in the database.
* **Role-Based Access Control (RBAC):**
  * **Anonymous Visitors:** Can view the public message feed, but authors and timestamps remain hidden.
  * **Authenticated Users:** Can create new posts and view their own submissions.
  * **Club Members:** Unlock secret membership status via a passcode, revealing the author and timestamp of every message on the board.
  * **Administrators:** Elevated privileges to moderate and delete any message from the feed.
* **Persistent Cloud Storage:** Powered by a relational PostgreSQL database hosted on Neon, utilizing connection pooling via `node-postgres` (`pg`).
* **Server-Side Rendering & Responsive UI:** Clean, card-based UI rendered dynamically with EJS templates and styled with modern Vanilla CSS.

---

## 🛠️ Tech Stack

* **Backend Runtime & Framework:** Node.js, Express.js
* **Database:** PostgreSQL (Cloud-hosted on Neon)
* **Authentication & Security:** Passport.js, `bcrypt`, `express-session`, `dotenv`
* **Templating & Frontend:** EJS (Embedded JavaScript), Vanilla CSS3 (Responsive card layouts)
* **Deployment:** Render (Web Service)

---
