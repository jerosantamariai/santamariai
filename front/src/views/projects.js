import React from 'react';
import { Link } from 'react-router-dom';

const Projects = props => {
    return(
        <>
            <h1>Proyectos!!!</h1>
            <h2>Ejercicios</h2>
            <ul>
                <li><Link to="/proyectos/postal">Postal Simple</Link></li>
                <li><Link to="/proyectos/instagram">Instagram</Link></li>
                <li><Link to="/proyectos/contadorsimple">Contador Simple</Link></li>
                <li><Link to="/proyectos/listadecontactos">Contador Simple</Link></li>
                <li><Link to="/proyectos/tictactoe">Tic Tac Toe</Link></li>
                <li><Link to="/proyectos/semaforo">Semaforo</Link></li>
            </ul>
            <hr />
            <h2>Paginas Web</h2>
            <ul>
                <li><Link to="/proyectos/smbarber">SMBarber</Link></li>
                <li><Link to="/proyectos/rapinmi">Rapinmi</Link></li>
            </ul>
        </>
    );
}

export default Projects;