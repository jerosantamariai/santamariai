import React from 'react';
import { Link } from 'react-router-dom';

const Projects = props => {
    return(
        <>
            <h1>Proyectos!!!</h1>
            <h2>Ejercicios</h2>
            <ul>
                <li><Link to="/proyectos/postal">Postal Simple</Link></li>
                <li><Link to="/proyectos/instagramindex">Instagram</Link></li>
                <li><Link to="/proyectos/formulario">Formulario</Link></li>
                <li><Link to="/proyectos/generador_excusas">Generador de Excusas</Link></li>
                <li><Link to="/proyectos/generador_nombres_dominio">Generador de Nombres de Dominio</Link></li>
                <li><Link to="/proyectos/carta_aleatoria">Carta Aleatoria</Link></li>
                <li><Link to="/proyectos/ordenador_cartas">Ordenador de Cartas</Link></li>
                <li><Link to="/proyectos/contadorsimple">Contador Simple</Link></li>
                <li><Link to="/proyectos/listadecontactos">List de Contactos</Link></li>
                <li><Link to="/proyectos/tictactoe">Tic Tac Toe</Link></li>
                <li><Link to="/proyectos/semaforo">Semaforo</Link></li>
                <li><Link to="/proyectos/reproductor_musica">Reproductor de Música</Link></li>
                <li><Link to="/proyectos/lista_tareas">Lista de Tareas</Link></li>
            </ul>
            <hr />
            <h2>Paginas Web</h2>
            <ul>
                <li><Link to="/proyectos/smbarber">SMBarber</Link></li>
                <li><Link to="/proyectos/rapinmi">Rapinmi</Link></li>
                <li><Link to="/proyectos/starwars">Star Wars</Link></li>
            </ul>
        </>
    );
}

export default Projects;