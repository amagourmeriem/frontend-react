import React, { useEffect, useState } from 'react';
import { getAuthToken, request } from '../../helpers/axios_helper';
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

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
            const response = await request('GET', '/engins', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
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

    const handleDelete = async (id) => {
        try {
            const token = getAuthToken();
            if (!token) {
                console.error('Token is missing');
                return;
            }
            await axios.delete(`http://localhost:8085/engins/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchData();
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Unauthorized: Please check your authentication token.');
            } else {
                console.error('Error deleting engin:', error);
            }
        }
    };

    const handleDetailsClick = (enginId) => {
        setExpandedRow(expandedRow === enginId ? null : enginId);
    };

    return (
        <div className="text-center">
            <h2>Liste des Engins</h2>
            <table className="table table-bordered table-hover shadow">
                <thead>
                <tr className="text-center">
                    <th>Image</th>
                    <th>Code</th>
                    <th>Matricule</th>
                    <th>Compteur Horaire</th>
                    <th>Catégorie</th>
                    <th colSpan="3">Actions</th>
                </tr>
                </thead>
                <tbody className="text-center">
                {data.map((engin) => (
                    <React.Fragment key={engin.id}>
                        <tr>
                            <td>
                                {engin.image ? (
                                    <img
                                        src={`http://localhost:8085/engins/uploads/${engin.image}`}
                                        alt="Engin"
                                        style={{ width: '100px', height: '100px' }}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'default_image_path.jpg';
                                        }}
                                    />
                                ) : (
                                    <span>No Image</span>
                                )}
                            </td>
                            <td>{engin.code}</td>
                            <td>{engin.matricule}</td>
                            <td>{engin.compteurHoraire}</td>
                            <td>{engin.categorieEnginNom}</td>
                            <td className="mx-2">
                                <Link to={`/engin-details/${engin.id}`} className="btn btn-info">
                                    <FaEye />
                                </Link>
                            </td>
                            <td className="mx-2">
                                <Link to={`/edit-engin/${engin.id}`} className="btn btn-warning">
                                    <FaEdit />
                                </Link>
                            </td>
                            <td className="mx-2">
                                <button className="btn btn-danger" onClick={() => handleDelete(engin.id)}>
                                    <FaTrashAlt />
                                </button>
                            </td>
                        </tr>
                        {expandedRow === engin.id && (
                            <tr>
                                <td colSpan="8">
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
                    </React.Fragment>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default EnginView;
