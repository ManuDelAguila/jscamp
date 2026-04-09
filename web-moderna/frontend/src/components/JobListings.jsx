import { JobCard } from "./JobCard"

export function JobListings({jobs}) {
    return (
        <>

            <h2>Resultados de búsqueda</h2>

            <div className="jobs-listings">

                {
                    jobs.length === 0 && (
                        <p style={{ textAlign: 'center', padding: '1rem', textWrap: 'balance' }}>No se encontraron empleos que coincidan con tus criterios de búsqueda.</p>
                    )
                }

                {jobs.map((job) => (
                    <JobCard 
                        key={job.id}
                        data={job.data}
                        titulo={job.titulo}
                        empresa={job.empresa}
                        ubicacion={job.ubicacion}
                        descripcion={job.descripcion}
                    />
                ))}
            </div>
        </>
    )
}