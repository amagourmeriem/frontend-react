import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppContent from './AppContent';
import NavBar from "./common/NavBar";
import Home from "./Home";
import EnginView from "./engin/EnginView";
import AddEngin from "./engin/AddEngin";
import EditEngin from "./engin/EditEngin";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.appContentRef = React.createRef();
        this.state = {
            isAuthenticated: false
        };
    }

    handleLogin = () => {
        this.setState({ isAuthenticated: true });
        this.appContentRef.current?.login();
    };

    handleLogout = () => {
        this.setState({ isAuthenticated: false });
        this.appContentRef.current?.logout();
    };

    render() {
        const { isAuthenticated } = this.state;

        return (
            <Router>
                <div className="App">
                    <NavBar
                        login={this.handleLogin}
                        logout={this.handleLogout}
                    />
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <Routes>
                                    <Route path="/" element={<AppContent ref={this.appContentRef} />} />
                                    <Route
                                        path="/add-engin"
                                        element={isAuthenticated ? <AddEngin /> : <Navigate to="/" />}
                                    />
                                    <Route
                                        path="/view-engins"
                                        element={isAuthenticated ? <EnginView /> : <Navigate to="/" />}
                                    />
                                    <Route
                                        path="/view-engins"
                                        element={isAuthenticated ? <EditEngin /> : <Navigate to="/" />}
                                    />
                                    <Route path="/view-engins" element={<EnginView />} />
                                    <Route path="/edit-engin/:id" element={<EditEngin />} />


                                </Routes>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
