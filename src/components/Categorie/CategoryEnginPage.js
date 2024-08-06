import React, { useState, useEffect } from 'react';
import { request } from '../../helpers/axios_helper'; // Assurez-vous que le chemin est correct
import CategoryTable from './CategoryTable';
import CategoryForm from './CategoryForm';

const CategoryEnginPage = () => {
    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [formVisible, setFormVisible] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        request('GET', '/categories_engins')
            .then(response => {
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
    };

    const handleAddCategory = (category) => {
        request('POST', '/categories_engins', category)
            .then(response => {
                setCategories([...categories, response.data]);
                setFormVisible(false);
            })
            .catch(error => {
                console.error('Erreur lors de l\'ajout de la catégorie:', error);
            });
    };

    const handleUpdateCategory = (id, category) => {
        request('PUT', `/categories_engins/${id}`, category)
            .then(response => {
                setCategories(categories.map(cat => (cat.id === id ? response.data : cat)));
                setCurrentCategory(null);
                setFormVisible(false);
            })
            .catch(error => {
                console.error('Erreur lors de la mise à jour de la catégorie:', error);
            });
    };

    const handleDeleteCategory = (id) => {
        request('DELETE', `/categories_engins/${id}`)
            .then(() => {
                setCategories(categories.filter(cat => cat.id !== id));
            })
            .catch(error => {
                console.error('Erreur lors de la suppression de la catégorie:', error);
            });
    };

    const handleEditClick = (category) => {
        setCurrentCategory(category);
        setFormVisible(true);
    };

    const handleAddClick = () => {
        setCurrentCategory(null);
        setFormVisible(true);
    };

    const handleFormClose = () => {
        setFormVisible(false);
        setCurrentCategory(null);
    };

    return (
        <div className="container">
            <h1>Catégories d'Engins</h1>
            {formVisible ? (
                <CategoryForm
                    category={currentCategory}
                    onSave={currentCategory ? handleUpdateCategory : handleAddCategory}
                    onClose={handleFormClose}
                />
            ) : (
                <>
                    <button className="btn btn-primary mb-3" onClick={handleAddClick}>Ajouter Catégorie</button>
                    <CategoryTable
                        categories={categories}
                        onEditClick={handleEditClick}
                        onDeleteClick={handleDeleteCategory}
                    />
                </>
            )}
        </div>
    );
};

export default CategoryEnginPage;
