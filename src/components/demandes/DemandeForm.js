import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getAuthToken } from "../../helpers/axios_helper";

const DemandeForm = ({ refreshDemandes }) => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        numeroBCI: '',
        nomDepartement: '',
        dateSortie: '',
        shift: '',
        observations: '',
        categorieEnginId: '',
        saul: '',
        nomDemandeur: '' // Ajout du nom du demandeur
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:8085/categories_engins");
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = getAuthToken();

        // Prépare les données du formulaire sans le champ `status`
        const { status, ...dataToSend } = formData;

        try {
            const response = await axios.post("http://localhost:8085/demandes", dataToSend, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (refreshDemandes) {
                refreshDemandes();
            }

            navigate("/mes-demandes");
        } catch (error) {
            console.error("Erreur lors de l'envoi de la demande :", error.response || error.message);
        }
    };

    return (
        <div className="col-sm-8 py-2 px-5 offset-2 shadow">
            <h2 className="mt-5">Envoyer une Nouvelle Demande</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="numeroBCI">Numéro BCI</label>
                    <input
                        className="form-control col-sm-6"
                        type="text"
                        name="numeroBCI"
                        id="numeroBCI"
                        required
                        value={formData.numeroBCI}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="nomDepartement">Département</label>
                    <input
                        className="form-control col-sm-6"
                        type="text"
                        name="nomDepartement"
                        id="nomDepartement"
                        required
                        value={formData.nomDepartement}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="dateSortie">Date de Sortie</label>
                    <input
                        className="form-control col-sm-6"
                        type="date"
                        name="dateSortie"
                        id="dateSortie"
                        required
                        value={formData.dateSortie}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="shift">Shift</label>
                    <input
                        className="form-control col-sm-6"
                        type="text"
                        name="shift"
                        id="shift"
                        required
                        value={formData.shift}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="saul">Saul</label>
                    <input
                        className="form-control col-sm-6"
                        type="text"
                        name="saul"
                        id="saul"
                        required
                        value={formData.saul}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="observations">Observations</label>
                    <textarea
                        className="form-control col-sm-6"
                        name="observations"
                        id="observations"
                        value={formData.observations}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="categorieEnginId">Catégorie</label>
                    <select
                        className="form-control col-sm-6"
                        name="categorieEnginId"
                        id="categorieEnginId"
                        required
                        value={formData.categorieEnginId}
                        onChange={handleInputChange}
                    >
                        <option value="" disabled>Sélectionnez une catégorie</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.nom}</option>
                        ))}
                    </select>
                </div>

                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="nomDemandeur">Nom du Demandeur</label>
                    <input
                        className="form-control col-sm-6"
                        type="text"
                        name="nomDemandeur"
                        id="nomDemandeur"
                        required
                        value={formData.nomDemandeur}
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary mb-5">Envoyer la Demande</button>
            </form>
        </div>
    );
};

export default DemandeForm;
