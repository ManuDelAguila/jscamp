import jobs from "../data/jobs.json" with { type: "json" }

export class JobModel {

    static async getAll({ text, title, level, technology, limit = 10, offset = 0 }) {
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

        return {total: filteredJobs.length, paginatedResults: paginatedJobs}
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