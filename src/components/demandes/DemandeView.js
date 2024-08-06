import React, { useState, useEffect } from 'react';
import { request } from "../../helpers/axios_helper";
import { FaTrashAlt } from "react-icons/fa";
import { Modal, Button } from 'react-bootstrap';
import axios from "axios";

const DemandeView = () => {
    const [demandes, setDemandes] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [selectedDemande, setSelectedDemande] = useState(null);
    const [statusAction, setStatusAction] = useState('');

    useEffect(() => {
        request('get', '/demandes')
            .then(response => setDemandes(response.data))
            .catch(error => console.error('Error fetching demandes:', error));
    }, []);

    const handleDelete = (id) => {
        setSelectedDemande(id);
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        if (selectedDemande) {
            request('delete', `/demandes/${selectedDemande}`)
                .then(() => {
                    setDemandes(demandes.filter(demande => demande.id !== selectedDemande));
                    setShowConfirm(false);
                    setSelectedDemande(null);
                })
                .catch(error => console.error('Error deleting demande:', error));
        }
    };

    const handleStatusChange = (id) => {
        setSelectedDemande(id);
        setShowStatusModal(true);
    };

    const handleStatusSubmit = (action) => {
        if (selectedDemande) {
            request('put', `/demandes/${selectedDemande}`, { status: action.toUpperCase() })
                .then(response => {
                    setDemandes(demandes.map(demande =>
                        demande.id === selectedDemande ? { ...demande, status: response.data.status } : demande
                    ));
                    setShowStatusModal(false);
                    setSelectedDemande(null);
                })
                .catch(error => console.error('Error updating demande status:', error));
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Demandes</h2>
            <table className="table table-bordered table-hover shadow">
                <thead className="thead-light">
                <tr className="text-center">
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
                <tbody className="text-center">
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
                            <Button
                                variant="danger"
                                className="mx-1"
                                onClick={() => handleDelete(demande.id)}
                            >
                                <FaTrashAlt />
                            </Button>
                            <Button
                                variant="secondary"
                                className="mx-1"
                                onClick={() => handleStatusChange(demande.id)}
                            >
                                Change Status
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Confirmation Modal for Delete */}
            <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this demande?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirm(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Status Action Modal */}
            <Modal show={showStatusModal} onHide={() => setShowStatusModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button
                        variant="success"
                        className="mx-2"
                        onClick={() => handleStatusSubmit('accepted')}
                    >
                        Accept
                    </Button>
                    <Button
                        variant="danger"
                        className="mx-2"
                        onClick={() => handleStatusSubmit('refused')}
                    >
                        Refuse
                    </Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowStatusModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DemandeView;
