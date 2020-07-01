import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';

const Icom = props => {
    const { store, actions } = useContext(Context)
    return (
        <>
            <h1>ICOM</h1>
            <div className="blog-container">
                <div className="row">
                    <div className="card-deck">
                        {
                            !!store.icomblog ?
                                store.icomblog.map((icomblo, i) => {
                                    return (
                                        <div className="col-lg-3 col-md-4 col-xs-12">
                                            <div className="card mb-2 blogcard" key={i}>
                                                <Link type="button" className="btn btn-light" to={"/fstack/" + icomblo.fsurl}>
                                                    <img src={icomblo.icomfoto} className="card-img-top my-2" alt={"image of " + icomblo.icomtitulo} />
                                                    <div className="card-body">
                                                        <h5 className="card-title">{icomblo.icomtitulo}</h5>
                                                        <p className="card-text text-justify">{icomblo.icomdescripcion}</p>
                                                    </div>
                                                    <div className="align-bottom">
                                                        <small className="text-muted">{icomblo.icomcreatedate}</small>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                }
                                ) : (
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

export default Icom;