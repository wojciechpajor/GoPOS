import React, {FunctionComponent, useState} from 'react';
import {ProductProps} from "./Product.model";
import ProductService from "../Product.service";

const Product: FunctionComponent<ProductProps> = ({product, categories}) => {
    const [isChecked, setIsChecked] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedUnit, setSelectedUnit] = useState("");
    const [inputEdit, setInputEdit] = useState('');

    const handleDelete = () => {
        ProductService.deleteProduct(product.id)
            .then(ProductService.getProducts)
    }

    const handlePut = () => {
        ProductService.putProduct({
            id: product.id,
            name: inputEdit,
            type: product.type,
            category_id: +selectedCategory,
            tax_id: product.tax_id,
            updated_at: product.updated_at,
            measure_type: selectedUnit
        }).then(ProductService.getProducts)
    }

    const productHtml = () => {
        return <div>
            <div className="input-group">
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="name">Nazwa</label>
                </div>
                <input id="name"
                       type="text"
                       onChange={e => setInputEdit(e.target.value)}
                       className="form-control"
                       placeholder={product.name}/>
            </div>

            <div className="input-group">
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="category">Kategoria</label>
                </div>
                <select id="category"
                        onChange={e => setSelectedCategory(e.target.value)}
                        className="form-control">
                    <option defaultValue={""}>Wybierz kategorię</option>
                    {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                </select>
            </div>

            <div className="input-group">
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="unit">Jednostka</label>
                </div>
                <select id="unit"
                        onChange={e => setSelectedUnit(e.target.value)}
                        className="form-control">
                    <option defaultValue={""}>Wybierz jednostkę</option>
                    <option value="ITEM">sztuka</option>
                    <option value="LITER">litr</option>
                    <option value="KILOGRAM">kilogram</option>
                    <option value="PACKAGE">opakowanie</option>
                </select>
            </div>
            <button onClick={handlePut} className="btn m-1 btn-warning">
                Edytuj produkt
            </button>
            <button onClick={handleDelete} className="btn btn-danger">
                Usuń produkt
            </button>
        </div>;
    }

    const findCategoryName = (): string => {
        return categories.find(category => category.id === product.category_id)?.name ?? 'brak danych';
    }

    return (
        <div className="container mt-1" style={{border: "solid"}}>
            <h4>Nazwa: {product.name}</h4>
            <h4>Kategoria: {findCategoryName()}</h4>

            <input onChange={() => setIsChecked(!isChecked)} type={"checkbox"}/>
            <p>Edytuj</p>
            {
                isChecked
                    ? productHtml()
                    : ""
            }


        </div>
    )
}

export default Product;