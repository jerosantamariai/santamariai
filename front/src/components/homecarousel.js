import React, { useContext } from 'react';
import { Context } from '../store/appContext';

const HomeCarousel = props => {
    const { store, actions } = useContext(Context)
    return (
        <>
            <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                </ol>
                {
                    !!store.hc ?
                        store.hc.map((hcd, i) => {
                            return (
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img src={hcd.hcimg} className="d-block w-100" alt="..." />
                                        <div className="carousel-caption d-none d-md-block">
                                            <h5>{hcd.hctitle}</h5>
                                            <p>{hcd.hcp}</p>
                                        </div>
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
                <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </>
    );
}

export default HomeCarousel;