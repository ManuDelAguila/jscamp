import jobs from "../data/jobs.json" with { type: "json" }
import { db } from "../db/database.js"

export class JobModel {

    static async getAll({ text, title, level, technology, limit = 10, offset = 0 }) {

        let initSelectQuery = 'SELECT j.*, GROUP_CONCAT(jt.technology) AS technologies'
        let initCountQuery = 'SELECT COUNT(1) AS total'
        let query = `            
            FROM jobs j
            JOIN job_technologies jt ON j.id = jt.job_id
            `
        
        const conditions = []
        const params = []

        /*if (technology) {
            conditions.push(``)
            params.push(technology)
        }

        if (filters?.modality) {
            conditions.push(``)
            params.push(filters.modality)
        }

        if (filters?.level) {
            conditions.push(``)
            params.push(filters.level)
        }*/

        if (conditions.length > 0) {
            query += 'WHERE ' + conditions.join(' AND ')
        }

        query += ' GROUP BY j.id'

        query += ' LIMIT ? OFFSET ?'
        params.push(limit, offset)

        let queryCount = initCountQuery + query
        let querySelect = initSelectQuery + query
        
        const rows = db.prepare(querySelect).all(...params)
        const total = db.prepare(queryCount).get(...params).total

        const paginatedJobs = rows.map(row => ({
            id: row.id,
            titulo: row.title,
            empresa: row.company,
            ubicacion: row.location,
            descripcion: row.description,
            data: {
                technology: row.technologies.split(','),
                modalidad: row.modality,
                nivel: row.level
            }
        }))
        
        return {total: total, paginatedResults: paginatedJobs}
        
        /*
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

        return {total: filteredJobs.length, paginatedResults: paginatedJobs}*/
    }

    static async getById({ id }) {
        return jobs.find(job => {return job.id === id})
    }

    static async create({titulo, empresa, ubicacion, descripcion, data}) {
        const newJob = {
            id: crypto.randomUUID(),
            titulo,
            empresa,
            ubicacion,
            descripcion,
            data
        }

        jobs.push(newJob)

        return newJob
    }
}