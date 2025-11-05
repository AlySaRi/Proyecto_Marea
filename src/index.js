import 'dotenv/config';
import express from 'express';
import { engine } from 'express-handlebars';
import { readFileSync } from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;

// Leer datos de los archivos JSON 
//const journalData = JSON.parse(readFileSync('./turtle-journal.json', 'utf-8'));

// Configurar Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Servir archivos estáticos (imágenes, CSS, etc.)
app.use(express.static('public'));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Ruta principal
app.get('/', (req, res) => {
  res.render('home', {
    pageTitle: 'Marea',
  });
});

// Ruta Login
app.get("/login", (req, res) => {
  res.render("login", {
    pageTitle: "Login - Marea 🐢🌊"
  });
});

// Ruta Sign Up
app.get("/signup", (req, res) => {
  res.render("signup", {
    pageTitle: "Sign Up - Marea 🐢🌊"
  });
});
