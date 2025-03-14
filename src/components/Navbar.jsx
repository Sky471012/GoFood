import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <div className="container-fluid">
                <Link className="navbar-brand fs-1 fst-italic fw-bold" to="/">GoFood</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className="nav-link fw-bold" aria-current="page" to="#">Home</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link fw-bold" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link fw-bold" to="/signup">SignUp</Link>
                    </li>                    
                </ul>
                </div>
            </div>
        </nav>
    </div>
  )
}
