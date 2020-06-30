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
                    <div className="card-deck justify-content-center">
                        {
                            !!store.fsblog ?
                                store.fsblog.map((fsblo, i) => {
                                    return (
                                        <div className="col-lg-3 col-md-4 col-xs-12">
                                            <div className="card h-100 mb-2 blogcard" key={i}>
                                                <Link type="button" className="btn btn-light" to={"/fstack/" + fsblo.fsurl}>
                                                    <img src={fsblo.fsfoto} className="card-img-top my-2" alt={"image of " + fsblo.fstitulo} />
                                                    <div className="card-body">
                                                        <h5 className="card-title">{fsblo.fstitulo}</h5>
                                                        <p className="card-text text-justify">{fsblo.fsdescripcion}</p>
                                                    </div>
                                                    <div className="card-footer">
                                                        <small className="text-muted">{fsblo.fscreatedate}</small>
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