import React from 'react';
import { Link } from 'react-router-dom';
import "../../../secondary-styles/instagram.css";

const Instagram = props => {
    return (
        <>
            <div className="subbar d-flex justify-content-between my-2 mx-5">
                <h1>Instagram</h1>
                <Link to="/proyectos"><div type="btn" className="btn btn-warning">Volver a Proyectos</div></Link>
            </div>
            <div className="instagram">
                <div class="top">
                    <nav class="navbar navbar-expand-lg navbar-light bg-light ">
                        <a class="navbar-brand" href="#"> <i class="fab fa-instagram"></i> Instagram</a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
                            <ul class="navbar-nav">
                                <button type="button" class="btn btn-success" data-toggle="modal" data-target="#createpost">Create a
                        New Post</button>
                                <div class="modal fade" id="createpost" tabindex="-1" role="dialog"
                                    aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">Add New Post</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <div class="form-group">
                                                    <label for="comment">Comment:</label>
                                                    <textarea class="form-control" rows="5" id="comment"></textarea>
                                                </div>
                                                <i class="fas fa-camera"></i>
                                                <i class="fas fa-map-marker-alt"></i>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-primary">Save changes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fas fa-cog"></i>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                        <a class="dropdown-item" href="#">Nothing to show</a>
                                    </div>
                                </li>
                            </ul>

                        </div>
                    </nav>
                    <div class="col">
                        <ul class="nav justify-content-center">
                            <li class="nav-item p-2">
                                <a class="nav-link active fas fas fa-th" href="#"></a>
                            </li>
                            <li class="nav-item p-2">
                                <a class="nav-link fas fa-square"
                                    href="./feed.html"></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="container">

                    <div class="row mb-2">
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/200/300" alt="pc" />
                        </div>
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/id/237/200/300" alt="pc" />
                        </div>
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/id/675/200/300" alt="pc" />
                        </div>
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/200/300?grayscale" alt="pc" />
                        </div>
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/200/300/?blur" alt="pc" />
                        </div>
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/id/100/200/300" alt="pc" />
                        </div>
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/200/300" alt="pc" />
                        </div>
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/id/237/200/300" alt="pc" />
                        </div>
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/id/675/200/300" alt="pc" />
                        </div>
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/200/300?grayscale" alt="pc" />
                        </div>
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/200/300/?blur" alt="pc" />
                        </div>
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/id/100/200/300" alt="pc" />
                        </div>
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/200/300" alt="pc" />
                        </div>
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/id/237/200/300" alt="pc" />
                        </div>
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/id/675/200/300" alt="pc" />
                        </div>
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/200/300?grayscale" alt="pc" />
                        </div>
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/200/300/?blur" alt="pc" />
                        </div>
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/id/100/200/300" alt="pc" />
                        </div>
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/200/300" alt="pc" />
                        </div>
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/id/237/200/300" alt="pc" />
                        </div>
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/id/675/200/300" alt="pc" />
                        </div>
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/200/300?grayscale" alt=" pc" />
                        </div>
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/200/300/?blur" alt="pc" />
                        </div>
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/id/100/200/300" alt="pc" />
                        </div>
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/200/300" alt="pc" />
                        </div>
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/id/237/200/300" alt="pc" />
                        </div>
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/id/675/200/300" alt="pc" />
                        </div>
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/200/300?grayscale" alt=" pc" />
                        </div>
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/200/300/?blur" alt="pc" />
                        </div>
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/id/100/200/300" alt="pc" />
                        </div>
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/200/300" alt="pc" />
                        </div>
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/id/237/200/300" alt="pc" />
                        </div>
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/id/675/200/300" alt="pc" />
                        </div>
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/200/300?grayscale" alt=" pc" />
                        </div>
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/200/300/?blur" alt="pc" />
                        </div>
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/id/100/200/300" alt="pc" />
                        </div>
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/200/300" alt="pc" />
                        </div>
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/id/237/200/300" alt="pc" />
                        </div>
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/id/675/200/300" alt="pc" />
                        </div>
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/200/300?grayscale" alt=" pc" />
                        </div>
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/200/300/?blur" alt="pc" />
                        </div>
                        <div class="col-xl-4 col-md-6 col-xs-12 my-2">
                            <img src="https://picsum.photos/id/100/200/300" alt="pc" />
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Instagram;