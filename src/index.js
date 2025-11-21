import 'dotenv/config';
import express from 'express';
import { engine } from 'express-handlebars';
import { readFileSync } from 'fs';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import multer from 'multer';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;

// Leer datos de los archivos JSON 
//const journalData = JSON.parse(readFileSync('./turtle-journal.json', 'utf-8'));


//Configuración Multer (upload)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/'); // carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // nombre único
  }
});

const upload = multer({ storage });



// Configuración LowDB
const adapter = new JSONFile('db.json');
const db = new Low(adapter, { projects: [] });

// Leer datos iniciales
await db.read();


// Configurar Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Servir archivos estáticos (imágenes, CSS, etc.)
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});





//RUTAS
// Ruta principal
app.get('/', (req, res) => {
  res.render('home', {
    pageTitle: 'Marea',
  });
});

// Ruta Login
app.get("/login", (req, res) => {
  res.render("login", {
    pageTitle: "Login - Marea"
  });
});

// Ruta Sign Up
app.get("/signup", (req, res) => {
  res.render("signup", {
    pageTitle: "Sign Up - Marea"
  });
});


//Ruta Gallery
app.get("/gallery", async (req, res) => {
  await db.read();

  res.render("gallery", {
    pageTitle: "Gallery - Marea",
    projects: db.data.projects
  });
});


//Ruta ID
app.get('/gallery/:id', async (req, res) => {
  await db.read();

  const projectId = parseInt(req.params.id);
  const project = db.data.projects.find(p => p.id === projectId);

  if (project) {
    res.render('project-detail', { project });
  } else {
    res.status(404).send('Proyecto no encontrado');
  }
});



//Ruta para mostrar la entrada en detalle (project-detail.hanldebars)
app.get('/projects/:id', async (req, res) => {
  await db.read();

  const project = db.data.projects.find(p => p.id == req.params.id);

  if (!project) {
    return res.status(404).send("Proyecto no encontrado");
  }

  res.render("project-detail", { project });
});


//Ruta para editar entradas
app.get('/projects/:id/edit', async (req, res) => {
  await db.read();

  const project = db.data.projects.find(p => p.id == req.params.id);

  if (!project) {
    return res.status(404).send("Proyecto no encontrado");
  }

  res.render('project-edit', { project });
});



//Ruta POST para guardar entradas
app.post('/projects', upload.single('image'), async (req, res) => {
  await db.read();

   // Obtener datos del formulario
  const { title, location, description } = req.body;

  // Generar ID único
  const newId = db.data.projects.length > 0
    ? Math.max(...db.data.projects.map(p => p.id)) + 1
    : 1;

  const newProject = {
    id: newId, 
    title,
    location,
    description,
    imageUrl: '/uploads/' + req.file.filename
  };

  db.data.projects.push(newProject);
  await db.write();

  res.redirect('/gallery?success=true'); 
});


//Ruta POST para editar/actualizar entradas
app.post('/projects/:id', upload.single('image'), async (req, res) => {
  await db.read();

  const project = db.data.projects.find(p => p.id == req.params.id);

  if (!project) {
    return res.status(404).send("Proyecto no encontrado");
  }

  // Actualiza el texto
  project.title = req.body.title;
  project.location = req.body.location;
  project.description = req.body.description;

  // Si el usuario subió nueva imagen → reemplazar imageUrl
  if (req.file) {
    project.imageUrl = '/uploads/' + req.file.filename;
  }

  await db.write();

  res.redirect('/projects/' + req.params.id); 
});


//Ruta POST para eliminar una entrada.
app.post('/projects/:id/delete', async (req, res) => {
  await db.read();

  const id = parseInt(req.params.id); // Convertir id de string a número
  const index = db.data.projects.findIndex(p => p.id === id);

  if (index !== -1) {
    db.data.projects.splice(index, 1); // eliminar del array
    await db.write();                 // guardar cambios en db.json
    res.redirect('/gallery');         // volver a la galería
  } else {
    res.status(404).send('Proyecto no encontrado');  //Aquí habrá q res.redirect a /404
  }
});