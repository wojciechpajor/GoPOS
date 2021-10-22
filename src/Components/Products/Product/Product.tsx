import React from 'react';
import {ProductProps} from "./Product.model";

const Product = (productItem:ProductProps) => {
    return(
    <div className="container mt-1" style={{border: "solid"}}>
        <h5>Nazwa: {productItem.props.name}</h5>
        <h5>Kategoria: {productItem.props.category_id}</h5>
    </div>
    )
}

export default Product;