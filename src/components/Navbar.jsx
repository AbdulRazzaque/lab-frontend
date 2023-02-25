import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div >
<nav className="navbar navbar-expand-lg bg-body-tertiarynavbar navbar-dark bg-primary" >
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Lab Reception</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    <Link to="/entry">   <li className="nav-item ">
          <a className="nav-link active" aria-current="page" href="#">Entry Mode</a>
        </li></Link> 
     
        <li className="nav-item">
          <Link to ="/previous" className="nav-link" href="#">Pervious Details</Link>
        </li>
     <Link to="/addlab">  <li className="nav-item">
          <a className="nav-link" href="#">Add Lab</a>
        </li></Link> 
   
        
      </ul>

    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar