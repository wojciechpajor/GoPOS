import React, {FunctionComponent} from 'react';
import {ProductProps} from "./Product.model";
import ProductService from "../Product.service";

const Product: FunctionComponent<ProductProps> = ({product, categories}) => {

    const handleDelete = () => {
        ProductService.deleteProduct(product.id)
            .then(ProductService.getProducts)
    }


    const findCategoryName = (): string => {
        return categories.find(category => category.id === product.category_id)?.name ?? 'brak danych';
    }

    return (
            <div className="col-md-6 col-lg-4 p-4">
                <div className="card" style={{minHeight: "15rem"}}>
                    <div className="card-block m-3 text-start">
                        <h4 className="card-title p-1 text-wrap">{product.name}</h4>
                        <h6 className="card-subtitle text-muted pb-2">Updated at: 2021-01-30</h6>
                        <p className="card-text">
                            <p className="m-0 p-0">Kategoria: {findCategoryName()}</p>
                            <p className="m-0 p-0">Jednostka: {product.measure_type}</p>
                        </p>
                        <div className="pt-4">
                            <a href={`/product/edit/${product.id}`} className="btn btn-warning m-1">Edytuj</a>
                            <button onClick={handleDelete} className="btn btn-danger">Usuń</button>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Product;