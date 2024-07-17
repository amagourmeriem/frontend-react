import * as React from 'react';
import { request } from '../helpers/axios_helper';

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
                <div className="col-4">
                    <div className="card" style={{width: "18rem"}}>
                        <div className="card-body">
                            <h5 className="card-title">Backend response</h5>
                            <p className="card-text">Content:</p>
                            <ul>
                                {this.state.data && this.state.data
                                    .map((line) =>
                                        <li key={line}>{line}</li>
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}
