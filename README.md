# 🌊 Marea — AI Marine Journal

**Marea** is a full-stack web app that lets users upload a marine photo and automatically identifies the animal using Google Gemini.  
The app generates structured information (species, common name, description), allows manual editing, and saves entries in a personal journal.

> Portfolio / educational project (2025)

---

## ✨ Features

- Authentication (Sign Up / Log In) with session persistence
- Image upload (JPG/PNG) using Multer (memory storage)
- Cloudinary image storage
- AI recognition with Google Gemini
- Optional location extraction from image EXIF (GPS) + reverse geocoding
- Journal entries with CRUD (create, read, update, delete)
- Editable AI output (user keeps final control)

---

## 🧱 Tech Stack

Backend:
- Node.js
- Express
- Mongoose (MongoDB)

Frontend:
- Handlebars (SSR)
- Static assets in /public

Integrations:
- Google Gemini (@google/genai)
- Cloudinary
- OpenStreetMap (reverse geocoding)

Auth / Sessions:
- express-session
- connect-mongo

---

## 🚀 Getting Started (Local Setup)

### 1) Clone the repository

```bash
git clone https://github.com/AlySaRi/Proyecto_Marea.git
cd Proyecto_Marea
```

### 2) Install dependencies

```bash
npm install
```

### 3) Create a `.env` file

Create a file named `.env` in the project root and add:

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

```bash
npm start
```

Open in browser:

http://localhost:3000

---

## 🧭 User Flow

1. Sign up / Log in  
2. Upload a marine image  
3. AI analyzes the image  
4. Review generated result  
5. Edit if needed  
6. Save entry  
7. Browse saved entries  

---

## 🗺️ High-Level Architecture

- Express SSR renders Handlebars views from /src/views
- Sessions stored in MongoDB via connect-mongo
- Upload pipeline:
  1) Multer receives image (memory buffer)
  2) EXIF GPS extracted (optional)
  3) Gemini generates species + description
  4) Cloudinary stores image
  5) MongoDB saves journal entry

---

## 📁 Project Structure

```txt
src/
  app.js
  server.js
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
- Improve accessibility (contrast & typography consistency)
- User profile page (UI designed, pending implementation)

---

## 📷 Screenshots

Add screenshots here (Login, Gallery, Upload, AI Result, Edit screen).

---

## 📄 License

Educational / portfolio project.
