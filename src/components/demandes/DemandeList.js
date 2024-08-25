import React, { useState, useEffect } from 'react';
import { request } from "../../helpers/axios_helper";
import { Table, Button, Form, Container, Row, Col, Pagination, Alert } from 'react-bootstrap';
import './DemandeList.css'; // Importez votre fichier CSS personnalisé

const DemandeList = () => {
    const [demandes, setDemandes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategorie, setSelectedCategorie] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [notification, setNotification] = useState(null); // État pour les notifications

    useEffect(() => {
        const userId = 1; // Remplacez par l'ID de l'utilisateur connecté

        // Récupération des demandes de l'utilisateur
        request('get', `/demandes/user/${userId}`)
            .then(response => setDemandes(response.data))
            .catch(error => {
                console.error('Error fetching user demandes:', error);
                setNotification({ type: 'danger', message: 'Erreur lors de la récupération des demandes.' });
            });

        // Récupération des catégories disponibles
        request('get', '/categories')
            .then(response => setCategories(response.data))
            .catch(error => {
                console.error('Error fetching categories:', error);
                setNotification({ type: 'danger', message: 'Erreur lors de la récupération des catégories.' });
            });
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredDemandes = demandes.filter(demande =>
        demande.numeroBCI.toLowerCase().includes(searchTerm.toLowerCase()) ||
        demande.nomDepartement.toLowerCase().includes(searchTerm.toLowerCase()) ||
        demande.shift.toLowerCase().includes(searchTerm.toLowerCase()) ||
        demande.observations.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentDemandes = filteredDemandes.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredDemandes.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Container className="demande-list-container">
            <h2 className="my-4">Mes Demandes</h2>

            {/* Notification au niveau du titre */}
            {notification && (
                <Alert variant={notification.type} onClose={() => setNotification(null)} dismissible>
                    {notification.message}
                </Alert>
            )}

            <Form className="mb-4">
                <Row>
                    <Col md={6}>
                        <Form.Control
                            type="text"
                            placeholder="Rechercher..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="search-input"
                        />
                    </Col>
                </Row>
            </Form>

            <Table striped bordered hover className="custom-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Numéro BCI</th>
                    <th>Département</th>
                    <th>Date de Sortie</th>
                    <th>Shift</th>
                    <th>Observations</th>
                    <th>Catégorie</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {currentDemandes.map(demande => (
                    <tr key={demande.id}>
                        <td>{demande.id}</td>
                        <td>{demande.numeroBCI}</td>
                        <td>{demande.nomDepartement}</td>
                        <td>{new Date(demande.dateSortie).toLocaleDateString()}</td>
                        <td>{demande.shift}</td>
                        <td>{demande.observations}</td>
                        <td>{demande.categorieEnginNom}</td>
                        <td>{demande.status}</td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {/* Pagination */}
            <Pagination className="d-flex justify-content-center my-3">
                {[...Array(totalPages).keys()].map(number => (
                    <Pagination.Item
                        key={number}
                        active={number + 1 === currentPage}
                        onClick={() => paginate(number + 1)}
                        className={number + 1 === currentPage ? 'active-pagination' : ''}
                    >
                        {number + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </Container>
    );
};

export default DemandeList;
