import express from "express"
import { corsMiddleware } from "./middlewares/core.js"
import { jobsRouter } from "./routes/jobs.js"
import { aiRouter } from "./routes/ai.js"
import { DEFAULTS } from "./config.js"

const PORT = process.env.PORT ?? DEFAULTS.PORT
const app = express()

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