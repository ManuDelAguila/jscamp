process.loadEnvFile()

export const DEFAULTS = {
    PORT: 1234,
    LIMIT_PAGINATION: 10,
    OFFSET_PAGINATION: 0
}

export const ACCEPTED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:1234",
    //Puede ser un lisatdo
]

export const AI_CONFIG = {
    MODEL_AI: process.env.ModelAI ?? "gpt-5.2"
}