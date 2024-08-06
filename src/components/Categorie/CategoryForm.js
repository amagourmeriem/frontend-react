import React, { useState, useEffect } from 'react';

const CategoryForm = ({ category, onSave, onClose }) => {
    const [nom, setNom] = useState('');
    const [nbrEngin, setNbrEngin] = useState('');

    useEffect(() => {
        if (category) {
            setNom(category.nom);
            setNbrEngin(category.nbrEngin);
        } else {
            setNom('');
            setNbrEngin('');
        }
    }, [category]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newCategory = { nom, nbrEngin: parseInt(nbrEngin) };

        if (category) {
            onSave(category.id, newCategory);
        } else {
            onSave(newCategory);
        }
    };

    return (
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
            <button type="submit" className="btn btn-primary">{category ? 'Modifier' : 'Ajouter'} Catégorie</button>
            <button type="button" className="btn btn-secondary ms-2" onClick={onClose}>Annuler</button>
        </form>
    );
};

export default CategoryForm;
