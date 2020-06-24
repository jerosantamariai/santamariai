import React from 'react';
import { Link } from 'react-router-dom';
import "../instagram/instagram.css";

const InstagramFeed = props => {
    return (
        <>
            <div className="subbar d-flex justify-content-between my-2 mx-5">
                <h1>Instagram</h1>
                <Link to="/proyectos"><div type="btn" className="btn btn-warning">Volver a Proyectos</div></Link>
            </div>
            <div className="instagram">
                <div className="top">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light ">
                        <a className="navbar-brand" href="#"> <i className="fab fa-instagram"></i> Instagram</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
                            <ul className="navbar-nav">
                                <button type="button" className="btn btn-success" data-toggle="modal" data-target="#createpost">Create a
                        New Post</button>
                                <div className="modal fade" id="createpost" tabindex="-1" role="dialog"
                                    aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Add New Post</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="form-group">
                                                    <label for="comment">Comment:</label>
                                                    <textarea className="form-control" rows="5" id="comment"></textarea>
                                                </div>
                                                <i className="fas fa-camera"></i>
                                                <i className="fas fa-map-marker-alt"></i>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-primary">Save changes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-cog"></i>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                        <a className="dropdown-item" href="#">Nothing to show</a>
                                    </div>
                                </li>
                            </ul>

                        </div>
                    </nav>
                    <div className="col">
                        <ul className="nav justify-content-center">
                            <li className="nav-item p-2">
                                <Link className="nav-link active fas fas fa-th" to="/proyectos/instagramindex"></Link>
                            </li>
                            <li className="nav-item p-2">
                                <Link className="nav-link fas fa-square disabled"
                                    to="#"></Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="bodycontainer">
                    <div className="border">
                        <div className="post mb-5">
                            <div className="header">
                                <div className="left">
                                    <i className="fab fa-html5 fa-2x"></i>
                                    <span>HTML5<br />
                                        Rigoberto</span>
                                </div>
                                <div className="right">
                                    <i className="fas fa-ellipsis-v"></i>
                                </div>
                            </div>
                            <div className="image">
                                <img src="https://picsum.photos/900/450" />
                            </div>
                            <div className="inter">
                                <div className="left">
                                    <i className="far fa-heart"></i>
                                    <i className="far fa-comment"></i>
                                    <i className="far fa-paper-plane"></i>
                                </div>
                                <div className="right">
                                    <i className="far fa-flag"></i>
                                </div>
                            </div>
                            <div className="comments">
                                <p>Liked by <b>4GeeksAcademy, html5, Web</b> and <b>100,000 others</b></p>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi, quo quos, culpa voluptates
                                tempore
                                commodi autem, ipsa recusandae facere inventore repellendus officia magnam? Exercitationem error
                                quaerat
                        ex quod, soluta rerum!</p>
                            </div>
                        </div>
                        <div className="post mb-5">
                            <div className="header">
                                <div className="left">
                                    <i className="fab fa-html5 fa-2x"></i>
                                    <span>HTML5<br />
                                            Rigoberto</span>
                                </div>
                                <div className="right">
                                    <i className="fas fa-ellipsis-v"></i>
                                </div>
                            </div>
                            <div className="image">
                                <img src="https://picsum.photos/id/237/900/450" />
                            </div>
                            <div className="inter">
                                <div className="left">
                                    <i className="far fa-heart"></i>
                                    <i className="far fa-comment"></i>
                                    <i className="far fa-paper-plane"></i>
                                </div>
                                <div className="right">
                                    <i className="far fa-flag"></i>
                                </div>
                            </div>
                            <div className="comments">
                                <p>Liked by <b>4GeeksAcademy, html5, Web</b> and <b>100,000 others</b></p>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi, quo quos, culpa voluptates
                                tempore
                                commodi autem, ipsa recusandae facere inventore repellendus officia magnam? Exercitationem error
                                quaerat
                        ex quod, soluta rerum!</p>
                            </div>
                        </div>
                        <div className="post mb-5">
                            <div className="header">
                                <div className="left">
                                    <i className="fab fa-html5 fa-2x"></i>
                                    <span>HTML5<br />
                                                Rigoberto</span>
                                </div>
                                <div className="right">
                                    <i className="fas fa-ellipsis-v"></i>
                                </div>
                            </div>
                            <div className="image">
                                <img src="https://picsum.photos/seed/picsum/900/450" />
                            </div>
                            <div className="inter">
                                <div className="left">
                                    <i className="far fa-heart"></i>
                                    <i className="far fa-comment"></i>
                                    <i className="far fa-paper-plane"></i>
                                </div>
                                <div className="right">
                                    <i className="far fa-flag"></i>
                                </div>
                            </div>
                            <div className="comments">
                                <p>Liked by <b>4GeeksAcademy, html5, Web</b> and <b>100,000 others</b></p>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi, quo quos, culpa voluptates
                                tempore
                                commodi autem, ipsa recusandae facere inventore repellendus officia magnam? Exercitationem error
                                quaerat
                        ex quod, soluta rerum!</p>
                            </div>
                        </div>
                        <div className="post mb-5">
                            <div className="header">
                                <div className="left">
                                    <i className="fab fa-html5 fa-2x"></i>
                                    <span>HTML5<br />
                                                    Rigoberto</span>
                                </div>
                                <div className="right">
                                    <i className="fas fa-ellipsis-v"></i>
                                </div>
                            </div>
                            <div className="image">
                                <img src="https://picsum.photos/900/450?grayscale" />
                            </div>
                            <div className="inter">
                                <div className="left">
                                    <i className="far fa-heart"></i>
                                    <i className="far fa-comment"></i>
                                    <i className="far fa-paper-plane"></i>
                                </div>
                                <div className="right">
                                    <i className="far fa-flag"></i>
                                </div>
                            </div>
                            <div className="comments">
                                <p>Liked by <b>4GeeksAcademy, html5, Web</b> and <b>100,000 others</b></p>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi, quo quos, culpa voluptates
                                tempore
                                commodi autem, ipsa recusandae facere inventore repellendus officia magnam? Exercitationem error
                                quaerat
                        ex quod, soluta rerum!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default InstagramFeed;