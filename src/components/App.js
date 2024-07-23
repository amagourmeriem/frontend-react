import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppContent from './AppContent';
import NavBar from "./common/NavBar";

function App() {
    return (
        <Router>
            <div className="App">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <NavBar/>
                            <AppContent />
                        </div>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
