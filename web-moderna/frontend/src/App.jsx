import { Routes, Route } from "react-router"

import { Footer } from "./components/Footer.jsx"
import { Header } from "./components/Header.jsx"

import { HomePage } from "./pages/Home.jsx"
import { SearchPage } from "./pages/Search.jsx"
import { NotFoundPage } from "./pages/404.jsx"
import { JobDetail } from "./pages/Detail.jsx"



function App() {

  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/job/:jobId" element={<JobDetail />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    <Footer />
    </>
  )
}

export default App
