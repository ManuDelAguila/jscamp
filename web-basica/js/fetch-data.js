const jobListingSection = document.querySelector('.jobs-listings');
fetch("./data.json")
    .then(response => response.json())
    .then(jobs => {
        jobs.forEach(job => {
            const jobCard = document.createElement('article');
            jobCard.classList.add('job-listing-card');
            jobCard.dataset.modalidad = job.data.modalidad;
            jobCard.dataset.nivel = job.data.nivel;
            jobCard.dataset.technology = job.data.technology;
            jobCard.innerHTML = `
                <div>
                    <h3>${job.titulo}</h3>
                    <small>${job.empresa} | ${job.ubicacion}</small>
                    <p>${job.descripcion}</p>
                </div>
                <button class="button-apply-job">Aplicar</button>
            `;
            jobListingSection.appendChild(jobCard);
        });
    });