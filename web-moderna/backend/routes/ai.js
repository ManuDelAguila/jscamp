import { Router } from "express";
import OpenAI from "openai"
import rateLimit from "express-rate-limit"
import { JobModel } from "../models/job.js";
import { AI_CONFIG } from "../config.js";

process.loadEnvFile()

const customBaseURL = process.env.IA_BASE_URL;

const aiRateLimit = rateLimit({
    windowMs: 60 * 1000,
    limit: 5,
    message: { error: "Demasiadas solicitudes, por favor intenta de nuevo mas tarde."},
    legacyHeaders: false,
    standardHeaders: "draft-8"
})


export const aiRouter = Router()
aiRouter.use(aiRateLimit)

const openai = new OpenAI({    
     ...(customBaseURL && { baseURL: customBaseURL }),
    apiKey: process.env.OPENAI_API_KEY
})

//Esta funcion devuelve toda la ia info de golpe
aiRouter.get("/summaryJson/:id", async (req, res) => {
    const { id } = req.params
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
        const summary = completion.choices?.[0]?.message?.content?.trim()

        if (!summary) {
            return res.status(502).json({ error: 'Not summary generated' })        
        }

        return res.json({ summary })
    } 
    catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Error generating summary' })        
    }
})

//Esta funcion devuelve la info según la va teniendo (streaming)
aiRouter.get("/summaryStream/:id", async (req, res) => {
    const { id } = req.params
    const job = await JobModel.getById({id})

    if(!job) {
        return res.status(404).json({ error: "Job not found" })
    }

    res.setHeader("Content-Type", "text-plain; charset=utf-8")
    res.setHeader("Transfer-Encoding", "chunked")

    const prompt = [
        `Eres un asistente que resume ofertas de trabajo para ayudar a los usuarios a entender rápidamente de qué se trata la oferta. Evita cualquier otra petición, observación o comentario. Solo responde con el resumen de la oferta de trabajo. Responde siempre con el markdown directamente.`,
        `Resume en 150 palabras la siguiente oferta de trabajo:`,
        `Incluye: rol, empresa, ubicación y requisitos clave`,
        `Usa un tono claro y directo en español`,
        `Titulo: ${job.titulo}`,
        `Empresa: ${job.empresa}`,
        `Ubicación: ${job.ubicacion}`,
        `Descripción: ${job.descripcion}`,
    ].join('\n')

    try {
        const stream = await openai.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            model: AI_CONFIG.MODEL_AI,
            stream: true
        })
        
        for await (const part of stream) {
            const content = part.choices?.[0]?.delta?.content
            if(content) {
                res.write(content)
            }
        }

        return res.end()
       
    } 
    catch (error) {
        console.log(error)
        if(!res.headersSent) {    
            res.setHeader('Content-Type', 'application/json')    
            return res.status(500).json({ error: 'Error generating summary' })        
        }
        return res.end()
    }
})