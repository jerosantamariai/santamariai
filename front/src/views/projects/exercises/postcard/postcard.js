import React from 'react';
import '../postcard/postcard.css';
import { Link } from 'react-router-dom';

const PostCard = props => {
    return (
        <>
            <div className="subbar d-flex justify-content-between my-2 mx-5">
                <h1>Postal</h1>
                <Link to="/proyectos"><div type="btn" className="btn btn-warning">Volver a Proyectos</div></Link>
            </div>
            <div className="instagram-border">
                <div className="header">
                    <h1>
                        My Postcard
                    </h1>
                    <span className="img">
                        <img src="http://assets.breatheco.de/apis/img/icon/4geeks.png" alt="logo" />
                    </span>
                </div>
                <div className="center">
                    <div className="left">
                        <p>
                            Look how awesome! This is a postcard that I created using HTML5 and CSS3 during my 4Geks Academy
                    Course!<br /><br />This is cool, can't wait to start doing more stuff!
                </p>
                    </div>
                    <div className="right">
                        <table className="inputs">
                            <tr><td>Some Name<i className="fa fa-thumbs-up"></i></td></tr>
                            <tr><td>Some Email<i className="fa fa-thumbs-up"></i></td></tr>
                            <tr><td>Some Comment</td></tr>
                        </table>
                    </div>
                </div>
                <div className="bottom">
                    <button>Send My Postcard</button>
                </div>

            </div >
        </>
    );
}

export default PostCard;