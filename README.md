# 🌊 Marea — AI Marine Journal

**Marea** is a full-stack web application that allows users to upload a marine photo and automatically identify the species using Google Gemini AI.  
Users can review, edit, and save entries into a personal marine journal.

> Portfolio / educational project (2025)

---

## ✨ Features

- 🔐 Authentication (Sign Up / Log In) with session persistence
- 🖼️ Image upload using Multer (memory storage)
- ☁️ Cloudinary image storage
- 🤖 AI species recognition with Google Gemini
- 📍 Optional location extraction via EXIF + reverse geocoding
- 🗂️ Full CRUD journal entries
- ✍️ Editable AI output (user maintains control)

---

## 🧱 Tech Stack

**Backend**
- Node.js
- Express 5
- Mongoose (MongoDB)

**Frontend**
- Handlebars (Server-Side Rendering)
- Static assets in `/public`

**Integrations**
- Google Gemini (`@google/genai`)
- Cloudinary
- OpenStreetMap (reverse geocoding)
- Resend (password reset emails)

**Auth & Sessions**
- express-session
- connect-mongo

---

## 🏗 Architecture

- Single entrypoint (`src/server.js`)
- Environment variables loaded at startup
- Centralized MongoDB connection
- Clean separation of concerns:
  - `server.js` → startup & DB connection
  - `app.js` → express configuration
  - `routes/` → routing logic
  - `models/` → database schemas

---

## 🚀 Getting Started (Local Setup)

### 1) Clone the repository

```bash
git clone https://github.com/AlySaRi/Proyecto_Marea.git
cd Proyecto_Marea
```

### 2) Install dependencies

Using npm:

```bash
npm install
```

### 3) Create a `.env` file

Create a file named `.env` in the project root:

```env
PORT=3000
SESSION_SECRET=YOUR_SESSION_SECRET

MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING

CLOUDINARY_CLOUD_NAME=YOUR_CLOUDINARY_NAME
CLOUDINARY_API_KEY=YOUR_CLOUDINARY_KEY
CLOUDINARY_API_SECRET=YOUR_CLOUDINARY_SECRET

GEMINI_API_KEY=YOUR_GEMINI_KEY
RESEND_API_KEY=YOUR_RESEND_KEY
```

⚠️ Never commit your `.env` file.

### 4) Run the app

Development mode (recommended):

```bash
npm run dev
```

Production mode:

```bash
npm start
```

Then open in your browser:

http://localhost:3000

---

## 🧭 User Flow

1. Sign up / Log in  
2. Upload a marine image  
3. AI analyzes the image  
4. Review generated species information  
5. Edit if needed  
6. Save the journal entry  
7. Browse saved entries in the gallery  

---

## 📁 Project Structure

```txt
src/
  server.js
  app.js
  config/
    db.js
    multer.js
  middleware/
    auth.js
  models/
    User.js
    Post.js
  routes/
    auth.routes.js
    posts.routes.js
  utils/
    sendEmail.js
  views/

public/
  css/
  js/
  images/
```

---

## 🔧 Known Improvements

- Add loading state during AI processing
- Improve accessibility (contrast & typography refinement)
- User profile page (UI designed, pending implementation)

---

## 📷 Screenshots


---

## 📄 License

Demo project.
