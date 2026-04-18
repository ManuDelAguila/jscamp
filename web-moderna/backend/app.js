import express from "express"
import cors from "cors"

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

app.listen(PORT, () => {
  console.log(`Servidor levantado en http://localhost:${PORT}`)
})