import { useState, useEffect } from "react"

export function useRouter() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener("popstate", handleLocationChange)

    return () => {
       window.removeEventListener("popstate", handleLocationChange)
    }
  }, [])

  function navigateTo(path) {
    window.history.pushState({}, "", path)
    window.dispatchEvent(new PopStateEvent("popstate")) // Disparar un evento para notificar el cambio de ruta
  }

  return { currentPath, navigateTo }
}