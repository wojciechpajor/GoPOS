import React, {useEffect, useState} from "react";
import {CategoryDto} from "../../Categories/Category/Category.model";
import ProductService from "../Product.service";
import {ProductDto} from "./Product.model";
import {ToastContainer} from "react-toastify";

const EditProduct = () => {

    const [inputName, setInputName] = useState('');
    const [categories, setCategories] = useState<CategoryDto[] | []>([]);
    const [inputCategory, setInputCategory]: any = useState<CategoryDto>();
    const [inputUnit, setInputUnit]: any = useState('');
    const [isLoaded, setIsLoaded]: any = useState('');
    const [product, setProduct] = useState<ProductDto>();

    useEffect(() => {
        Promise
            .all([fetchCategories(), fetchProduct()])
            .then(([categories, product]) => {
                setCategories(categories)
                setProduct(product)
                setInputName(product!.name)
                setInputCategory(product?.category_id)
                setInputUnit(product?.measure_type)
                setIsLoaded(true)
            })
    }, [])

    const gibPath = ():number => {
        const path = window.location.pathname;
        return +path.substring(path.lastIndexOf("/") + 1)
    }

    const fetchProduct = (): Promise<ProductDto> => {
        return ProductService.getProduct(gibPath());
    }

    const fetchCategories = (): Promise<CategoryDto[]> => {
        return ProductService.getCategories();
    }

    const handlePut = () => {
        ProductService.putProduct({
            id: product!.id,
            name: inputName,
            type: product!.type,
            category_id: +inputCategory,
            tax_id: product!.tax_id,
            updated_at: product!.updated_at,
            measure_type: inputUnit
        }).then(ProductService.getProducts)
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
                        <div className="form-group col-lg-6 col-sm-12 m-auto p-3 bg-light">
                            <h4 className="text-start m-3">Edytuj Produkt:</h4>
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
                                       value={product!.name}
                                       onChange={e => setInputName(e.target.value)}/>
                            </div>
                            <div className="input-group mb-1">
                                <div className="input-group-prepend">
                                    <label className="input-group-text" htmlFor="category"
                                           style={{width: "6rem"}}>Kategoria</label>
                                </div>
                                <select onChange={(e) => setInputCategory(e.target.value)}
                                        className="custom-select mx-1 flex-fill"
                                        style={{width:"10rem"}}
                                        id="category">
                                    <option defaultValue="">Wybierz kategorię</option>
                                    {isLoaded ? categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>) : ""}
                                </select>
                            </div>
                            <div className="input-group mb-1">
                                <div className="input-group-prepend">
                                    <label className="input-group-text " htmlFor="unit"
                                           style={{width: "6rem"}}>Jednostka</label>
                                </div>
                                <select onChange={(e) => setInputUnit(e.target.value)} className="custom-select mx-1 flex-fill"
                                        id="unit">
                                    <option defaultValue="">Wybierz jednoskę</option>
                                    <option value="ITEM">sztuka</option>
                                    <option value="LITER">litr</option>
                                    <option value="KILOGRAM">kilogram</option>
                                    <option value="PACKAGE">opakowanie</option>
                                </select>
                            </div>
                            <button onClick={handlePut} data-bs-toogle="modal" data-bs-target="#reg-modal"
                                    className="btn mb-1 btn-primary">Edytuj Produkt
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

export default EditProduct;