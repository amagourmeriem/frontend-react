import * as React from 'react';
import classNames from 'classnames';
import './LoginForm.css'; // Importez votre fichier CSS personnalisé

export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: "login",
            firstName: "",
            lastName: "",
            login: "",
            password: "",
            errorMessage: "", // Pour stocker les messages d'erreur
            onLogin: props.onLogin,
            onRegister: props.onRegister
        };
    }

    onChangeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({ [name]: value, errorMessage: "" }); // Réinitialiser les messages d'erreur lors du changement de valeur
    };

    onSubmitLogin = (e) => {
        e.preventDefault();

        // Validation des champs de connexion
        if (!this.validateEmail(this.state.login) || !this.validatePassword(this.state.password)) {
            this.setState({ errorMessage: "Veuillez entrer une adresse email et un mot de passe valides." });
            return;
        }

        this.state.onLogin(e, this.state.login, this.state.password);
    };

    onSubmitRegister = (e) => {
        e.preventDefault();

        // Validation des champs d'inscription
        if (!this.state.firstName || !this.state.lastName || !this.validateEmail(this.state.login) || !this.validatePassword(this.state.password)) {
            this.setState({ errorMessage: "Tous les champs doivent être remplis avec des valeurs valides." });
            return;
        }

        this.state.onRegister(e, this.state.firstName, this.state.lastName, this.state.login, this.state.password);
    };

    // Fonction de validation de l'email avec regex
    validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Fonction de validation du mot de passe avec regex (au moins 6 caractères)
    validatePassword = (password) => {
        const passwordRegex = /^.{6,}$/;
        return passwordRegex.test(password);
    };

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button
                                className={classNames("nav-link", this.state.active === "login" ? "active" : "")}
                                id="tab-login"
                                onClick={() => this.setState({ active: "login", errorMessage: "" })}
                            >
                                Connexion
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={classNames("nav-link", this.state.active === "register" ? "active" : "")}
                                id="tab-register"
                                onClick={() => this.setState({ active: "register", errorMessage: "" })}
                            >
                                Inscription
                            </button>
                        </li>
                    </ul>

                    {this.state.errorMessage && <div className="alert alert-danger">{this.state.errorMessage}</div>} {/* Affichage des messages d'erreur */}

                    <div className="tab-content">
                        <div
                            className={classNames("tab-pane", "fade", this.state.active === "login" ? "show active" : "")}
                            id="pills-login"
                        >
                            <form onSubmit={this.onSubmitLogin}>

                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="loginName">Adresse email</label>
                                    <input
                                        type="email"
                                        id="loginName"
                                        name="login"
                                        className="form-control"
                                        onChange={this.onChangeHandler}
                                        required
                                    />
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="loginPassword">Mot de passe</label>
                                    <input
                                        type="password"
                                        id="loginPassword"
                                        name="password"
                                        className="form-control"
                                        onChange={this.onChangeHandler}
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn btn-orange btn-block mb-4">Se connecter</button>

                            </form>
                        </div>
                        <div
                            className={classNames("tab-pane", "fade", this.state.active === "register" ? "show active" : "")}
                            id="pills-register"
                        >
                            <form onSubmit={this.onSubmitRegister}>

                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="firstName">Prénom</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        className="form-control"
                                        onChange={this.onChangeHandler}
                                        required
                                    />
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="lastName">Nom</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        className="form-control"
                                        onChange={this.onChangeHandler}
                                        required
                                    />
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="login">Adresse email</label>
                                    <input
                                        type="email"
                                        id="login"
                                        name="login"
                                        className="form-control"
                                        onChange={this.onChangeHandler}
                                        required
                                    />
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="registerPassword">Mot de passe</label>
                                    <input
                                        type="password"
                                        id="registerPassword"
                                        name="password"
                                        className="form-control"
                                        onChange={this.onChangeHandler}
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn btn-orange btn-block mb-3">S'inscrire</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}
