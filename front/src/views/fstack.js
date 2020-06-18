import React from 'react';
import { Link } from 'react-router-dom';

const Fstack = props => {
    return (
        <>
            <h1>Full Stack</h1>
            <Link to="/proyectos/contadorsimple">Contador Simple</Link>
            <Link to="/proyectos/listadecontactos">Contador Simple</Link>
            <Link to="/proyectos/smbarber">SMBarber</Link>
            <Link to="/proyectos/rapinmi">Rapinmi</Link>
            <Link to="/proyectos/tictactoe">Tic Tac Toe</Link>
        </>
    );
}

export default Fstack;