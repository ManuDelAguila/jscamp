import { useState, useEffect } from "react"
import { Pagination } from "../components/Pagination.jsx"
import { SearchFormSection } from "../components/SearchFormSection.jsx"
import { JobListings } from "../components/JobListings.jsx"

import jobsData from "../data.json"

const RESULTS_PER_PAGE = 4

const useFilters = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [textToFilter, setTextToFilter] = useState("")
  const [filters, setFilters] = useState({
    technology: "",
    location: "",
    experienceLevel: ""
  })

  const jobsFilteredByFilters = jobsData.filter(job => {
    const matchesTechnology = filters.technology === "" || job.data.technology.toLowerCase() === filters.technology.toLowerCase()
    const matchesLocation = filters.location === "" || job.data.modalidad.toLowerCase() === filters.location.toLowerCase()
    const matchesExperienceLevel = filters.experienceLevel === "" || job.data.nivel.toLowerCase() === filters.experienceLevel.toLowerCase()
    
    return matchesTechnology && matchesLocation && matchesExperienceLevel
  })

  const jobssWithTextFilter = textToFilter === ""
    ? jobsFilteredByFilters
    : jobsFilteredByFilters.filter(job => {
        const textToSearch = `${job.titulo} ${job.empresa} ${job.ubicacion}`
        return textToSearch.toLowerCase().includes(textToFilter.toLowerCase())
      })

  
  const totalPages = Math.ceil(jobssWithTextFilter.length / RESULTS_PER_PAGE)

  const pageResults = jobssWithTextFilter.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  )

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleSearch = (filters) => {
    setFilters(filters)
    setCurrentPage(1) // Reiniciar a la primera página al cambiar los filtros
  }

  const handleTextFilter = (newTextToFilter) => {
    setTextToFilter(newTextToFilter)
    setCurrentPage(1) // Reiniciar a la primera página al cambiar el texto del filtro
  }
  return {
    currentPage,
    totalPages,
    pageResults,
    jobssWithTextFilter,
    handlePageChange,
    handleSearch,
    handleTextFilter
  }
}

export function SearchPage() {
  const { currentPage, totalPages, pageResults, jobssWithTextFilter,handlePageChange, handleSearch, handleTextFilter } = useFilters()

  useEffect(() => {
    document.title = `Resultados: ${jobssWithTextFilter.length}, Página ${currentPage} - DevJobs`
  }, [jobssWithTextFilter, currentPage])

  return (
    <main>
        <SearchFormSection onSearch={handleSearch} onTextFilter={handleTextFilter} />
        <section>
            <JobListings jobs={pageResults} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </section>
    </main>
  )
}
