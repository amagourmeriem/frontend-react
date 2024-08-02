import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { request } from "../../helpers/axios_helper"; // Assurez-vous d'importer le fichier axios correctement

const DemandeList = ({ userId }) => {
    const [demandes, setDemandes] = useState([]);
    const location = useLocation();
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (location.state && location.state.successMessage) {
            setSuccessMessage(location.state.successMessage);
        }
        request('get', `/demandes/user/${userId}`)
            .then(response => setDemandes(response.data))
            .catch(error => console.error('Error fetching user demandes:', error));
    }, [userId, location.state]);

    return (
        <div>
            <h2>Mes Demandes</h2>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <ul>
                {demandes.map(demande => (
                    <li key={demande.id}>
                        {demande.details} - Status: {demande.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DemandeList;
