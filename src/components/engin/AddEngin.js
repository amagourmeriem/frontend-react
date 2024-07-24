import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
        observationsGenerales: "oui",
        categorieEnginId: ""
    });

    const handleInputChange = (e) => {
        setEngin({
            ...engin,
            [e.target.name]: e.target.value,
        });
    };

    const saveEngin = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8085/engins", engin);
        navigate("/view-engins"); // Rediriger vers /view-engins
    };

    return (
        <div className="col-sm-8 py-2 px-5 offset-2 shadow">
            <h2 className="mt-5">Add Engin</h2>
            <form onSubmit={(e) => saveEngin(e)}>
                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="code">Code</label>
                    <input
                        className="form-control col-sm-6"
                        type="text"
                        name="code"
                        id="code"
                        required
                        value={engin.code}
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
                        value={engin.matricule}
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
                        value={engin.compteurHoraire}
                        onChange={(e) => handleInputChange(e)}
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
                        onChange={(e) => handleInputChange(e)}
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
                        onChange={(e) => handleInputChange(e)}
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
                        onChange={(e) => handleInputChange(e)}
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
                        onChange={(e) => handleInputChange(e)}
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
                        onChange={(e) => handleInputChange(e)}
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
                        onChange={(e) => handleInputChange(e)}
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
                        onChange={(e) => handleInputChange(e)}
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
                        onChange={(e) => handleInputChange(e)}
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
                        onChange={(e) => handleInputChange(e)}
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
                        onChange={(e) => handleInputChange(e)}
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
                        onChange={(e) => handleInputChange(e)}
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
                        onChange={(e) => handleInputChange(e)}
                    >
                        <option value="oui">Oui</option>
                        <option value="non">Non</option>
                    </select>
                </div>

                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="observationsGenerales">Observations Générales</label>
                    <select
                        className="form-control col-sm-6"
                        name="observationsGenerales"
                        id="observationsGenerales"
                        required
                        value={engin.observationsGenerales}
                        onChange={(e) => handleInputChange(e)}
                    >
                        <option value="oui">Oui</option>
                        <option value="non">Non</option>
                    </select>
                </div>

                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="categorieEnginId">Catégorie</label>
                    <input
                        className="form-control col-sm-6"
                        type="text"
                        name="categorieEnginId"
                        id="categorieEnginId"
                        required
                        value={engin.categorieEnginId}
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

export default AddEngin;

