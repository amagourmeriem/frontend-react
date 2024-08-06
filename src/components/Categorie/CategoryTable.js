import React from 'react';

const CategoryTable = ({ categories, onEditClick, onDeleteClick }) => {
    return (
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
                        <button className="btn btn-secondary me-2" onClick={() => onEditClick(category)}>Modifier</button>
                        <button className="btn btn-danger" onClick={() => onDeleteClick(category.id)}>Supprimer</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default CategoryTable;
