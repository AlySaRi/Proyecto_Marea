import express from 'express';
import connnectToDB from '../db/connection.js';
import { v2 as cloudinary } from "cloudinary";
import upload from "../config/multer.js";
import { GoogleGenAI } from "@google/genai";
import exifr from "exifr";
import Post from '../models/post.model.js';

const router = express.Router();

//Conectar a la base de datos
connnectToDB();

//Funcion EXIF para GPS de la imagen si existe
async function getExifLocation(buffer) {
  try {
    const data = await exifr.parse(buffer);

    if (!data) return null;

    // Usar latitude/longitude calculados por exifr
    const { latitude, longitude } = data;

    if (latitude && longitude) {
      return `${latitude}, ${longitude}`;
    }

    return null;
  } catch (error) {
    console.error("Error extrayendo EXIF GPS:", error);
    return null;
  }
}

/* CLOUDINARY CONFIG */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

//RUTAS

// --- RUTAS DE AUTENTICACIÓN ---
// Ruta Login
router.get("/login", (req, res) => {
  res.render("login", {
    pageTitle: "Login - Marea"
  });
});

// Ruta Sign Up
router.get("/signup", (req, res) => {
  res.render("signup", {
    pageTitle: "Sign Up - Marea"
  });
});

//Ruta Forgot-password
router.get("/forgot-password", (req, res) => {
  res.render("forgot-password", { 
    pageTitle: "Forgot Password - Marea"
  });
});


// --- RUTAS DE POSTS ---
//Ruta lista (Gallery)
router.get("/gallery", async (req, res) => {
  try {
    const posts = await Post.find().lean();

    res.render("posts/list", {
      pageTitle: "Posts - Marea",
      posts
    });

  } catch (err) {
    console.error("Error finding posts:", err);
    res.status(500).send("Error finding posts");
  }
});

// Mostrar formulario para crear un nuevo post
router.get("/posts/new", (req, res) => {
  res.render("posts/new", {
    pageTitle: "Nuevo Post - Marea"
  });
}); 

//Mostrar detalle de post (detail.hanldebars)
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).lean();

    if (!post) return res.status(404).render("404");

    res.render("posts/detail", { post });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener el post");
  }
});


//Ruta para editar entradas
router.get('/posts/:id/edit', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).lean();

    if (!post) return res.status(404).render("404");

    res.render("posts/edit", { post });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener el post");
  }
});

//Ruta POST crear nuevo
router.post('/posts', upload.single('image'), async (req, res) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY});
  
  // ---> Extraer GPS de la imagen
  const location = await getExifLocation(req.file.buffer) || "Unknown";

// Convertir el buffer a base64
  const b64 = Buffer.from(req.file.buffer).toString('base64');
  const dataURI = `data:${req.file.mimetype};base64,${b64}`;

  //IA Especie
const contents = [
  {
    inlineData: {
      mimeType: req.file.mimetype,
      data: b64,
    },
  },
  { text: "Give me only the scientific species name of the animal in the picture (genus + species if available) in les than 15 characters and whithout using *." },
];


const aiSpecie = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: contents,
});
console.log(aiSpecie.text);

//IA Nombre
const commonName = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Give me ONLY the most widely used common name for the species "${aiSpecie.text}" in less than 15 characters. Use the shortest and most common accepted name (e.g., "orca", not "killer whale").` ,
  });
  console.log(commonName.text);

  //AI Description
  const aiDescription = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Give me a short description (max 450 characters) of the species "${aiSpecie.text} whithout using *."` ,
  });
  console.log(aiDescription.text);

    // Subir a Cloudinary
  const result = await cloudinary.uploader.upload(dataURI, {
    folder: "marea-projects",
    resource_type: "auto"
  });


    // Guardar en MongoDB
  await Post.create({
  species: aiSpecie.text,
  commonName: commonName.text,
  location,
  description: aiDescription.text,
  imageUrl: result.secure_url,
  imagePublicId: result.public_id,
});

  res.redirect('/gallery?success=true'); 

  } catch (err) {
    console.error("Error creando post:", err);
    res.status(500).send("Error al crear post");
  }
});

//Ruta POST para editar/actualizar entradas
router.post('/posts/:id', upload.single('image'), async (req, res) => {
  try {

  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).render('404');
  }

  // Actualiza el texto
  post.species = req.body.species;
  post.commonName = req.body.commonName;
  post.location = req.body.location;
  post.description = req.body.description;

  // Si el usuario subió nueva imagen → reemplazar imageUrl
  if (req.file) {
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "marea-projects",
      resource_type: "auto"
  });
  post.imageUrl = result.secure_url;
    post.imagePublicId = result.public_id;
  }


  await post.save();

  res.redirect('/posts/' + req.params.id); 
} catch (err) {
    console.error("Error actualizando:", err);
    res.status(500).send("Error al actualizar");
  }
});

//Ruta POST para eliminar una entrada.
router.post('/posts/:id/delete', async (req, res) => {
  try {
  
    await Post.findByIdAndDelete(req.params.id);
            
    res.redirect('/gallery');         // volver a la galería

  } catch (err) {
    console.error(err);
    res.status(500).send("Error al eliminar post");
  }
});

export default router;