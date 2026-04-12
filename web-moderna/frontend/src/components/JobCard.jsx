import { useState } from "react"
import { Link } from "./Link"
import styles from './JobCard.module.css'
import { useFavoritesStore } from "../store/favoritesStore"
import { useAuthStore } from "../store/authStore"


function JobCardFavoriteButton ({ jobId }) {
    const { isFavorite, toggleFavorite } = useFavoritesStore()
    const {isLoggedIn} = useAuthStore()

    return (
        <button disabled={!isLoggedIn} onClick={() => toggleFavorite(jobId)}>
            {isFavorite(jobId) ? '❤️' : '🤍'}
        </button>
    )
}

function JobCardApplyButton ({ jobId }) {
    const [isApplied, setIsApplied] = useState(false)
    const {isLoggedIn} = useAuthStore()

    const buttonText = isApplied ? "Aplicado" : "Aplicar"
    const buttonClass = isApplied ? 'is-applied' : ''

    function handleClick() {
        console.log("Has aplicado al trabajo: ", jobId)
        setIsApplied(!isApplied)
    }

    return (
        <button 
          disabled={!isLoggedIn}
          className={`button-apply-job ${buttonClass}`}
          onClick={handleClick}
        >
            {buttonText}
        </button>
    )
}

export function JobCard({ job }) {
    const [isApplied] = useState(false)    
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
                <JobCardApplyButton jobId={job.id} />
                <JobCardFavoriteButton jobId={job.id} />
            </div>
        </article>
    )
}