// src/app.js
import 'dotenv/config';
import express from "express";
import { engine } from "express-handlebars";

// Rutas
import postRouter from "./routes/posts.routes.js";
import authRouter from "./routes/auth.routes.js";

// Conexión BD
import connectDB from "./config/db.js";

// ---------- CONFIGURAR APP ----------
const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a MongoDB UNA sola vez
connectDB();

// ---------- MIDDLEWARES ----------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
