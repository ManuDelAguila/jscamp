import { useState, useEffect } from "react"
import { Pagination } from "../components/Pagination.jsx"
import { SearchFormSection } from "../components/SearchFormSection.jsx"
import { JobListings } from "../components/JobListings.jsx"
import { useRouter } from "../hooks/useRouter"
import { useSearchParams } from "react-router"

const RESULTS_PER_PAGE = 4
const API_URL = "https://jscamp-api.vercel.app/api/jobs"

const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [currentPage, setCurrentPage] = useState(() => {
    const page = (searchParams.get("page")) ? Number(searchParams.get("page")) : 1
    return Number.isNaN(page) ? 1 : page
  })
  const [textToFilter, setTextToFilter] = useState(() => {
    return searchParams.get("text") || ""
  })
  const [filters, setFilters] = useState(() => {
    return {
      technology: searchParams.get("technology") || "",
      location: searchParams.get("type") || "",
      experienceLevel: searchParams.get("level") || ""
    }
  })

  const [jobs, setJobs] = useState([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  
  const { navigateTo } = useRouter()

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
  }, [filters, currentPage, textToFilter])

  useEffect(() => {
    setSearchParams(() => {      
      const params = new URLSearchParams()

      if(textToFilter) params.set("text", textToFilter)
      if(filters.technology) params.set("technology", filters.technology)
      if(filters.location) params.set("type", filters.location)
      if(filters.experienceLevel) params.set("level", filters.experienceLevel)
      if(currentPage > 1) params.set("page", currentPage)
      return params
    })
  }, [filters, currentPage, textToFilter, setSearchParams])

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
    textToFilter,
    handlePageChange,
    handleSearch,
    handleTextFilter
  }
}

export function SearchPage() {
  const { jobs, total, loading, totalPages, currentPage, textToFilter,handlePageChange, handleSearch, handleTextFilter } = useFilters()

  useEffect(() => {
    document.title = `Resultados: ${total}, Página ${currentPage} - DevJobs`
  }, [total, currentPage])

  return (
    <main>
        <SearchFormSection initialText={textToFilter} onSearch={handleSearch} onTextFilter={handleTextFilter} />
        <section>
            <h2 style={{ textAlign: 'center' }}>Resultados de búsqueda</h2>
            {
              loading ? <p>Cargando empleos...</p> : <JobListings jobs={jobs} />
            }
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </section>
    </main>
  )
}
