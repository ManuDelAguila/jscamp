const filterLocation = document.querySelector('#filter-location');
const messageElement = document.querySelector('#filter-selected-value');

filterLocation.addEventListener('change', () => {
    const jobCards = document.querySelectorAll('.job-listing-card');
    const selectedLocation = filterLocation.value;
    if (selectedLocation) {
        messageElement.textContent = `Has seleccionado: ${selectedLocation}`;
    } else {
        messageElement.textContent = '';
    }

    jobCards.forEach(job => {
        const cardLocation = job.dataset.modalidad;
        const isShown = selectedLocation === '' || selectedLocation === cardLocation;
        job.classList.toggle('is-hidden', !isShown);
    });
});
