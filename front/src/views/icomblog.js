import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';

const IcomBlog = props => {
    const { store, actions } = useContext(Context)
    const blogger = props.match.params.icomurl;
    return(
        <>
            <h1>Hola</h1>
            <div className="blogteiner">
                <div className="card-group">
                    <div className="row">
                        {
                            !!store.icomblog ?
                                store.icomblog.map((icomblo, i) => {
                                    if (JSON.stringify(icomblo.icomurl) === JSON.stringify(blogger)) {
                                        // const img = blo.title.split(" ").join("-").toLowerCase() + ".jpg";
                                        return (
                                            <div className="row card-group mb-3 d-flex justify-content-center cardbg" key={i}>
                                                <h2 className="card-title">{icomblo.icomtitulo}</h2>
                                                <iframe width="1200" height="300" src={"https://www.youtube.com/embed/" + icomblo.icomvideo} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                                <div className="col-3 my-auto">
                                                    <img src={icomblo.icomfoto} className="card-img-top my-2" alt={"image of " + icomblo.id} />
                                                    <Link to={"/icomtack"} className="btn btn-secondary d-flex justify-content-center blogitem text-white">&#60;&#60;  Atrás</Link>
                                                </div>
                                                <div className="col-9 py-4">
                                                    <h5 className="card-text">{icomblo.icomsubtitulo}</h5>
                                                    <p className="card-text">{icomblo.icomcuerpo}</p>
                                                    <p className="card-text">Fecha de Creación: {icomblo.icomcreatedate}</p>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                                : (
                                    <div className="text-center" id="undefined">
                                        <div className="spinner-grow text-light" role="status">
                                        </div>
                                    </div>
                                )
                        }
                    </div>

                </div>
            </div>
        </>
    );
}

export default IcomBlog;