import React from 'react';
import Product from "./Product/Product";
import {useEffect, useState} from "react";
import {ProductDto} from "./Product/Product.model";
import {CategoryDto} from "../Categories/Category/Category.model";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ProductService from "./Product.service";

const Products = () => {
    const [items, setItems] = useState<ProductDto[] | []>([]);
    const [categories, setCategories] = useState<CategoryDto[] | []>([]);
    const [isLoaded, setIsLoaded] = useState(false);

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
        return ProductService
            .getCategories()
            .then((response: CategoryDto[]) => {
                setCategories(response);
                return response;
            })

    }

    return (
        <div className="container ">
            <ToastContainer
                onClick={fetchProducts}
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="row">
                {

                    isLoaded
                        ? <div className="card-group">
                            <div className="col-md-6 col-lg-4 p-4">
                                <div className="card border-1 border-success" style={{minHeight: "15rem"}}>
                                    <div className="card-block m-auto text-success">
                                        <h4 className="card-title m-0" style={{fontSize: "6rem"}}>+</h4>
                                        <a href={`/product/add`} className="btn m-1 btn-success">Dodaj produkt</a>
                                    </div>
                                </div>
                            </div>
                            {

                                items.map(item =>
                                    <Product key={item.id} product={item} categories={categories}/>
                                )
                            }
                        </div>


                        : <div>Loading</div>
                }
            </div>
        </div>
    )
}

export default Products;