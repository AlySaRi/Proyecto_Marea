import express from 'express';
import { v2 as cloudinary } from "cloudinary";
import upload from "../config/multer.js";
import { GoogleGenAI } from "@google/genai";
import exifr from "exifr";
import Post from '../models/Post.js';
import { Parser } from 'xml2js';

const router = express.Router();

// CLOUDINARY CONFIG
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Función EXIF para GPS de la imagen si existe
async function getExifLocation(buffer) {
  try {
    const data = await exifr.parse(buffer);
    if (!data) return null;

    const { latitude, longitude } = data;
    if (!latitude || !longitude) return null;

    const OPENMAPURL = "https://nominatim.openstreetmap.org/reverse";
    const params = new URLSearchParams({ lat: latitude, lon: longitude, format: "xml" });
    const response = await fetch(`${OPENMAPURL}?${params.toString()}`);
    if (!response.ok) return null;

    const xml = await response.text();
    const parser = new Parser({ explicitArray: false });
    const parsed = await parser.parseStringPromise(xml);

    const address = parsed?.reversegeocode?.addressparts ?? {};
    const road = address.road || "";
    const city = address.city || address.town || address.village || "";
    const country = address.country || "";

    return `${road}, ${city}, ${country}`.replace(/, ,/g, ",").trim();
  } catch (error) {
    console.error("Error extrayendo EXIF GPS:", error);
    return null;
  }
}

/* ------------------------------- ROUTAS ------------------------------- */

// Login
router.get("/login", (req, res) => {
  res.render("login", { pageTitle: "Login - Marea" });
});

// Sign Up
router.get("/signup", (req, res) => {
  res.render("signup", { pageTitle: "Sign Up - Marea" });
});

// Forgot Password
router.get("/forgot-password", (req, res) => {
  res.render("forgot-password", { pageTitle: "Forgot Password - Marea" });
});

// Gallery
router.get("/gallery", async (req, res) => {
  try {
    const posts = await Post.find().lean();
    res.render("posts/list", { pageTitle: "Posts - Marea", posts });
  } catch (err) {
    console.error("Error finding posts:", err);
    res.status(500).send("Error finding posts");
  }
});

// Nuevo post
router.get("/posts/new", (req, res) => {
  res.render("posts/new", { pageTitle: "Nuevo Post - Marea" });
});

// Detalle post
router.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).lean();
    if (!post) return res.status(404).render("404");
    res.render("posts/detail", { post });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading post");
  }
});

// Editar post
router.get("/posts/:id/edit", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).lean();
    if (!post) return res.status(404).render("404");
    res.render("posts/edit", { post });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading post");
  }
});

// Crear post
router.post("/posts", upload.single("image"), async (req, res) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const location = (await getExifLocation(req.file.buffer)) || "Unknown";
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    // AI Species
    const aiSpecie = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { inlineData: { mimeType: req.file.mimetype, data: b64 } },
        { text: "Give me only the scientific species name of the animal in the picture (max 15 chars, no *)" }
      ],
    });

    // AI Common Name
    const commonName = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Give me only the most common short name for "${aiSpecie.text}" (max 15 chars).`,
    });

    // AI Description
    const aiDescription = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Short description (max 450 chars) of "${aiSpecie.text}" without *.`,
    });

    // Cloudinary Upload
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "marea-projects",
      resource_type: "auto",
    });

    // Guardar en DB
    await Post.create({
      species: aiSpecie.text,
      commonName: commonName.text,
      location,
      description: aiDescription.text,
      imageUrl: result.secure_url,
      imagePublicId: result.public_id,
    });

    res.redirect("/gallery?success=true");
  } catch (err) {
    console.error("Error creando post:", err);
    res.status(500).send("Error al crear post");
  }
});

// Actualizar post
router.post("/posts/:id", upload.single("image"), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).render("404");

    post.species = req.body.species;
    post.commonName = req.body.commonName;
    post.location = req.body.location;
    post.description = req.body.description;

    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "marea-projects",
        resource_type: "auto",
      });
      post.imageUrl = result.secure_url;
      post.imagePublicId = result.public_id;
    }

    await post.save();
    res.redirect(`/posts/${req.params.id}`);
  } catch (err) {
    console.error("Error actualizando:", err);
    res.status(500).send("Error al actualizar post");
  }
});

// Eliminar post
router.post("/posts/:id/delete", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect("/gallery");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al eliminar post");
  }
});

export default router;
