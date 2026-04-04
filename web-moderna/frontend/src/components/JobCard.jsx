import { useState } from "react"

export function JobCard({ data, titulo, empresa, ubicacion, descripcion }) {
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
            data-modalidad={data?.modalidad}
            data-nivel={data?.nivel}
            data-technology={data?.technology}
        >
            <div>
                <h3>{titulo}</h3>
                <small>{empresa} | {ubicacion} - ¿He aplicado? {isAppliedText}</small>
                <p>{descripcion}</p>
            </div>
            <button 
                className={`button-apply-job ${buttonClass}`}
                onClick={handleClick}
            >
                {buttonText}
            </button>
        </article>
    )
}