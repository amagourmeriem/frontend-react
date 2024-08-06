import React, { useState, useEffect } from 'react';
import { request } from "../../helpers/axios_helper"; // Assurez-vous que le chemin est correct
import { Table, Button, Form, Row, Col, Container } from 'react-bootstrap';

const DemandeList = () => {
    const [demandes, setDemandes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategorie, setSelectedCategorie] = useState('');
    const [formData, setFormData] = useState({
        numeroBCI: '',
        nomDepartement: '',
        dateSortie: '',
        shift: '',
        observations: '',
        status: 'PENDING'
    });

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        request('post', '/demandes', { ...formData, categorieEngin: { id: selectedCategorie } })
            .then(response => {
                setDemandes([...demandes, response.data]);
                setFormData({
                    numeroBCI: '',
                    nomDepartement: '',
                    dateSortie: '',
                    shift: '',
                    observations: '',
                    status: 'PENDING'
                });
                setSelectedCategorie('');
            })
            .catch(error => console.error('Error submitting demande:', error));
    };

    return (
        <Container>
            <h2 className="my-4">Mes Demandes</h2>
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
                {demandes.map(demande => (
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
        </Container>
    );
};

export default DemandeList;
