import React from 'react';
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Categories from "./Components/Categories/Categories";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import AddProduct from "./Components/Products/Product/AddProduct";
import EditProduct from "./Components/Products/Product/EditProduct";
import AddCategory from "./Components/Categories/Category/AddCategory";
import EditCategory from "./Components/Categories/Category/EditCategory";


function App() {
    return (
        <Router>
            <Navbar/>
            <main role="main" className="container text-center">
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/products" exact component={Products}/>
                    <Route path="/categories" exact component={Categories}/>
                    <Route path="/product/add">
                        <AddProduct/>
                    </Route>
                    <Route path={`/product/edit/`}>
                        <EditProduct/>
                    </Route>
                    <Route path="/category/add">
                        <AddCategory/>
                    </Route>
                    <Route path={`/category/edit/`}>
                        <EditCategory/>
                    </Route>
                </Switch>
            </main>
        </Router>
    );
}

export default App;
