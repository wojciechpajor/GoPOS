import React, {useEffect, useState} from "react";
import {CategoryDto} from "./Category.model";
import {ToastContainer} from "react-toastify";
import CategoryService from "../Category.service";

const EditCategory = () => {

    const [name, setName] = useState('');
    const [category, setCategory]: any = useState('');
    const [isLoaded, setIsLoaded]: any = useState('');

    useEffect(() => {
        fetchCategory()
            .then((_ => setIsLoaded(true)))
    }, )

    const gibPath = ():number => {
        const path = window.location.pathname;
        return +path.substring(path.lastIndexOf("/") + 1)
    }

    const fetchCategory = (): Promise<CategoryDto> => {
        return CategoryService
            .getCategory(gibPath())
            .then((response:CategoryDto) => {
                setCategory(response);
                return response;
            })
    }

    const handlePut = () => {
        CategoryService.putCategory({
            id: category.id,
            name: name,
            updated_at: category.updated_at,
            status: category.status
        }).then()
    }

    return (
        <div className="container d-flex" style={{height:"90vh"}}>
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
            {
                isLoaded ?
                    (
                        <div className="form-group col-lg-6 col-sm-12 m-auto" style={{border: "solid", minWidth: "25rem"}}>
                            <h4 className="text-start m-3">Edytuj kategorię:</h4>
                            <input className="form-control my-1" value={category?.name} onChange={(e) => {
                                setName(e.target.value)
                            }}/>
                            <button onClick={handlePut} data-bs-toogle="modal" data-bs-target="#reg-modal"
                                    className="btn mb-1 btn-primary">Edytuj kategorię
                            </button>
                        </div>
                    )
                    :
                    (
                        <div>Loading</div>
                    )
            }
        </div>
    )
}

export default EditCategory;