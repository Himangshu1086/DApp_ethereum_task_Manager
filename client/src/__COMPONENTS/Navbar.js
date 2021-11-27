import React from 'react'

function Navbar() {
    return (
        <div>
           <nav className="navbar navbar-expand-lg navbar-dark" style={{height:"50px" , fontSize:"20px" , background:"black"}}>
            <a className="navbar-brand" style={{fontSize:"30px" , paddingLeft:"60px" , paddingTop:"30px"}} href="#">Decentralized Voting App</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" style={{ position:"absolute" ,  right:"100px" , paddingTop:"30px"}} id="navbarNavAltMarkup">
                <div className="navbar-nav" >
                <a className="nav-item nav-link " style ={{paddingRight:"50px"}} href="#">Add Candidate</a>
                <a className="nav-item nav-link" href="#">About</a>
                </div>
            </div>
            </nav>
        </div>
    )
}

export default Navbar
