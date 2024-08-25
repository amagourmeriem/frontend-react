import React, { createContext, useContext, useState } from 'react';

// Créer un contexte
const AuthContext = createContext();

// Créer un hook personnalisé pour utiliser le contexte
export const useAuth = () => {
    return useContext(AuthContext);
};

// Fournir le contexte
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userRole, setUserRole] = useState(null);

    const login = (userId, role) => {
        setIsAuthenticated(true);
        setUserId(userId);
        setUserRole(role);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserId(null);
        setUserRole(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userId, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
