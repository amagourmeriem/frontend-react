import React, { useState, useEffect } from 'react';
import { request } from "../../helpers/axios_helper"; // Assurez-vous d'importer le fichier axios correctement


const DemandeView = () => {
    const [demandes, setDemandes] = useState([]);

    useEffect(() => {
        request('get', '/demandes')
            .then(response => setDemandes(response.data))
            .catch(error => console.error('Error fetching demandes:', error));
    }, []);

    const handleStatusChange = (id, newStatus) => {
        request('put', `/demandes/update/${id}`, { status: newStatus })
            .then(response => {
                setDemandes(demandes.map(demande =>
                    demande.id === id ? { ...demande, status: response.data.status } : demande
                ));
            })
            .catch(error => console.error('Error updating demande status:', error));
    };

    return (
        <div>
            <h2>Demandes</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Numéro BCI</th>
                    <th>Département</th>
                    <th>Demandeur</th>
                    <th>Date de Sortie</th>
                    <th>Shift</th>
                    <th>Saule</th>
                    <th>Observations</th>
                    <th>Engin</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {demandes.map(demande => (
                    <tr key={demande.id}>
                        <td>{demande.id}</td>
                        <td>{demande.numeroBCI}</td>
                        <td>{demande.nomDepartement}</td>
                        <td>{demande.nomDemandeur}</td>
                        <td>{new Date(demande.dateSortie).toLocaleDateString()}</td>
                        <td>{demande.shift}</td>
                        <td>{demande.saul}</td>
                        <td>{demande.observations}</td>
                        <td>{demande.engin ? demande.engin.nom : 'N/A'}</td>
                        <td>
                            <button
                                style={{ backgroundColor: demande.status === 'accepted' ? 'green' : 'red' }}
                                onClick={() => handleStatusChange(demande.id, demande.status === 'accepted' ? 'refused' : 'accepted')}
                            >
                                {demande.status === 'accepted' ? 'Accepter' : 'Refuser'}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default DemandeView;
