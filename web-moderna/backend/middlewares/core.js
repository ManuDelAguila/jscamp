import cors from "cors"

import { ACCEPTED_ORIGINS } from "../config.js"

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => {
    return cors({
        origin: (origin, callback) => {
            if(!origin || acceptedOrigins.includes(origin)) {
                return callback(null, true)
            }
            return callback(new Error("Origen no permitido"))
        }
    })
}