import mongoose from "mongoose";

//Esquema
const postSchema = new mongoose.Schema({
   species: {
    type: String,
    required: true, // la IA siempre lo genera
  },
  commonName: {
    type: String,
    required: true, // la IA siempre lo genera
  },
  location: {
    type: String,
    default: "Unknown", // extraído del EXIF o Unknown
  },
  description: {
    type: String,
    required: true, // la IA siempre lo genera
  },
  imageUrl: {
    type: String,
    required: true, // subido a Cloudinary
  },
  imagePublicId: {
    type: String,
    required: true, // subido a Cloudinary
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//Crear el modelo
const Post = mongoose.model("Post", postSchema);

export default Post;