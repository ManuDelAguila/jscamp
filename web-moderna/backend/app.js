import express from "express"
import { corsMiddleware } from "./middlewares/core.js"
import { jobsRouter } from "./routes/jobs.js"
import { aiRouter } from "./routes/ai.js"
import { DEFAULTS } from "./config.js"

const PORT = process.env.PORT ?? DEFAULTS.PORT
const app = express()

// Eso es para el RateLimit para que las cabeceras las lea del proxy que hay antes, Nginx, Cloudflare... pq las del usuario no se puede confiar ya que son facilmente modificables
app.set("trust proxy", 1)

app.use(corsMiddleware())
app.use(express.json())

app.use("/jobs", jobsRouter)
app.use("/ai", aiRouter)

if (!process.env.NODE_ENV) {
    app.listen(PORT, () => {
        console.log(`Servidor levantado en http://localhost:${PORT}`)
    })
}

export default app