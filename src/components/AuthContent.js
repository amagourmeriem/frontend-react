import * as React from 'react';
import { request } from '../helpers/axios_helper';
import EnginView from "./engin/EnginView";
import Home from "./Home";
import AddEngin from "./engin/AddEngin";
import {Route, Routes} from "react-router-dom";
import DemandeView from "./demandes/DemandeView";
import DemandeList from "./demandes/DemandeList";
import DemandeForm from "./demandes/DemandeForm"; // Import AddEngin

export default class AuthContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        request(
            "GET",
            "/messages",
            {}).then(
            (response) => {
                console.log('Réponse complète:', response);
                if (Array.isArray(response.data)) {
                    this.setState({data: response.data});
                } else {
                    console.error('Les données reçues ne sont pas un tableau');
                }
            }).catch(error => {
            console.error('Erreur de récupération des données:', error);
        });
    }

    render() {
        return (
            <div className="row justify-content-md-center">
                <Home/>
                <Routes>
                    <Route path="/add-engin" element={<AddEngin />} />
                    <Route path="/view-engins" element={<EnginView />} />
                    <Route path="/demandes" element={<DemandeView />} />
                    <Route path="/mes-demandes" element={<DemandeList />} />
                    <Route path="/envoyer-demande" element={<DemandeForm />} />
                </Routes>
            </div>
        );
    }
}
