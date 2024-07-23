import * as React from 'react';
import { request } from '../helpers/axios_helper';
import EnginView from "./engin/EnginView";

export default class AuthContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [] // Initialiser comme un tableau vide
        }
    };


    componentDidMount() {
        request(
            "GET",
            "/messages",
            {}).then(
            (response) => {
                console.log('Réponse complète:', response); // Affichez la réponse complète dans la console
                if (Array.isArray(response.data)) {
                    this.setState({data: response.data});
                } else {
                    console.error('Les données reçues ne sont pas un tableau');
                }
            }).catch(error => {
            console.error('Erreur de récupération des données:', error);
        });
    };

    render() {
        return (
            <div className="row justify-content-md-center">

          <EnginView/>
            </div>
        );
    };
}
