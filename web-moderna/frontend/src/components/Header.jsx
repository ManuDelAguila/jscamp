import { Link } from "./Link";
import { NavLink } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function Header() {
    const { isLoggedIn, login, logout } = useContext(AuthContext)
    return (
        <header>
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
                <h1>
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                    DevJobs
                </h1>
            </Link>
            <nav>
                <NavLink 
                  className={({ isActive }) => isActive ? 'nav-link-active' : '' }
                  to="/search">Empleos</NavLink>
            </nav>

            {
                isLoggedIn 
                  ? <button onClick={logout}>Cerrar sesión</button>
                  : <button onClick={login}>Iniciar sesión</button>
            }

        </header>
    )
}