import React, { useState, useEffect } from 'react';
import { getAuthToken, request } from "../../helpers/axios_helper";
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AffectationForm from '../Affectation/AffectationForm';
import axios from "axios";

const DemandeView = () => {
    const [demandes, setDemandes] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [showAffectationModal, setShowAffectationModal] = useState(false);
    const [selectedDemande, setSelectedDemande] = useState(null);
    const [statusAction, setStatusAction] = useState('');
    const [demandesNonAffectees, setDemandesNonAffectees] = useState([]);
    const navigate = useNavigate();

    const fetchDemandes = async () => {
        try {
            const response = await axios.get("http://localhost:8085/demandes/non-affectees");
            setDemandes(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des demandes non affectées:", error);
        }
    };

    useEffect(() => {
        const fetchDemandes = async () => {
            try {
                const response = await axios.get("http://localhost:8085/demandes");
                setDemandes(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des demandes:", error);
            }
        };

        fetchDemandes();
    }, []);

    const fetchDemandesNonAffectees = () => {
        axios.get("http://localhost:8085/demandes/non-affectees")
            .then(response => {
                setDemandesNonAffectees(response.data);
            })
            .catch(error => console.error('Error fetching non-affectees:', error));
    };

    const handleDelete = (id) => {
        setSelectedDemande(id);
        setShowConfirm(true);
    };


    const handleStatusChange = (id) => {
        setSelectedDemande(id);
        setShowStatusModal(true);
    };

    const handleStatusSelect = (e) => {
        setStatusAction(e.target.value);
    };

    const confirmStatusChange = async () => {
        if (selectedDemande && statusAction) {
            try {
                const statusUpdateRequest = { status: statusAction };

                await axios.patch(`http://localhost:8085/demandes/${selectedDemande}/status`, statusUpdateRequest, {
                    headers: {
                        'Authorization': `Bearer ${getAuthToken()}`,
                        'Content-Type': 'application/json'
                    }
                });

                fetchDemandes(); // Met à jour la liste des demandes
                setShowStatusModal(false);
                setSelectedDemande(null);
                setStatusAction('');
            } catch (error) {
                console.error('Error updating demande status:', error.response || error.message);
            }
        }
    };

    const openAffectationModal = (id) => {
        setSelectedDemande(id);
        setShowAffectationModal(true);
    };

    const refreshDemandes = () => {
        fetchDemandes(); // Met à jour la liste des demandes
    };

    return (
        <div className="container mt-5">
            <h1>Liste des Demandes</h1>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Date de Sortie</th>
                    <th>Département</th>
                    <th>Catégorie</th>
                    <th>Demandeur</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {demandes.map(demande => (
                    <tr key={demande.id}>
                        <td>{demande.id}</td>
                        <td>{new Date(demande.dateSortie).toLocaleDateString()}</td>
                        <td>{demande.nomDepartement}</td>
                        <td>{demande.categorieEnginNom}</td>
                        <td>{demande.nomDemandeur}</td>

                        <td>
                            {demande.affecte ? (
                                <button
                                    className="btn btn-success"
                                    disabled
                                    style={{
                                        backgroundColor: 'green',
                                        color: 'white',
                                        cursor: 'not-allowed'
                                    }}
                                >
                                    Affectée
                                </button>
                            ) : (
                                <button
                                    className="btn btn-primary"
                                    onClick={() => openAffectationModal(demande.id)}
                                >
                                    Ajouter une Affectation
                                </button>
                            )}

                            {demande.status === 'PENDING' ? (
                                <button
                                    className="btn btn-warning ms-2"
                                    onClick={() => handleStatusChange(demande.id)}
                                >
                                    Changer le Statut
                                </button>
                            ) : demande.status === 'ACCEPTED' ? (
                                <button
                                    className="btn btn-success ms-2"
                                    disabled
                                >
                                    Accepté
                                </button>
                            ) : demande.status === 'REJECTED' ? (
                                <button
                                    className="btn btn-danger ms-2"
                                    disabled
                                >
                                    Refusé
                                </button>
                            ) : null}
                        </td>

                    </tr>
                ))}
                </tbody>
            </table>

            {/* Modal de changement de statut */}
            <Modal show={showStatusModal} onHide={() => setShowStatusModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Changer le Statut</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label className="form-label">Choisissez le nouveau statut :</label>
                        <select
                            className="form-select"
                            value={statusAction}
                            onChange={handleStatusSelect}
                        >
                            <option value="" disabled>En attente</option>
                            <option value="ACCEPTED">Accepté</option>
                            <option value="REJECTED">Refusé</option>
                        </select>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowStatusModal(false)}>Annuler</Button>
                    <Button variant="primary" onClick={confirmStatusChange}>Confirmer</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal de formulaire d'affectation */}
            <AffectationForm
                show={showAffectationModal}
                handleClose={() => setShowAffectationModal(false)}
                demandeId={selectedDemande}
                refreshDemandes={refreshDemandes}
            />
        </div>
    );
};

export default DemandeView;
