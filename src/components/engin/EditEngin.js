import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditEngin = () => {
    let navigate = useNavigate();
    const { id } = useParams();

    const [engin, setEngin] = useState({
        code: "",
        matricule: "",
        compteurHoraire: "",
        etatFrein: "",
        etatBatterie: "",
        etatEclairage: "",
        etatEssuieGlace: "",
        etatTracteur: "",
        etatPneumatique: "",
        etatTransmission: "",
        etatFreinService: "",
        etatFreinParking: "",
        etatKlaxon: "",
        etatCablage: "",
        etatVitesse: "",
        observationsGenerales: "",
        categorieEnginId: ""
    });

    const {
        code,
        matricule,
        compteurHoraire,
        etatFrein,
        etatBatterie,
        etatEclairage,
        etatEssuieGlace,
        etatTracteur,
        etatPneumatique,
        etatTransmission,
        etatFreinService,
        etatFreinParking,
        etatKlaxon,
        etatCablage,
        etatVitesse,
        observationsGenerales,
        categorieEnginId
    } = engin;

    useEffect(() => {
        loadEngin();
    }, []);

    const loadEngin = async () => {
        const result = await axios.get(`http://localhost:8085/engins/engin/${id}`);
        setEngin(result.data);
    };

    const handleInputChange = (e) => {
        setEngin({
            ...engin,
            [e.target.name]: e.target.value,
        });
    };

    const updateEngin = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8085/engins/update/${id}`, engin);
        navigate("/view-engins");
    };

    return (
        <div className="col-sm-8 py-2 px-5 offset-2 shadow">
            <h2 className="mt-5">Edit Engin</h2>
            <form onSubmit={(e) => updateEngin(e)}>
                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="code">Code</label>
                    <input
                        className="form-control col-sm-6"
                        type="text"
                        name="code"
                        id="code"
                        required
                        value={code}
                        onChange={(e) => handleInputChange(e)}
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
                        value={matricule}
                        onChange={(e) => handleInputChange(e)}
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
                        value={compteurHoraire}
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>

                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="etatFrein">État Frein</label>
                    <select
                        className="form-control col-sm-6"
                        name="etatFrein"
                        id="etatFrein"
                        required
                        value={etatFrein}
                        onChange={(e) => handleInputChange(e)}
                    >
                        <option value="Oui">Oui</option>
                        <option value="Non">Non</option>
                    </select>
                </div>

                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="etatBatterie">État Batterie</label>
                    <select
                        className="form-control col-sm-6"
                        name="etatBatterie"
                        id="etatBatterie"
                        required
                        value={etatBatterie}
                        onChange={(e) => handleInputChange(e)}
                    >
                        <option value="Oui">Oui</option>
                        <option value="Non">Non</option>
                    </select>
                </div>

                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="etatEclairage">État Éclairage</label>
                    <select
                        className="form-control col-sm-6"
                        name="etatEclairage"
                        id="etatEclairage"
                        required
                        value={etatEclairage}
                        onChange={(e) => handleInputChange(e)}
                    >
                        <option value="Oui">Oui</option>
                        <option value="Non">Non</option>
                    </select>
                </div>

                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="etatEssuieGlace">État Essuie-Glace</label>
                    <select
                        className="form-control col-sm-6"
                        name="etatEssuieGlace"
                        id="etatEssuieGlace"
                        required
                        value={etatEssuieGlace}
                        onChange={(e) => handleInputChange(e)}
                    >
                        <option value="Oui">Oui</option>
                        <option value="Non">Non</option>
                    </select>
                </div>

                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="etatTracteur">État Tracteur</label>
                    <select
                        className="form-control col-sm-6"
                        name="etatTracteur"
                        id="etatTracteur"
                        required
                        value={etatTracteur}
                        onChange={(e) => handleInputChange(e)}
                    >

                        <option value="Oui">Oui</option>
                        <option value="Non">Non</option>
                    </select>
                </div>

                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="etatPneumatique">État Pneumatique</label>
                    <select
                        className="form-control col-sm-6"
                        name="etatPneumatique"
                        id="etatPneumatique"
                        required
                        value={etatPneumatique}
                        onChange={(e) => handleInputChange(e)}
                    >
                        <option value="Oui">Oui</option>
                        <option value="Non">Non</option>
                    </select>
                </div>

                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="etatTransmission">État Transmission</label>
                    <select
                        className="form-control col-sm-6"
                        name="etatTransmission"
                        id="etatTransmission"
                        required
                        value={etatTransmission}
                        onChange={(e) => handleInputChange(e)}
                    >
                        <option value="Oui">Oui</option>
                        <option value="Non">Non</option>
                    </select>
                </div>

                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="etatFreinService">État Frein Service</label>
                    <select
                        className="form-control col-sm-6"
                        name="etatFreinService"
                        id="etatFreinService"
                        required
                        value={etatFreinService}
                        onChange={(e) => handleInputChange(e)}
                    >
                        <option value="Oui">Oui</option>
                        <option value="Non">Non</option>
                    </select>
                </div>
                    <div className="input-group mb-5">
                        <label className="input-group-text" htmlFor="etatFreinParking">État Frein Parking</label>
                        <select
                            className="form-control col-sm-6"
                            name="etatFreinParking"
                            id="etatFreinParking"
                            required
                            value={etatFreinParking}
                            onChange={(e) => handleInputChange(e)}
                        >
                            <option value="Oui">Oui</option>
                            <option value="Non">Non</option>
                        </select>
                    </div>

                    <div className="input-group mb-5">
                        <label className="input-group-text" htmlFor="etatKlaxon">État Klaxon</label>
                        <select
                            className="form-control col-sm-6"
                            name="etatKlaxon"
                            id="etatKlaxon"
                            required
                            value={etatKlaxon}
                            onChange={(e) => handleInputChange(e)}
                        >
                            <option value="Oui">Oui</option>
                            <option value="Non">Non</option>
                        </select>
                    </div>

                    <div className="input-group mb-5">
                        <label className="input-group-text" htmlFor="etatCablage">État Câblage</label>
                        <select
                            className="form-control col-sm-6"
                            name="etatCablage"
                            id="etatCablage"
                            required
                            value={etatCablage}
                            onChange={(e) => handleInputChange(e)}
                        >
                            <option value="Oui">Oui</option>
                            <option value="Non">Non</option>
                        </select>
                    </div>

                    <div className="input-group mb-5">
                        <label className="input-group-text" htmlFor="etatVitesse">État Vitesse</label>
                        <select
                            className="form-control col-sm-6"
                            name="etatVitesse"
                            id="etatVitesse"
                            required
                            value={etatVitesse}
                            onChange={(e) => handleInputChange(e)}
                        >
                            <option value="Oui">Oui</option>
                            <option value="Non">Non</option>
                        </select>
                    </div>

                    <div className="input-group mb-5">
                        <label className="input-group-text" htmlFor="observationsGenerales">Observations Générales</label>
                        <textarea
                            className="form-control col-sm-6"
                            name="observationsGenerales"
                            id="observationsGenerales"
                            value={observationsGenerales}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>

                    <div className="input-group mb-5">
                        <label className="input-group-text" htmlFor="categorieEnginId">Catégorie</label>
                        <input
                            className="form-control col-sm-6"
                            type="text"
                            name="categorieEnginId"
                            id="categorieEnginId"
                            required
                            value={categorieEnginId}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>

                    <div className="row mb-5">
                        <div className="col-sm-2">
                            <button type="submit" className="btn btn-outline-success btn-lg">
                                Save
                            </button>
                        </div>

                        <div className="col-sm-2">
                            <Link to={"/view-engins"} className="btn btn-outline-warning btn-lg">
                                Cancel
                            </Link>
                        </div>
                    </div>
            </form>
        </div>
);
};

export default EditEngin;

