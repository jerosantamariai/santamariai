import React from 'react';
import { Link } from 'react-router-dom';

const Footer = props => {
    return (
        <>
            <footer className="generalbg">
                <div className="container">
                    <div className="row text-center d-flex justify-content-center pt-5 mb-3">
                        <div className="col-md-2 mb-3">
                            <h6 className="text-uppercase font-weight-bold">
                                <Link to="#!">About us</Link>
                            </h6>
                        </div>
                        <div className="col-md-2 mb-3">
                            <h6 className="text-uppercase font-weight-bold">
                                <Link to="#!">Products</Link>
                            </h6>
                        </div>
                        <div className="col-md-2 mb-3">
                            <h6 className="text-uppercase font-weight-bold">
                                <Link to="#!">Awards</Link>
                            </h6>
                        </div>
                        <div className="col-md-2 mb-3">
                            <h6 className="text-uppercase font-weight-bold">
                                <Link to="#!">Help</Link>
                            </h6>
                        </div>
                        <div className="col-md-2 mb-3">
                            <h6 className="text-uppercase font-weight-bold">
                                <Link to="#!">Contact</Link>
                            </h6>
                        </div>
                    </div>
                    <hr className="rgba-white-light" />
                    <div className="row d-flex text-center justify-content-center mb-md-0 mb-4">
                        <div className="col-md-8 col-12 mt-5">
                            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                            accusantium doloremque laudantium, totam rem
                            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
                            explicabo.
                            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.</p>
                        </div>
                    </div>
                    <hr className="clearfix d-md-none rgba-white-light" />
                    <div className="row pb-3">
                        <div className="col-md-12">
                            <div className="mb-5 flex-center">
                                <Link className="fb-ic">
                                    <i className="fab fa-facebook-f fa-lg white-text mr-4"> </i>
                                </Link>
                                <Link className="tw-ic">
                                    <i className="fab fa-twitter fa-lg white-text mr-4"> </i>
                                </Link>
                                <Link className="gplus-ic">
                                    <i className="fab fa-google-plus-g fa-lg white-text mr-4"> </i>
                                </Link>
                                <Link className="li-ic">
                                    <i className="fab fa-linkedin-in fa-lg white-text mr-4"> </i>
                                </Link>
                                <Link className="ins-ic">
                                    <i className="fab fa-instagram fa-lg white-text mr-4"> </i>
                                </Link>
                                <Link className="pin-ic">
                                    <i className="fab fa-pinterest fa-lg white-text"> </i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright text-center py-3">© 2020 Copyright:
                    <Link to="https://mdbootstrap.com/"> MDBootstrap.com</Link>
                </div>
            </footer>

        </>
    );
}

export default Footer;