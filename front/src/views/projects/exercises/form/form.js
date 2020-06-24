import React from 'react';
import { Link } from 'react-router-dom';

const Form = props => {
    return (
        <>
            <div className="subbar d-flex justify-content-between my-2 mx-5">
                <h1>Formulario</h1>
                <Link to="/proyectos"><div type="btn" className="btn btn-warning">Volver a Proyectos</div></Link>
            </div>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col">
                        <form id="formContainer">
                            <div className="card">
                                <div className="card-header">
                                    <h2><b>Payment form example</b></h2>
                                </div>
                                <div className="card-body">
                                    <div className="alert alert-danger " role="alert">
                                        Some fields are missing
                            </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-5">
                                            <label for="Card">Card #</label>
                                            <input type="password" name="Card" className="form-control" id="Card"
                                                placeholder="XXXXXX" />
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label for="CVC">CVC</label>
                                            <input type="number" name="CVC" className="form-control" id="" placeholder="0000000" />
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label for="Amount">Amount</label>
                                            <input type="number" name="Amount" className="form-control" id="" placeholder="Amount" />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label for="First-name">First name</label>
                                            <input type="text" name="firstName" className="form-control" id="" />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label for="Last-name">Last name</label>
                                            <input type="text" name="lastName" className="form-control" id="" />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label for="City">City</label>
                                            <input type="text" name="City" className="form-control" id="" />
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label for="inputState">State</label>
                                            <select id="inputState" name="inputState" className="form-control">
                                                <option value="">Choose</option>
                                                <option>Región Metropolitana</option>
                                                <option>Primera Región</option>
                                                <option>Segunda Región</option>
                                                <option>Tercera Región</option>
                                                <option>Cuarta Región</option>
                                                <option>Otra Región</option>

                                            </select>
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label for="Postal-code">Postal code</label>
                                            <input type="number" name="postalCode" className="form-control" id="" />
                                        </div>
                                    </div>

                                    <div className="form-row d-flex justify-content-center">
                                        <div className="form-group col-md-3">
                                            <label for="We-accept" name="weAcept" className="form-label" value="1">We
                                        accept:</label>
                                            <div className="form-group bg-secondary p-2 rounded">
                                                <input type="radio" name="" id="" /> <i className="fab fa-cc-visa px-2"></i>
                                                <input type="radio" name="" id="" /> <i className="fab fa-cc-diners-club px-2"></i>
                                                <input type="radio" name="" id="" /> <i className="fab fa-cc-mastercard px-2"></i>
                                                <input type="radio" name="" id="" /> <i className="fab fa-cc-amex px-2"></i>
                                            </div>
                                        </div>
                                        <div className="form-group col-md-6 offset-md-3">
                                            <label for="Messege">Messege</label>
                                            <textarea name="Messege" id="" cols="" rows="4" className="form-control"></textarea>
                                            <small id="passwordHelpBlock" className="form-text text-muted">
                                                Add any notes here.
                                    </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer bg-secondary text-muted d-flex justify-content-end">
                                <button onclick="myFunction()" type="button" className="btn btn-dark m-2">Cancel</button>
                                <button type="submit" className="btn btn-primary m-2">Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Form;