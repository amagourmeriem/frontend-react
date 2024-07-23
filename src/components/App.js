import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppContent from './AppContent';
import NavBar from "./common/NavBar";
import Home from "./Home";
import EnginView from "./engin/EnginView";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.appContentRef = React.createRef();
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <NavBar
                        login={() => this.appContentRef.current.login()}
                        logout={() => this.appContentRef.current.logout()}
                    />
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <AppContent ref={this.appContentRef} />
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
