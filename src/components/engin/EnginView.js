
import React, { useEffect, useState } from 'react';
import {getAuthToken, request} from '../../helpers/axios_helper';

const EnginView = () => {
    const [data, setData] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null);

    const fetchData = async () => {
        try {
            const token = getAuthToken();
            if (!token) {
                console.error('Token is missing');
                return;
            }
            console.log('Fetched token in EnginView:', token);
            const response = await request('GET', '/engins', {});
            setData(response.data);
            console.log('Fetched data:', response.data);
        } catch (error) {
            console.error('Error fetching data in EnginView:', error);
            console.error('Error details:', error.response);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDetailsClick = (enginId) => {
        setExpandedRow(expandedRow === enginId ? null : enginId);
    };

    return (
        <div className="text-center">
            <h2>Liste des Engins</h2>
            <table className="table table-bordered table-hover shadow">
                <thead>
                <tr className="text-center">
                    <th>Code</th>
                    <th>Matricule</th>
                    <th>Compteur Horaire</th>
                    <th>Catégorie</th>
                    <th colSpan="3">Actions</th>
                </tr>
                </thead>
                <tbody className="text-center">
                {data.map((engin) => (
                    <>
                        <tr key={engin.id}>
                            <td>{engin.code}</td>
                            <td>{engin.matricule}</td>
                            <td>{engin.compteurHoraire}</td>
                            <td>{engin.categorieEngin ? engin.categorieEngin.nom : 'N/A'}</td>
                            {/* Affichage des données pour débogage */}
                            {console.log('Engin:', engin, 'CategorieEngin:', engin.categorieEngin)}
                            <td>
                                <td className="mx2">
                                    <button onClick={() => handleDetailsClick(engin.id)}
                                            className="btn btn-info">Détails
                                    </button>
                                </td>
                                <td className="mx2">
                                    <button className="btn btn-warning">Modifier</button>
                                </td>
                                <td className="mx2">
                                    <button className="btn btn-danger">Supprimer</button>
                                </td>
                            </td>
                        </tr>
                        {expandedRow === engin.id && (
                            <tr>
                            <td colSpan="5">
                                    <div>
                                        <p><strong>État Frein :</strong> {engin.etatFrein}</p>
                                        <p><strong>État Batterie :</strong> {engin.etatBatterie}</p>
                                        <p><strong>État Éclairage :</strong> {engin.etatEclairage}</p>
                                        <p><strong>État Essuie-Glace :</strong> {engin.etatEssuieGlace}</p>
                                        <p><strong>État Tracteur :</strong> {engin.etatTracteur}</p>
                                        <p><strong>État Pneumatique :</strong> {engin.etatPneumatique}</p>
                                        <p><strong>État Transmission :</strong> {engin.etatTransmission}</p>
                                        <p><strong>État Frein Service :</strong> {engin.etatFreinService}</p>
                                        <p><strong>État Frein Parking :</strong> {engin.etatFreinParking}</p>
                                        <p><strong>État Klaxon :</strong> {engin.etatKlaxon}</p>
                                        <p><strong>État Câblage :</strong> {engin.etatCablage}</p>
                                        <p><strong>État Vitesse :</strong> {engin.etatVitesse}</p>
                                        <p><strong>Observations Générales :</strong> {engin.observationsGenerales}</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </>
                ))}
                </tbody>
            </table>
        </div>
    );
};


export default EnginView;
