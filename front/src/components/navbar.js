import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <Link className="navbar-brand" href="#"><strong>&lt;JSMI /&gt;</strong></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/conoceme">Conoceme!</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/icom">Ing. Comercial</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/fstack">Full Stack</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/proyectos">Proyectos</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;