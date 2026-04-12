import { useState } from "react"
import { Link } from "./Link"
import styles from './JobCard.module.css'
import { useFavoritesStore } from "../store/favoritesStore"


function JobCardFavoriteButton ({ jobId }) {
    const { isFavorite, toggleFavorite } = useFavoritesStore()
    return (
        <button onClick={() => toggleFavorite(jobId)}>
            {isFavorite(jobId) ? '❤️' : '🤍'}
        </button>
    )
}

export function JobCard({ job }) {
    const [isApplied, setIsApplied] = useState(false)

    function handleClick() {
        setIsApplied(!isApplied)
    }

    const buttonText = isApplied ? "Aplicado" : "Aplicar"
    const buttonClass = isApplied ? 'is-applied' : ''
    const isAppliedText = isApplied ? 'Sí' : 'No'

    return (
        <article 
            className="job-listing-card"
            data-modalidad={job?.data?.modalidad}
            data-nivel={job?.data?.nivel}
            data-technology={job?.data?.technology}
        >
            <div>
                <h3>
                    <Link href={`/job/${job.id}`} className={styles.title}>
                        {job.titulo}
                    </Link>
                </h3>
                <small>{job.empresa} | {job.ubicacion} - ¿He aplicado? {isAppliedText}</small>
                <p>{job.descripcion}</p>
            </div>
            <div className={styles.actions}>
                <Link href={`/job/${job.id}`} className={styles.details}>
                Ver detalles
                </Link>
                <button 
                    className={`button-apply-job ${buttonClass}`}
                    onClick={handleClick}
                >
                    {buttonText}
                </button>
                <JobCardFavoriteButton jobId={job.id} />
            </div>
        </article>
    )
}