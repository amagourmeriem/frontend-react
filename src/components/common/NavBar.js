import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ login, logout }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img
                        src="/images/logo.jpeg"
                        alt="Logo"
                        width="100"
                        height="70"
                        className="d-inline-block align-text-top"
                    />
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/engins">
                                Liste d'engins
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/add-engins">
                                Ajouter Engins
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/demandes">
                                Liste des demandes
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/add-demande">
                                Ajouter une demande
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={login}>
                                Se connecter
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={logout}>
                                Se déconnecter
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;