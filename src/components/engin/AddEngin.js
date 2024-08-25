import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuthToken } from "../../helpers/axios_helper";
import NavBar from "../common/NavBar";

const AddEngin = () => {
    let navigate = useNavigate();
    const [engin, setEngin] = useState({
        code: "",
        matricule: "",
        compteurHoraire: "",
        etatFrein: "oui",
        etatBatterie: "oui",
        etatEclairage: "oui",
        etatEssuieGlace: "oui",
        etatTracteur: "oui",
        etatPneumatique: "oui",
        etatTransmission: "oui",
        etatFreinService: "oui",
        etatFreinParking: "oui",
        etatKlaxon: "oui",
        etatCablage: "oui",
        etatVitesse: "oui",
        observationsGenerales: "",
        categorieEnginId: "",
        image: null,
    });
    const [categories, setCategories] = useState([]);

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
        const { name, value, files } = e.target;
        setEngin({
            ...engin,
            [name]: files ? files[0] : value,
        });
    };

    const saveEngin = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(engin).forEach(key => {
            formData.append(key, engin[key]);
        });

        const token = getAuthToken();

        try {
            await axios.post("http://localhost:8085/engins", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            navigate("/view-engins");
        } catch (error) {
            console.error("Error:", error.response || error.message);
            if (error.response) {
                console.log("Error Response Data:", error.response.data);
                console.log("Error Response Status:", error.response.status);
                console.log("Error Response Headers:", error.response.headers);
            }
        }
    };

    return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
            <h2 className="mt-5">Add Engin</h2>
            <form onSubmit={(e) => saveEngin(e)}>
                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="image">Image</label>
                    <input
                        className="form-control col-sm-6"
                        type="file"
                        name="image"
                        id="image"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="code">Code</label>
                    <input
                        className="form-control col-sm-6"
                        type="text"
                        name="code"
                        id="code"
                        required
                        value={engin.code}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="matricule">Matricule</label>
                    <input
                        className="form-control col-sm-6"
                        type="text"
                        name="matricule"
                        id="matricule"
                        required
                        value={engin.matricule}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="compteurHoraire">Compteur Horaire</label>
                    <input
                        className="form-control col-sm-6"
                        type="number"
                        name="compteurHoraire"
                        id="compteurHoraire"
                        required
                        value={engin.compteurHoraire}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Répétez ce bloc pour chaque attribut avec des options Oui/Non */}
                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="etatFrein">État Frein</label>
                    <select
                        className="form-control col-sm-6"
                        name="etatFrein"
                        id="etatFrein"
                        required
                        value={engin.etatFrein}
                        onChange={handleInputChange}
                    >
                        <option value="oui">Oui</option>
                        <option value="non">Non</option>
                    </select>
                </div>

                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="etatBatterie">État Batterie</label>
                    <select
                        className="form-control col-sm-6"
                        name="etatBatterie"
                        id="etatBatterie"
                        required
                        value={engin.etatBatterie}
                        onChange={handleInputChange}
                    >
                        <option value="oui">Oui</option>
                        <option value="non">Non</option>
                    </select>
                </div>

                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="etatEclairage">État Éclairage</label>
                    <select
                        className="form-control col-sm-6"
                        name="etatEclairage"
                        id="etatEclairage"
                        required
                        value={engin.etatEclairage}
                        onChange={handleInputChange}
                    >
                        <option value="oui">Oui</option>
                        <option value="non">Non</option>
                    </select>
                </div>

                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="etatEssuieGlace">État Essuie-Glace</label>
                    <select
                        className="form-control col-sm-6"
                        name="etatEssuieGlace"
                        id="etatEssuieGlace"
                        required
                        value={engin.etatEssuieGlace}
                        onChange={handleInputChange}
                    >
                        <option value="oui">Oui</option>
                        <option value="non">Non</option>
                    </select>
                </div>

                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="etatTracteur">État Tracteur</label>
                    <select
                        className="form-control col-sm-6"
                        name="etatTracteur"
                        id="etatTracteur"
                        required
                        value={engin.etatTracteur}
                        onChange={handleInputChange}
                    >
                        <option value="oui">Oui</option>
                        <option value="non">Non</option>
                    </select>
                </div>

                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="etatPneumatique">État Pneumatique</label>
                    <select
                        className="form-control col-sm-6"
                        name="etatPneumatique"
                        id="etatPneumatique"
                        required
                        value={engin.etatPneumatique}
                        onChange={handleInputChange}
                    >
                        <option value="oui">Oui</option>
                        <option value="non">Non</option>
                    </select>
                </div>

                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="etatTransmission">État Transmission</label>
                    <select
                        className="form-control col-sm-6"
                        name="etatTransmission"
                        id="etatTransmission"
                        required
                        value={engin.etatTransmission}
                        onChange={handleInputChange}
                    >
                        <option value="oui">Oui</option>
                        <option value="non">Non</option>
                    </select>
                </div>

                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="etatFreinService">État Frein Service</label>
                    <select
                        className="form-control col-sm-6"
                        name="etatFreinService"
                        id="etatFreinService"
                        required
                        value={engin.etatFreinService}
                        onChange={handleInputChange}
                    >
                        <option value="oui">Oui</option>
                        <option value="non">Non</option>
                    </select>
                </div>

                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="etatFreinParking">État Frein Parking</label>
                    <select
                        className="form-control col-sm-6"
                        name="etatFreinParking"
                        id="etatFreinParking"
                        required
                        value={engin.etatFreinParking}
                        onChange={handleInputChange}
                    >
                        <option value="oui">Oui</option>
                        <option value="non">Non</option>
                    </select>
                </div>

                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="etatKlaxon">État Klaxon</label>
                    <select
                        className="form-control col-sm-6"
                        name="etatKlaxon"
                        id="etatKlaxon"
                        required
                        value={engin.etatKlaxon}
                        onChange={handleInputChange}
                    >
                        <option value="oui">Oui</option>
                        <option value="non">Non</option>
                    </select>
                </div>

                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="etatCablage">État Câblage</label>
                    <select
                        className="form-control col-sm-6"
                        name="etatCablage"
                        id="etatCablage"
                        required
                        value={engin.etatCablage}
                        onChange={handleInputChange}
                    >
                        <option value="oui">Oui</option>
                        <option value="non">Non</option>
                    </select>
                </div>

                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="etatVitesse">État Vitesse</label>
                    <select
                        className="form-control col-sm-6"
                        name="etatVitesse"
                        id="etatVitesse"
                        required
                        value={engin.etatVitesse}
                        onChange={handleInputChange}
                    >
                        <option value="oui">Oui</option>
                        <option value="non">Non</option>
                    </select>
                </div>

                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="observationsGenerales">Observations Générales</label>
                    <textarea
                        className="form-control col-sm-6"
                        name="observationsGenerales"
                        id="observationsGenerales"
                        value={engin.observationsGenerales}
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
                        value={engin.categorieEnginId}
                        onChange={handleInputChange}
                    >
                        <option value="" disabled>Sélectionnez une catégorie</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.nom}</option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary mb-5">Save</button>
            </form>
        </div>
    );
};

export default AddEngin;
