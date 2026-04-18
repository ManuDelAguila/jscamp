import jobs from "../data/jobs.json" with { type: "json" }
import { DEFAULTS } from "../config.js"
import { JobModel } from "../models/job.js"

export class JobController {
    static async getAll(req, res) {
        const { text, title, level, technology, limit = DEFAULTS.LIMIT_PAGINATION, offset = DEFAULTS.OFFSET_PAGINATION } = req.query

        const {total, paginatedResults} = await JobModel.getAll({text, title, level, technology, limit, offset})
        const limitNumber = Number(limit)
        const offsetNumber = Number(offset)        

        return res.json({total: total, limit: limitNumber, offset: offsetNumber, results: paginatedResults.length, data: paginatedResults})
    }

    static async getId(req, res) {
        const { id } = req.params
    
        const job = await JobModel.getById({id})
    
        if(!job)
            return res.status(404).json({ error: "Job not found"})
    
        return res.json(job)
    }
    
    static async create(req, res) {
        const {titulo, empresa, ubicacion, descripcion, data} = req.body

        const newJob = await JobModel.create({titulo, empresa, ubicacion, descripcion, data})

        return res.status(201).json(newJob)
    }

    static async update(req, res) {}
    static async partialUpdate(req, res) {}
    static async delete(req, res) {}
}