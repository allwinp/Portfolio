import React from 'react'
import PersonalLogo from '../logo.png'

const Navbar = () => {
    return (
        <nav class="navbar fixed-top navbar-expand-md navbar-light bg-transparent">
        <div className="container">
            <a className="navbar-brand mx-auto" href="/"><img className="PersonalLogo" src={PersonalLogo} alt='Personal Logo.'></img></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <a className="nav-link" href="/#/about">About Me</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="/#/projects">Projects</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="/#/services">Services</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="/#/contact">Contact</a>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    
        
    )
}

export default Navbar