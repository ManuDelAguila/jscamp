import Database from 'better-sqlite3'
import { id } from 'zod/v4/locales'

// Base de datos en memoria (se pierde al cerrar el proceso)
//const db = new Database('jobs.db')
const db = new Database(':memory:')

// Crear tabla
db.exec(`
  CREATE TABLE IF NOT EXISTS jobs (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    modality TEXT NOT NULL
  )
`)

// Insertar datos con prepared statement (previene SQL injection)
const insert = db.prepare(
  'INSERT INTO jobs (id, title, company, modality) VALUES (?, ?, ?, ?)'
)

insert.run('10', 'Frontend Developer', 'TechCorp', 'remote')
insert.run('11', 'Backend Developer', 'StartupX', 'hybrid')

// Consultar todos
const allJobs = db.prepare('SELECT * FROM jobs').all()
console.log('Todos los jobs:', allJobs)
// → [{ id: '10', title: 'Frontend Developer', ... }, { id: '11', ... }]

// Consultar con filtro
const remoteJobs = db.prepare('SELECT * FROM jobs WHERE modality = ?').all('remote')
console.log('Jobs remotos:', remoteJobs)
// → [{ id: '10', title: 'Frontend Developer', ... }]

// Consultar uno por ID
const job = db.prepare('SELECT * FROM jobs WHERE id = ?').get('10')
console.log('Job 10:', job)
// → { id: '10', title: 'Frontend Developer', company: 'TechCorp', modality: 'remote' }

// Actualizar
db.prepare('UPDATE jobs SET modality = ? WHERE id = ?').run('onsite', '10')

// Eliminar
const result = db.prepare('DELETE FROM jobs WHERE id = ?').run('11')
console.log('Filas eliminadas:', result.changes)
// → 1

db.close()