import { JobCard } from "./JobCard"

export function JobListings({jobs}) {
    return (
        <>
            <div className="jobs-listings">

                {
                    jobs.length === 0 && (
                        <p style={{ textAlign: 'center', padding: '1rem', textWrap: 'balance' }}>No se encontraron empleos que coincidan con tus criterios de búsqueda.</p>
                    )
                }

                {jobs.map((job) => (
                    <JobCard job={job} key={job.id} />
                ))}
            </div>
        </>
    )
}