import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { request } from "../../helpers/axios_helper"; // Assurez-vous d'importer le fichier axios correctement

const DemandeForm = ({ userId }) => {
    const [formData, setFormData] = useState({
        numeroBCI: '',
        nomDepartement: '',
        nomDemandeur: '',
        categorieEngin: '',
        dateSortie: '',
        shift: '',
        saul: '',
        observations: '',
        engin: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        request('post', '/demandes', { ...formData, userId })
            .then(() => {
                navigate('/mes-demandes', { state: { successMessage: 'Demande envoyée avec succès!' } });
            })
            .catch(error => console.error('Error submitting demande:', error));
    };

    return (
        <div>
            <h2>Soumettre une Demande</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Numéro BCI</label>
                    <input type="text" name="numeroBCI" value={formData.numeroBCI} onChange={handleChange} required />
                </div>
                <div>
                    <label>Nom Département</label>
                    <input type="text" name="nomDepartement" value={formData.nomDepartement} onChange={handleChange} required />
                </div>
                <div>
                    <label>Nom Demandeur</label>
                    <input type="text" name="nomDemandeur" value={formData.nomDemandeur} onChange={handleChange} required />
                </div>
                <div>
                    <label>Catégorie Engin</label>
                    <input type="text" name="categorieEngin" value={formData.categorieEngin} onChange={handleChange} required />
                </div>
                <div>
                    <label>Date de Sortie</label>
                    <input type="date" name="dateSortie" value={formData.dateSortie} onChange={handleChange} required />
                </div>
                <div>
                    <label>Shift</label>
                    <input type="text" name="shift" value={formData.shift} onChange={handleChange} required />
                </div>
                <div>
                    <label>Saul</label>
                    <input type="text" name="saul" value={formData.saul} onChange={handleChange} required />
                </div>
                <div>
                    <label>Observations</label>
                    <textarea name="observations" value={formData.observations} onChange={handleChange} />
                </div>
                <div>
                    <label>Engin</label>
                    <input type="text" name="engin" value={formData.engin} onChange={handleChange} required />
                </div>
                <button type="submit">Soumettre</button>
            </form>
        </div>
    );
};

export default DemandeForm;
