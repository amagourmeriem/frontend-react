import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Pagination,  } from 'react-bootstrap';

const AffectationsList = () => {
    const [affectations, setAffectations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsPerPage] = useState(10); // Nombre d'affectations par page

    useEffect(() => {
        const fetchAffectations = async () => {
            try {
                const response = await axios.get('http://localhost:8085/affectations');
                console.log('Affectations:', response.data);
                setAffectations(response.data.map(affectation => ({
                    ...affectation,
                    dateAffectation: new Date().toLocaleDateString() // Ajout de la date actuelle
                })));
            } catch (error) {
                console.error('Error fetching affectations:', error);
            }
        };

        fetchAffectations();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };


    const filteredAffectations = affectations.filter(affectation =>
        affectation.enginCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        affectation.categorieEnginNom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastAffectation = currentPage * itemsPerPage;
    const indexOfFirstAffectation = indexOfLastAffectation - itemsPerPage;
    const currentAffectations = filteredAffectations.slice(indexOfFirstAffectation, indexOfLastAffectation);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const handleDelete = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette affectation ?')) {
            try {
                await axios.delete(`http://localhost:8085/affectations/${id}`);
                setAffectations(prevAffectations => prevAffectations.filter(affectation => affectation.id !== id));
            } catch (error) {
                console.error('Error deleting affectation:', error);
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2>Liste des Affectations</h2>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Date d'Affectation</th>
                    <th>Demande ID</th>
                    <th>ID Affectation</th>
                    <th>Date d'Entrée</th>
                    <th>Observations</th>
                    <th>Code Engin</th>
                    <th>Catégorie Engin</th> {/* Nouvelle colonne */}
                    <th>Actions</th> {/* Nouvelle colonne */}
                </tr>
                </thead>
                <tbody>
                {affectations.length > 0 ? (
                    affectations.map(affectation => (
                        <tr key={affectation.id}>
                            <td>{affectation.dateAffectation}</td>
                            <td>{affectation.demandeId || 'Non spécifié'}</td>
                            <td>{affectation.id}</td>
                            <td>{new Date(affectation.dateEntree).toLocaleDateString()}</td>
                            <td>{affectation.observationEntree || 'Non spécifié'}</td>
                            <td>{affectation.enginCode || 'Non spécifié'}</td>
                            <td>{affectation.categorieEnginNom || 'Non spécifié'}</td> {/* Affichage du nom de catégorie */}
                            <td>
                                <Button variant="danger" onClick={() => handleDelete(affectation.id)}>
                                    Supprimer
                                </Button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="8" className="text-center">Aucune affectation disponible</td>
                    </tr>
                )}
                </tbody>
            </Table>
            <Pagination>
                {Array.from({ length: Math.ceil(filteredAffectations.length / itemsPerPage) }, (_, i) => (
                    <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
                        {i + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </div>
    );
};

export default AffectationsList;
