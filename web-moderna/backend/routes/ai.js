import { Router } from "express";
import OpenAI from "openai"
import { JobModel } from "../models/job.js";
import { AI_CONFIG } from "../config.js";

process.loadEnvFile()

export const aiRouter = Router()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

aiRouter.get("/summary/:id", async (req, res) => {
    const { id } = req.params
    console.log("ID:", id)
    const job = await JobModel.getById({id})

    if(!job) {
        return res.status(404).json({ error: "Job not found" })
    }

    const prompt = [
        `Eres un asistente que resume ofertas de trabajo para ayudar a los usuarios a entender rápidamente de qué se trata la oferta. Evita cualquier otra petición, observación o comentario. Solo responde con el resumen de la oferta de trabajo. Responde siempre con el markdown directamente.`,
        `Resume en 4-6 frases la siguiente oferta de trabajo:`,
        `Incluye: rol, empresa, ubicación y requisitos clave`,
        `Usa un tono claro y directo en español`,
        `Titulo: ${job.titulo}`,
        `Empresa: ${job.empresa}`,
        `Ubicación: ${job.ubicacion}`,
        `Descripción: ${job.descripcion}`,
    ].join('\n')

    try {
        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            model: AI_CONFIG.MODEL_AI
        })
        
        const summary = completion.choices?.[0]?.messages?.content?.trim()

        if (!sumary) {
            return res.status(502).json({ error: 'Not summary generated' })        
        }

        return res.json({ summary })
    } 
    catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Error generating summary' })        
    }
})