import { useState, useEffect } from "react"
import { Pagination } from "../components/Pagination.jsx"
import { SearchFormSection } from "../components/SearchFormSection.jsx"
import { JobListings } from "../components/JobListings.jsx"

const RESULTS_PER_PAGE = 4
const API_URL = "https://jscamp-api.vercel.app/api/jobs"

const useFilters = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [textToFilter, setTextToFilter] = useState("")
  const [filters, setFilters] = useState({
    technology: "",
    location: "",
    experienceLevel: ""
  })

  const [jobs, setJobs] = useState([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchJobs() {
      try{
        setLoading(true)

        const queryParams = new URLSearchParams({
          limit: RESULTS_PER_PAGE,
          offset: (currentPage - 1) * RESULTS_PER_PAGE
        })
        if(textToFilter) queryParams.append("text", textToFilter)
        if(filters.technology) queryParams.append("technology", filters.technology)
        if(filters.location) queryParams.append("type", filters.location)
        if(filters.experienceLevel) queryParams.append("level", filters.experienceLevel)
        
        const queryString = queryParams.toString()
     
        const response = await fetch(`${API_URL}?${queryString}`)
        const json = await response.json()

        setJobs(json.data)
        setTotal(json.total)
        setTotalPages(Math.ceil(json.total / RESULTS_PER_PAGE))
      }
      catch(error) {
        console.error("Error fetching jobs:", error)
      }
      finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [textToFilter, currentPage, filters])

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
    jobs,
    total,
    loading,
    totalPages,
    currentPage,
    handlePageChange,
    handleSearch,
    handleTextFilter
  }
}

export function SearchPage() {
  const { jobs, total, loading, totalPages, currentPage, handlePageChange, handleSearch, handleTextFilter } = useFilters()

  useEffect(() => {
    document.title = `Resultados: ${total}, Página ${currentPage} - DevJobs`
  }, [total, currentPage])

  return (
    <main>
        <SearchFormSection onSearch={handleSearch} onTextFilter={handleTextFilter} />
        <section>
            {
              loading ? <p>Cargando empleos...</p> : <JobListings jobs={jobs} />
            }
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </section>
    </main>
  )
}
