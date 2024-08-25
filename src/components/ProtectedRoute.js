import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ component: Component, roles, ...rest }) => {
    const { isAuthenticated, userRole } = useAuth();

    return (
        <Route
            {...rest}
            element={
                isAuthenticated && roles.includes(userRole) ? (
                    <Component />
                ) : (
                    <Navigate to="/" />
                )
            }
        />
    );
};

export default ProtectedRoute;
