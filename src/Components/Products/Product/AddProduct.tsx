import React, {useEffect, useState} from "react";
import {CategoryDto} from "../../Categories/Category/Category.model";
import ProductService from "../Product.service";
import {ToastContainer} from "react-toastify";

const AddProduct = () => {

    const [name, setName] = useState('');
    const [categories, setCategories] = useState<CategoryDto[] | []>([]);
    const [category, setCategory]: any = useState('');
    const [unit, setUnit]: any = useState('');
    const [isLoaded, setIsLoaded]: any = useState('');

    useEffect(() => {
        fetchCategories()
            .then((_ => setIsLoaded(true)))
    }, [])

    const handlePost = () => {
        ProductService
            .postProduct(name, category, unit)
            .then(ProductService.getProducts)
            .then()
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
            <div className="form-group col-lg-6 col-sm-12 m-auto bg-light p-3" >
                <h4 className="text-start m-3">Nowy Produkt</h4>

                <div className="input-group mb-1">
                    <div className="input-group-prepend">
                        <label className="input-group-text"
                               htmlFor="name"
                               style={{width: "6rem"}}>
                            Nazwa
                        </label>
                    </div>
                    <input id="name"
                           className="form-control mx-1"
                           placeholder="Nazwa"
                           onChange={e => setName(e.target.value)}/>
                </div>

                <div className="input-group mb-1">
                    <div className="input-group-prepend">
                        <label className="input-group-text"
                               htmlFor="category"
                               style={{width: "6rem"}}>
                            Kategoria
                        </label>
                    </div>
                    <select onChange={e => setCategory(e.target.value)}
                            className="custom-select mx-1 flex-fill"
                            id="category">
                        <option defaultValue={""}>Wybierz kategorię</option>
                        {isLoaded
                            ? categories.map(category =>
                                <option key={category.id} value={category.id}>{category.name}</option>)
                            : ""
                        }
                    </select>
                </div>
                <div className="input-group mb-1">
                    <div className="input-group-prepend">
                        <label className="input-group-text "
                               htmlFor="unit"
                               style={{width: "6rem"}}>
                            Jednostka
                        </label>
                    </div>
                    <select onChange={e => setUnit(e.target.value)}
                            className="custom-select mx-1 flex-fill"
                            id="unit">
                        <option>Wybierz jednostkę</option>
                        <option value="ITEM">sztuka</option>
                        <option value="LITER">litr</option>
                        <option value="KILOGRAM">kilogram</option>
                        <option value="PACKAGE">opakowanie</option>
                    </select>
                </div>
                <button onClick={handlePost}
                        data-bs-toogle="modal"
                        data-bs-target="#reg-modal"
                        className="btn mb-1 btn-primary">
                    Dodaj Produkt
                </button>
            </div>
        </div>
    )
}

export default AddProduct;