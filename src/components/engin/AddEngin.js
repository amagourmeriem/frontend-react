import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddEngin = () => {
    let navigate = useNavigate();
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
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await axios.get('http://localhost:9192/categories-engins');
            setCategories(response.data);
        };
        fetchCategories();
    }, []);

    const handleInputChange = (e) => {
        setEngin({
            ...engin,
            [e.target.name]: e.target.value,
        });
    };

    const saveEngin = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:3000/engins", engin);
        navigate("/view-engins");
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

                {/* Répétez ce bloc pour chaque attribut */}
                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="etatFrein">État Frein</label>
                    <input
                        className="form-control col-sm-6"
                        type="text"
                        name="etatFrein"
                        id="etatFrein"
                        required
                        value={engin.etatFrein}
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>

                {/* Sélection de la catégorie */}
                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="categorieEnginId">Catégorie</label>
                    <select
                        className="form-control col-sm-6"
                        name="categorieEnginId"
                        id="categorieEnginId"
                        required
                        value={engin.categorieEnginId}
                        onChange={(e) => handleInputChange(e)}
                    >
                        <option value="">Sélectionner une catégorie</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.nom}
                            </option>
                        ))}
                    </select>
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
