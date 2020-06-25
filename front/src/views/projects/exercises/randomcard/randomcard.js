import React from 'react';
import { Link } from 'react-router-dom';
import '../randomcard/randomcard.css'
import '../randomcard/main.js'

const RandomCard = props => {
    return (
        <>
            <div className="subbar d-flex justify-content-between my-2 mx-5">
                <h1>Carta Aleatoria</h1>
                <Link to="/proyectos"><div type="btn" className="btn btn-warning">Volver a Proyectos</div></Link>
            </div>
            <div className="randomcardbody">
                <div class="card">
                    <div class="cardcontent">
                    </div>
                </div>
            </div>
        </>
    );
}

export default RandomCard;