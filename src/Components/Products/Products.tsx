import React from 'react';
import Product from "./Product/Product";
import {useEffect, useState} from "react";
import axios from "axios";
import {ProductDto} from "./Product/Product.model";
import {CategoryDto} from "../Categories/Category/Category.model";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ProductService from "./Product.service";

const Products = () => {
    const [items, setItems] = useState<ProductDto[] | []>([]);
    const [categories, setCategories] = useState<CategoryDto[] | []>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [name, setName] = useState('');
    const [category, setCategory]: any = useState('');
    const [unit, setUnit]: any = useState('');
    const url = "https://newdemostock.gopos.pl//ajax/219"

    useEffect(() => {
        Promise
            .all([fetchCategories(), fetchProducts()])
            .then((_ => setIsLoaded(true)))
    }, [])

    const fetchProducts = (): Promise<ProductDto[]> => {
        return ProductService
            .getProducts()
            .then((response: ProductDto[]) => {
                setItems(response);
                return response;
            })

    }

    const fetchCategories = (): Promise<CategoryDto[]> => {
        return axios.get<CategoryDto[]>(`${url}/product_categories?size=100`)
            .then((response: any) => {
                const categories: CategoryDto[] = response.data.data;
                setCategories(categories);
                return categories;
            })
    }

    const handlePost = () => {
        axios.post('https://newdemostock.gopos.pl//ajax/219/products', {
            "name": name,
            "type": "BASIC",
            "category_id": +category,
            "measure_type": unit.toUpperCase(),
            "updated_at": null,
            "tax_id": 1

        })
            .then((response) => {
                if (response.status === 200) {
                    toast.success("Dodano przedmiot", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    console.log(response);
                }
            })
            .catch((error) => {
                toast.error(error.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
    }

    return (
        <div className="container">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="row">
                <div className="form-group mt-1" style={{border: "solid"}}>
                    <h4 className="">Nowy Produkt</h4>
                    <input className="form-control my-1" placeholder="Nazwa" onChange={(e) => {
                        setName(e.target.value)
                    }}/>
                    <div className="input-group mb-1">
                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="inputGroupSelect01">Kategoria</label>
                        </div>
                        <select onChange={(e) => setCategory(e.target.value)} className="custom-select"
                                id="inputGroupSelect01">
                            <option defaultValue={""}>Wybierz kategorię</option>
                            {isLoaded ? categories.map(category => <option key={generateUniqueID()}
                                                                           value={category.id}>{category.name}</option>) : ""}
                        </select>
                    </div>
                    <div className="input-group mb-1">
                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="inputGroupSelect02">Jednostka</label>
                        </div>
                        <select onChange={(e) => setUnit(e.target.value)} className="custom-select"
                                id="inputGroupSelect02">
                            <option>Wybierz jednostkę</option>
                            <option value="ITEM">sztuka</option>
                            <option value="LITER">litr</option>
                            <option value="KILOGRAM">kilogram</option>
                            <option value="PACKAGE">opakowanie</option>
                        </select>
                    </div>
                    <button onClick={handlePost} data-bs-toogle="modal" data-bs-target="#reg-modal"
                            className="btn m-1 btn-primary">Dodaj Produkt
                    </button>
                </div>
                {
                    isLoaded
                        ? items.map(item =>
                            <Product key={item.id} product={item} categories={categories}/>
                        )


                        : <div>Loading</div>
                }
            </div>
        </div>
    )
}

export default Products;