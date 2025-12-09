import app from "./app.js";
import connectToDB from "./config/db.js";

const PORT = process.env.PORT || 3000;

// Conectar a la base de datos una sola vez
connectToDB();

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
