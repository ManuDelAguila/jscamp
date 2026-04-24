import Database from 'better-sqlite3'

const db = new Database('jobs.db')

db.pragma('journal_mode = WAL') // Mejor rendimiento en concurrencia
db.pragma('foreign_keys = ON') // Habilitar claves foráneas

export { db }