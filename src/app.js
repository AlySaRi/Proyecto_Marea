// src/app.js
import 'dotenv/config';
import express from "express";
import { engine } from "express-handlebars";


// Rutas
import postRouter from "./routes/posts.routes.js";
import authRouter from "./routes/auth.routes.js";

// Conexión BD
import connectDB from "./config/db.js";

// Middlware de Sesión
import session from "express-session";
import MongoStore from "connect-mongo";

// ---------- CONFIGURAR APP ----------
const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a MongoDB UNA sola vez
connectDB();

// ---------- MIDDLEWARES ----------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuración del middleware de sesión
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl:
        process.env.MONGODB_URI || "mongodb://localhost:27017/marea_sessions",
      collectionName: "sessions",
    }), // esto genera una colección 'sessions' en la base de datos para almacenar las sesiones de los usuarios
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 día de duración, esto se puede ajustar según sea necesario
      httpOnly: true,
      secure: false, // Lo dejamos en false durante el desarrollo. Si hacemos deploy en producción, cambiar a true para usar HTTPS
    },
  })
);

// Servir archivos estáticos (CSS, JS, imágenes)
app.use(express.static("./public"));

// ---------- HANDLEBARS ----------
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

// vistas dentro de src/views
app.set("views", "./src/views");

// ---------- RUTAS ----------
app.get("/", (req, res) => {
  res.render("home", { pageTitle: "Marea" });
});

// Rutas principales
app.use("/", postRouter);
app.use("/", authRouter);

// ---------- 404 ----------
app.use((req, res) => {
  res.status(404).render("404");
});

// ---------- EXPORTAR APP ----------
export default app;
