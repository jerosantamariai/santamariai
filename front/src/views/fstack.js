import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';

const Fstack = props => {
    const { store, actions } = useContext(Context)
    return (
        <>
            <h1>Full Stack</h1>
            {
                !!store.fsblog ?
                    store.fsblog.map((fsblo, i) => {
                        // const img = blo.title.split(" ").join("-").toLowerCase() + ".jpg";
                        return (
                            <>
                                {/* <div className="card-group col-xl-4 col-lg-6 col-md-8 col-xs-12">
                                    <div className="card">
                                        <img src="http://placehold.it/300x450" className="card-img-top" alt={"imagen para " + fsblo.fstitulo} />
                                            <div className="card-body">
                                                <h5 className="card-title">{fsblo.fstitulo}</h5>
                                                <p className="card-text">{fsblo.fsdescripcion}</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                                            </div>
                                        </div>
                                    </div> */}
                                <div className="col-xl-4 col-lg-6 col-md-8 col-xs-12">
                                    <div className="card mb-3" key={i}>
                                        <Link type="button" className="btn btn-light" to={"/fstack/" + fsblo.fsurl}>
                                            {/* <img src={"img/films/" + img} className="card-img-top" alt={"image of " + img} /> */}
                                            <img src="http://placehold.it/300x450" className="card-img-top my-2" alt={"image of " + fsblo.fstitulo} />
                                            {/* <a classNam="text" id="overlay">GO!</a> */}
                                            <div className="card-body">
                                                <h5 className="card-title">{fsblo.fstitulo}</h5>
                                                <p className="card-text text-justify">{fsblo.fsdescripcion}</p>
                                            </div>
                                            <div class="card-footer">
                                                <small class="text-muted">Algun dia</small>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </>
                        )
                    }
                    ) : (
                        <div className="text-center" id="undefined">
                            <div className="spinner-grow text-light" role="status">
                            </div>
                        </div>
                    )
            }
        </>
    );
}

export default Fstack;