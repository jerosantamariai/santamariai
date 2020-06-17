import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-black">
                <Link className="navbar-brand stdbtn" to="/"><strong>&lt;SMI /&gt;</strong></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link mr-3 stdbtn" to="/miperfil">Perfil <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link mr-3 stdbtn" to="/icom">Ing. Comercial</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link mr-3 stdbtn" to="/proyectos">Proyectos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link mr-3 stdbtn" to="#">Pricing</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link stdbtn" to="#" tabindex="-1" aria-disabled="true">Disabled</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar;