import 'dotenv/config';
import express from "express";
import { engine } from 'express-handlebars';
import postRouter from "./routes/posts.js";
import authRoutes from './routes/auth.js';
import mongoose from 'mongoose';
import 'dotenv/config';
import connectDB from "./db/connection.js";connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Bd
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB algo falla:'));
db.once('open', () => {
  console.log('MongoDB conectado correctamente');
});


// Middlewares - Servir archivos estáticos (imágenes, CSS, etc.)
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


// Configurar Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views'); // Opcional


// Rutas
app.use("/", postRouter);



// Ruta resend
app.use("/", authRoutes);

// Ruta principal
app.get('/', (req, res) => {
  res.render('home', {
    pageTitle: 'Marea',
  });
});

// La ruta catch-all va AL FINAL
app.use((req, res) => {
  res.status(404).render('404');
});


// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


