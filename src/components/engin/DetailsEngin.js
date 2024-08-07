import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DetailsEngin = () => {
    const { id } = useParams();
    const [engin, setEngin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadEngin();
    }, [id]);

    const loadEngin = async () => {
        try {
            const result = await axios.get(`http://localhost:8085/engins/engin/${id}`);
            setEngin(result.data);
        } catch (error) {
            setError("Erreur lors de la récupération des détails de l'engin.");
            console.error("Erreur lors de la récupération des détails de l'engin:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Chargement...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!engin) {
        return <p>Aucun détail disponible.</p>;
    }

    return (
        <section className="shadow" style={{ backgroundColor: "whitesmoke" }}>
            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="card mb-4">
                            <div className="card-body text-center">
                                {engin.image ? (
                                    <img
                                        src={`http://localhost:8085/engins/uploads/${engin.image}`}
                                        alt="engin"
                                        className="rounded img-fluid"
                                        style={{ width: 150 }}
                                    />
                                ) : (
                                    <p>Aucune image disponible</p>
                                )}
                                <h5 className="my-3">{engin.code}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="card mb-4">
                            <div className="card-body">
                                {Object.entries(engin).map(([key, value]) => (
                                    <React.Fragment key={key}>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h5 className="mb-0">{key.charAt(0).toUpperCase() + key.slice(1)}</h5>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{value || "Non spécifié"}</p>
                                            </div>
                                        </div>
                                        <hr />
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DetailsEngin;
