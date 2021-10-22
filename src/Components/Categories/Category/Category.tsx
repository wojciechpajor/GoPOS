import React from 'react';
import {CategoryProps} from "./Category.model";

const Category = (categoryItem:CategoryProps) => {
    return(
        <div className="container mt-1" style={{border: "solid"}}  key="{categoryItem.id}">
            <h5>Nazwa: {categoryItem.props.name}</h5>
        </div>
    )
}

export default Category;