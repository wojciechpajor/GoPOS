import React from 'react';
import {useEffect, useState} from "react";
import Category from "./Category/Category";
import {CategoryDto} from "./Category/Category.model";
import {ToastContainer} from "react-toastify";
import ProductService from "../Products/Product.service";

const Categories = () => {
    const [categories, setCategories] = useState<CategoryDto[] | []>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetchCategories()
            .then(_ => setIsLoaded(true))
    }, [])

    const fetchCategories = (): Promise<CategoryDto[]> => {
        return ProductService
            .getCategories()
            .then((response: CategoryDto[]) => {
                setCategories(response);
                return response;
            })

    }

    return(
        <div className="container">
            <ToastContainer
                onClick={fetchCategories}
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
                {
                    isLoaded
                        ?
                        <div className="card-group">
                            <div className="col-md-6 col-lg-4 p-4">
                                <div className="card border-1 border-success" style={{minHeight: "15rem"}}>
                                    <div className="card-block m-auto text-success">
                                        <h4 className="card-title m-0" style={{fontSize: "6rem"}}>+</h4>
                                        <a href={`/category/add`} className="btn m-1 btn-success">Dodaj kategorię</a>
                                    </div>
                                </div>
                            </div>
                            {
                                categories.map(item => <Category  key={item.id} props={item}/>)
                            }
                        </div>
                        : <div>Loading</div>
                }
            </div>
        </div>
    )
}

export default Categories;