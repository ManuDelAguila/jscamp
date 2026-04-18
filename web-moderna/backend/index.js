import express from "express"
import cors from "cors"
import jobs from "./jobs.json" with { type: "json" }
import { DEFAULTS, ACCEPTED_ORIGINS } from "./config.js"

const PORT = process.env.PORT ?? DEFAULTS.PORT
const app = express()


//Middleware de expres para parsear el body cuando llega en formato json
app.use(express.json())

//Con estao aceptaria todos los origenes, pero seremos mas selectivos
// app.use(cors())

app.use(cors({
    origin: (origin, callback) => {
        if(ACCEPTED_ORIGINS.includes(origin)) {
            return callback(null, true)
        }
        return callback(new Error("Origen no permitido"))
    }
}))


//Middleware custom trazabilidad
app.use((req, res, next) =>{
    const timeString = new Date().toLocaleTimeString()
    console.log(`[${timeString}] ${req.method} ${req.url}`)
    next()
})

app.get('/health', (req, res) => {
  return res.json({
    status: 'ok',
    uptime: process.uptime()
  })
})

app.get("/jobs", (req, res) => {
    const { text, title, level, technology, limit = DEFAULTS.LIMIT_PAGINATION, offset = DEFAULTS.OFFSET_PAGINATION } = req.query

    let filteredJobs = jobs
    if (text) {
      const searchTerm = text.toLowerCase()
      filteredJobs = filteredJobs.filter( job => {
        return job.titulo.toLowerCase().includes(searchTerm) || job.descripcion.toLowerCase().includes(searchTerm)
      })
    }

    if (technology) {
      filteredJobs = filteredJobs.filter( job =>{
        return job.data.technology.includes(technology)
      })
    }

    const limitNumber = Number(limit)
    const offsetNumber = Number(offset)

    const paginatedJobs = filteredJobs.slice(offsetNumber, offsetNumber + limitNumber)

    res.json({total: filteredJobs.length, limit: limitNumber, offset: offsetNumber, results: paginatedJobs.length, data: paginatedJobs})
})


app.get("/jobs/:id", (req, res) =>{
    const { id } = req.params

    const job = jobs.find(job => {return job.id === id})

    if(!job)
        return res.status(404).json({ error: "Job not found"})

    return res.json(job)
})

app.post("/jobs", (req, res) =>{
    const {titulo, empresa, ubicacion, descripcion, data} = req.body

    const newJob = {
        id: crypto.randomUUID(),
        titulo,
        empresa,
        ubicacion,
        descripcion,
        data
    }

    jobs.push(newJob)

    return res.status(201).json(newJob)
})

app.listen(PORT, () => {
  console.log(`Servidor levantado en http://localhost:${PORT}`)
})