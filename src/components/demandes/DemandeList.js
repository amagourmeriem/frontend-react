import React, { useState, useEffect } from 'react';
import { request } from "../../helpers/axios_helper";
import { Table, Button, Form, Container, Row, Col } from 'react-bootstrap';

const DemandeList = () => {
    const [demandes, setDemandes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategorie, setSelectedCategorie] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Nombre d'éléments par page

    useEffect(() => {
        const userId = 1; // Remplacez par l'ID de l'utilisateur connecté

        // Récupération des demandes de l'utilisateur
        request('get', `/demandes/user/${userId}`)
            .then(response => setDemandes(response.data))
            .catch(error => console.error('Error fetching user demandes:', error));

        // Récupération des catégories disponibles
        request('get', '/categories')
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories:', error));
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
        <Container>
            <h2 className="my-4">Mes Demandes</h2>

            <Form>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Control
                            type="text"
                            placeholder="Rechercher..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </Col>
                </Row>
            </Form>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Numéro BCI</th>
                    <th>Département</th>
                    <th>Date de Sortie</th>
                    <th>Shift</th>
                    <th>Observations</th>
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
                        <td>{demande.status}</td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {/* Pagination */}
            <div className="d-flex justify-content-center my-3">
                {[...Array(totalPages).keys()].map(number => (
                    <Button
                        key={number}
                        onClick={() => paginate(number + 1)}
                        className={`mx-1 ${currentPage === number + 1 ? 'btn-primary' : 'btn-secondary'}`}
                    >
                        {number + 1}
                    </Button>
                ))}
            </div>
        </Container>
    );
};

export default DemandeList;
