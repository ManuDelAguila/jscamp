import { Route } from "./components/Route.jsx"
import { Footer } from "./components/Footer.jsx"
import { Header } from "./components/Header.jsx"

import { HomePage } from "./pages/Home.jsx"
import { SearchPage } from "./pages/Search.jsx"



function App() {

  return (
    <>
    <Header />
    <Route path="/" component={HomePage} />
    <Route path="/search" component={SearchPage} />
    <Footer />
    </>
  )
}

export default App
