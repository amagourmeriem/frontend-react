import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AffectationForm = ({ show, handleClose, demandeId, refreshDemandes }) => {
    const [formData, setFormData] = useState({
        dateEntrée: '',
        observations: '',
        enginId: ''
    });
    const [demandeDetails, setDemandeDetails] = useState({});
    const [engins, setEngins] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isAffectee, setIsAffectee] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Récupère les détails de la demande
                const demandeResponse = await axios.get(`http://localhost:8085/demandes/${demandeId}`);
                setDemandeDetails(demandeResponse.data);

                // Récupère les engins disponibles
                const enginsResponse = await axios.get('http://localhost:8085/engins/disponibles');
                setEngins(enginsResponse.data);

                // Récupère les catégories
                const categoriesResponse = await axios.get('http://localhost:8085/categories_engins');
                setCategories(categoriesResponse.data);

                // Réinitialise les données du formulaire
                setFormData({
                    dateEntrée: '',
                    observations: '',
                    enginId: ''
                });

                // Réinitialise l'état de l'affectation
                setIsAffectee(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [demandeId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAffectation(); // Appelle directement la fonction d'affectation
    };

    const handleAffectation = async () => {
        try {
            await axios.post('http://localhost:8085/affectations', {
                demandeId: demandeId,
                enginId: formData.enginId,
                dateEntree: formData.dateEntrée,
                observationEntree: formData.observations,
            });

            // Supprimer la demande du frontend
            if (refreshDemandes) {
                refreshDemandes((prevDemandes) => prevDemandes.map(demande =>
                    demande.id === demandeId ? { ...demande, affecte: true } : demande
                ));
            }

            setIsAffectee(true); // Met à jour l'état du bouton
            setTimeout(() => {
                navigate('/affectations'); // Redirige vers la liste des affectations
            }, 300); // Redirige après 1 seconde

            handleClose();
        } catch (error) {
            console.error('Error during affectation:', error);
        }
    };


    const handleConfirm = () => {
        // Confirmer et effectuer l'affectation
        handleAffectation();
        setShowConfirm(false);
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter une Affectation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="dateSortie">
                            <Form.Label>Date de Sortie</Form.Label>
                            <Form.Control
                                type="text"
                                value={demandeDetails.dateSortie ? new Date(demandeDetails.dateSortie).toLocaleDateString() : 'Non spécifié'}
                                readOnly
                            />
                        </Form.Group>

                        <Form.Group controlId="categorie">
                            <Form.Label>Catégorie</Form.Label>
                            <Form.Control
                                type="text"
                                value={demandeDetails.categorieEnginId ? categories.find(cat => cat.id === demandeDetails.categorieEnginId)?.nom : 'Non spécifié'}
                                readOnly
                            />
                        </Form.Group>

                        <Form.Group controlId="dateEntrée">
                            <Form.Label>Date d'Entrée</Form.Label>
                            <Form.Control
                                type="date"
                                name="dateEntrée"
                                value={formData.dateEntrée}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="observations">
                            <Form.Label>Observations</Form.Label>
                            <Form.Control
                                type="text"
                                name="observations"
                                value={formData.observations}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="enginId">
                            <Form.Label>Engin</Form.Label>
                            <Form.Control
                                as="select"
                                name="enginId"
                                value={formData.enginId}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Sélectionnez un engin</option>
                                {engins.map(engin => (
                                    <option key={engin.id} value={engin.id}>
                                        {engin.categorieEnginNom} - {engin.matricule}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Fermer</Button>
                    {!isAffectee && (
                        <Button variant="primary" onClick={handleSubmit}>
                            Enregistrer
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>

            {/* Modal de confirmation */}
            <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Êtes-vous sûr de vouloir affecter cet engin et supprimer la demande ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirm(false)}>Annuler</Button>
                    <Button variant="danger" onClick={handleConfirm}>Confirmer</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AffectationForm;
