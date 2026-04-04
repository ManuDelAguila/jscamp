import { JobCard } from "./JobCard"

export function JobListings() {
    return (
        <>

            <h2>Resultados de búsqueda</h2>

            <div className="jobs-listings">
                <JobCard
                    data={{
                        modalidad: 'remoto',
                        nivel: 'junior',
                        technology: 'react'
                    }}
                    titulo="Desarrollador Frontend Junior"
                    empresa="Tech Solutions"
                    ubicacion="Remoto"
                    descripcion="Únete a nuestro equipo como desarrollador frontend junior y trabaja en proyectos innovadores utilizando React."
                />
            </div>
        </>
    )
}