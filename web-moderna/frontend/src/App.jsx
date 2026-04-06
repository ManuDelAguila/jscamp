import { Footer } from "./components/Footer.jsx"
import { Header } from "./components/Header.jsx"

import { HomePage } from "./pages/Home.jsx"
import { SearchPage } from "./pages/Search.jsx"
import { NotFoundPage } from "./pages/404.jsx"

function App() {
  const currentPath = window.location.pathname

  let page = <NotFoundPage />
  if (currentPath === "/") {
    page = <HomePage />
  } else if (currentPath === "/search") {
    page = <SearchPage />
  }

  return (
    <>
    <Header />
    {page}
    <Footer />
    </>
  )
}

export default App
