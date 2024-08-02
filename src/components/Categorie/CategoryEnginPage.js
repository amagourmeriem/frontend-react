// components/Categorie/CategoryEnginPage.jsx

import React, { useState, useEffect } from 'react';
import { request } from '../../helpers/axios_helper'; // Assurez-vous que le chemin est correct

const CategoryEnginPage = () => {
    const [categories, setCategories] = useState([]);
    const [nom, setNom] = useState('');
    const [nbrEngin, setNbrEngin] = useState('');

    useEffect(() => {
        // Appel API pour récupérer les catégories
        request('GET', '/categories_engins')
            .then(response => {
                console.log('Réponse API:', response.data); // Ajoutez ce log pour vérifier les données reçues
                // Assurez-vous que la réponse est un tableau
                if (Array.isArray(response.data)) {
                    setCategories(response.data);
                } else {
                    console.error('La réponse de l\'API n\'est pas un tableau:', response.data);
                    setCategories([]);
                }
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des catégories:', error);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newCategory = { nom, nbrEngin: parseInt(nbrEngin) };

        request('POST', '/categories_engins', newCategory)
            .then(response => {
                console.log('Catégorie ajoutée:', response.data); // Ajoutez ce log pour vérifier les données envoyées
                setCategories([...categories, response.data]);
                setNom('');
                setNbrEngin('');
            })
            .catch(error => {
                console.error('Erreur lors de l\'ajout de la catégorie:', error);
            });
    };

    const handleDelete = (id) => {
        request('DELETE', `/categories_engins/${id}`)
            .then(() => {
                setCategories(categories.filter(category => category.id !== id));
            })
            .catch(error => {
                console.error('Erreur lors de la suppression de la catégorie:', error);
            });
    };

    const handleEdit = (id) => {
        // Ajoutez la logique de modification ici
    };

    return (
        <div className="container">
            <h1>Catégories d'Engins</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nom" className="form-label">Nom de la catégorie</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nom"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="nbrEngin" className="form-label">Nombre d'engins</label>
                    <input
                        type="number"
                        className="form-control"
                        id="nbrEngin"
                        value={nbrEngin}
                        onChange={(e) => setNbrEngin(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Ajouter Catégorie</button>
            </form>
            <h2>Liste des Catégories</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Nombre d'engins</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {categories.map(category => (
                    <tr key={category.id}>
                        <td>{category.nom}</td>
                        <td>{category.nbrEngin}</td>
                        <td>
                            <button className="btn btn-warning btn-sm" onClick={() => handleEdit(category.id)}>Modifier</button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(category.id)}>Supprimer</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryEnginPage;
