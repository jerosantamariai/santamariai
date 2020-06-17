import React from 'react';
import { Link } from 'react-router-dom';

const Fstack = props => {
    return (
        <>
            <h1>Full Stack</h1>
            <Link to="/proyectos/contadorsimple">Contador Simple</Link>
        </>
    );
}

export default Fstack;