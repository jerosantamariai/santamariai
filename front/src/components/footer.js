import React from 'react';
import { Link } from 'react-router-dom';

const Footer = props => {
    return (
        <>
            <footer className="bg-black">
                <div className="container">
                    <div className="row text-center d-flex justify-content-center pt-4 my-2">
                        <div className="col-md-2 my-2">
                            <h6 className="text-uppercase font-weight-bold noDecoration">
                                <Link className="stdbtn" to="#!">About us</Link>
                            </h6>
                        </div>
                        <div className="col-md-2 my-2">
                            <h6 className="text-uppercase font-weight-bold noDecoration">
                                <Link className="stdbtn" to="#!">Products</Link>
                            </h6>
                        </div>
                        <div className="col-md-2 my-2">
                            <h6 className="text-uppercase font-weight-bold noDecoration">
                                <Link className="stdbtn" to="#!">Awards</Link>
                            </h6>
                        </div>
                        <div className="col-md-2 my-2">
                            <h6 className="text-uppercase font-weight-bold noDecoration">
                                <Link className="stdbtn" to="#!">Help</Link>
                            </h6>
                        </div>
                        <div className="col-md-2 my-2">
                            <h6 className="text-uppercase font-weight-bold noDecoration">
                                <Link className="stdbtn" to="#!">Contact</Link>
                            </h6>
                        </div>
                    </div>
                    <hr className="hrsolid" />
                    <div className="row d-flex text-center justify-content-center mb-md-0 mb-4">
                        <div className="col-md-8 col-12 my-2">
                            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                            accusantium doloremque laudantium, totam rem
                            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
                            explicabo.
                            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.</p>
                        </div>
                    </div>
                    <hr className="hrsolid" />
                    <div className="row py-2">
                        <div className="col-md-12">
                            <div className="mb-4 d-flex justify-content-center">
                                <a className="stdbtn" href="http://www.facebook.com" target="_blank">
                                    <i className="fab fa-facebook-f fa-lg white-text mr-5"> </i>
                                </a>
                                <a className="stdbtn" href="http://www.twitter.com" target="_blank">
                                    <i className="fab fa-twitter fa-lg white-text mr-5"> </i>
                                </a>
                                <a className="stdbtn" href="http://www.linkedin.com" target="_blank">
                                    <i className="fab fa-linkedin-in fa-lg white-text mr-5"> </i>
                                </a>
                                <a className="stdbtn" href="http://www.github.com" target="_blank">
                                    <i className="fab fa-github fa-lg white-text mr-5"> </i>
                                </a>
                                <a className="stdbtn" href="http://www.instagram.com" target="_blank">
                                    <i className="fab fa-instagram fa-lg white-text mr-5"> </i>
                                </a>
                                <a className="stdbtn" href="http://www.pinterest.com" target="_blank">
                                    <i className="fab fa-pinterest fa-lg white-text"> </i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    );
}

export default Footer;