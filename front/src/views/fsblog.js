import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';

const FsBlog = props => {
    const { store, actions } = useContext(Context)
    const blogger = props.match.params.fsurl;
    return (
        <>
            <h1>Blog</h1>
            <div className="blogteiner">
                <div className="card-group">
                    <div className="row">
                        {
                            !!store.fsblog ?
                                store.fsblog.map((fsblo, i) => {
                                    if (JSON.stringify(fsblo.fsurl) === JSON.stringify(blogger)) {
                                        // const img = blo.title.split(" ").join("-").toLowerCase() + ".jpg";
                                        return (
                                            <div className="row card-group mb-3 d-flex justify-content-center cardbg" key={i}>
                                                <h2 className="card-title">{fsblo.fstitulo}</h2>
                                                <iframe width="1200" height="300" src={"https://www.youtube.com/embed/" + fsblo.fsvideo} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                                <div className="col-3 my-auto">
                                                    <img src="http://placehold.it/300x400" className="card-img-top my-2" alt={"image of " + fsblo.id} />
                                                    <Link to={"/blogs"} className="btn btn-secondary d-flex justify-content-center blogitem text-white">Back to Blogs!</Link>
                                                </div>
                                                <div className="col-9 py-4">
                                                    <h5 className="card-text">{fsblo.fssubtitulo}</h5>
                                                    <p className="card-text">{fsblo.fscuerpo}</p>
                                                    <p className="card-text">Release Date: algo que un no existe</p>
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

export default FsBlog