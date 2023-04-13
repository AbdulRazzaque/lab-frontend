import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div >
<nav className="navbar navbar-expand-lg bg-body-tertiarynavbar navbar-dark bg-primary" >
  <div className="container-fluid">
    <Link to="/Hospitalbrucella" className="navbar-brand" >Lab Reception</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item ">
          <Link to ="/Mainlab" className="nav-link active" >Main Lab</Link>
        </li>
          <li className="nav-item ">

          <Link to ="/Hplclab" className="nav-link active" >HPLC Lab</Link>

        </li>
          <li className="nav-item ">

          <Link to ="/Allparasites" className="nav-link active" >Parasites Lab</Link>
        </li>
 
        <li className="nav-item dropdown ">
          <a className="nav-link dropdown-toggle nav-link active" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Micro Lab
          </a>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item " to="/Hospitalbrucella">Hospital Brucella</Link></li>
            <li><Link  className="dropdown-item" to="/Culture">culture</Link></li>
            <li><Link className="dropdown-item" to="/Projectbrucella">Projcet Brucella</Link></li>
          </ul>
        </li> 
        <li className="nav-item dropdown ">
          <a className="nav-link dropdown-toggle nav-link active"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Genetic lab
          </a>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item " to="/Pcr">PCR </Link></li>
            <li><Link className="dropdown-item" to="/Dna">DNA</Link></li>
          </ul>
        </li> 
            
      </ul>

    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar