import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState, useRef } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppContent from './AppContent';
import NavBar from "./common/NavBar";
import EnginView from "./engin/EnginView";
import AddEngin from "./engin/AddEngin";
import EditEngin from "./engin/EditEngin";
import DetailsEngin from "./engin/DetailsEngin";
import DemandeView from './demandes/DemandeView';
import DemandeList from './demandes/DemandeList';
import DemandeForm from './demandes/DemandeForm';
import CategoryEnginPage from "./Categorie/CategoryEnginPage";
import AffectationForm from "./Affectation/AffectationForm";
import AffectationList from "./Affectation/AffectationList";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const appContentRef = useRef(null);

    const handleLogin = (userId) => {
        setIsAuthenticated(true);
        setUserId(userId);
        appContentRef.current?.login();
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUserId(null);
        appContentRef.current?.logout();
    };

    return (
        <Router>
            <div className="App">
                <NavBar
                    login={handleLogin}
                    logout={handleLogout}
                />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <Routes>
                                <Route path="/" element={<AppContent ref={appContentRef} />} />
                                <Route
                                    path="/add-engin"
                                    element={isAuthenticated ? <AddEngin /> : <Navigate to="/" />}
                                />
                                <Route
                                    path="/view-engins"
                                    element={isAuthenticated ? <EnginView /> : <Navigate to="/" />}
                                />
                                <Route
                                    path="/edit-engin/:id"
                                    element={isAuthenticated ? <EditEngin /> : <Navigate to="/" />}
                                />
                                <Route
                                    path="/engin-details/:id"
                                    element={isAuthenticated ? <DetailsEngin /> : <Navigate to="/" />}
                                />
                                <Route
                                    path="/demandes"
                                    element={isAuthenticated ? <DemandeView /> : <Navigate to="/" />}
                                />
                                <Route
                                    path="/mes-demandes"
                                    element={isAuthenticated ? <DemandeList userId={userId} /> : <Navigate to="/" />}
                                />
                                <Route
                                    path="/envoyer-demande"
                                    element={isAuthenticated ? <DemandeForm userId={userId} /> : <Navigate to="/" />}
                                />
                                <Route
                                    path="/categories-engins"
                                    element={isAuthenticated ? <CategoryEnginPage /> : <Navigate to="/" />}
                                />
                                <Route path="/affectation-form/:id" element={isAuthenticated ? <AffectationForm /> : <Navigate to="/" />} />
                                <Route path="/affectations" element={isAuthenticated ? <AffectationList /> : <Navigate to="/" />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default App;
