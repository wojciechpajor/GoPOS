import React from 'react';
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Categories from "./Components/Categories/Categories";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from "./Components/Home/Home";
import axios from "axios";
import Products from "./Components/Products/Products";


function App() {
    axios.defaults.headers.common["Authorization"] = 'fd9ba9e1-0788-4e8f-ac46-a43df43e205e';
    return (
        <Router>
            <Navbar/>
            <main role="main" className="App container-fluid">
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/products" exact component={Products}/>
                    <Route path="/categories" exact component={Categories}/>
                </Switch>
            </main>
        </Router>
    );
}

export default App;
