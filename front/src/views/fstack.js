import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';

const Fstack = props => {
    const { store, actions } = useContext(Context)
    return (
        <>
            <h1>Full Stack</h1>
            <div className="blog-container">
                <div className="row">
                    <div className="card-group">
                        {
                            !!store.fsblog ?
                                store.fsblog.map((fsblo, i) => {
                                    return (
                                        <div className="col-lg-3 col-md-4 col-xs-12 justify-content-center">
                                            <div className="card blogcard" key={i}>
                                                <Link type="button" className="btn btn-light" to={"/fstack/" + fsblo.fsurl}>
                                                    <img src="http://placehold.it/600x500" className="card-img-top my-2" alt={"image of " + fsblo.fstitulo} />
                                                    <div className="card-body">
                                                        <h5 className="card-title">{fsblo.fstitulo}</h5>
                                                        <p className="card-text text-justify">{fsblo.fsdescripcion}</p>
                                                    </div>
                                                    <div className="card-footer">
                                                        <small className="text-muted">Algun dia</small>
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

export default Fstack;