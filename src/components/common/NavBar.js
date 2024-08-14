import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = ({ login, logout }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    <img
                        src="/images/logo.jpeg"
                        alt="Logo"
                        width="100"
                        height="70"
                        className="d-inline-block align-text-top"
                    />
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink
                                className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}
                                to="/view-engins"
                            >
                                Liste d'engins
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}
                                to="/add-engin"
                            >
                                Ajouter Engin
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}
                                to="/categories-engins"
                            >
                                Catégories d'Engins
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}
                                to="/demandes"
                            >
                                Liste des demandes
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}
                                to="/envoyer-demande"
                            >
                                Ajouter une demande
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}
                                to="/mes-demandes"
                            >
                                Mes demandes
                            </NavLink>
                        </li>
                    </ul>
                    <div className="d-flex ms-auto">
                        <button className="btn btn-primary mx-2" onClick={login}>Login</button>
                        <button className="btn btn-secondary mx-2" onClick={logout}>Logout</button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;