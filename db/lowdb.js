import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

// Archivo JSON donde se guardan los datos
const adapter = new JSONFile('db/db.json')

// Estructura inicial 
const defaultData = { posts: [] }

// Crear conexión con estructura
const db = new Low(adapter, defaultData)

// Leer base de datos
await db.read()

export default db