import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import React, {useEffect, useState} from "react";
import {CategoryDto} from "../../Categories/Category/Category.model";
import ProductService from "../Product.service";
import {ProductDto} from "./Product.model";
import {ToastContainer} from "react-toastify";

const EditProduct = () => {

    const [name, setName] = useState('');
    const [categories, setCategories] = useState<CategoryDto[] | []>([]);
    const [category, setCategory]: any = useState('');
    const [unit, setUnit]: any = useState('');
    const [isLoaded, setIsLoaded]: any = useState('');
    const [product, setProduct] = useState<ProductDto>();

    useEffect(() => {
        fetchProduct()
        fetchCategories()
            .then((_ => setIsLoaded(true)))
    }, )

    const gibPath = ():number => {
        const path = window.location.pathname;
        return +path.substring(path.lastIndexOf("/") + 1)
    }

    const fetchProduct = (): Promise<ProductDto> => {
        return ProductService
            .getProduct(gibPath())
            .then((response:ProductDto) => {
                setProduct(response);
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

    const handlePut = () => {
        ProductService.putProduct({
            id: product!.id,
            name: name,
            type: product!.type,
            category_id: +category,
            tax_id: product!.tax_id,
            updated_at: product!.updated_at,
            measure_type: unit
        }).then(ProductService.getProducts)
    }

    const findCategoryName = (): string => {
        return categories.find(category => category.id === product?.category_id)?.name ?? 'brak danych';
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
                        <div className="form-group col-lg-6 col-sm-12 m-auto" style={{border: "solid"}}>
                            <h4 className="text-start m-3">Edytuj Produkt:</h4>
                            <input className="form-control my-1" value={product?.name} onChange={(e) => {
                                setName(e.target.value)
                            }}/>
                            <div className="input-group mb-1">
                                <div className="input-group-prepend">
                                    <label className="input-group-text" htmlFor="inputGroupSelect01"
                                           style={{width: "6rem"}}>Kategoria</label>
                                </div>
                                <select onChange={(e) => setCategory(e.target.value)} className="custom-select mx-1 flex-fill" style={{width:"10rem"}}
                                        id="inputGroupSelect01">
                                    <option defaultValue={""}>{findCategoryName()}</option>
                                    {isLoaded ? categories.map(category => <option key={generateUniqueID()}
                                                                                   value={category.id}>{category.name}</option>) : ""}
                                </select>
                            </div>
                            <div className="input-group mb-1">
                                <div className="input-group-prepend">
                                    <label className="input-group-text " htmlFor="inputGroupSelect02"
                                           style={{width: "6rem"}}>Jednostka</label>
                                </div>
                                <select onChange={(e) => setUnit(e.target.value)} className="custom-select mx-1 flex-fill" style={{width:"10rem"}}
                                        id="inputGroupSelect02">
                                    <option disabled={true}>{product?.measure_type}</option>
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