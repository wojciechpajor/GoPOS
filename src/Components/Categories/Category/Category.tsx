import React from 'react';
import {CategoryProps} from "./Category.model";
import CategoryService from "../Category.service";

const Category = (categoryItem:CategoryProps) => {

    const handleDelete = () => {
        CategoryService.deleteCategory(categoryItem.props.id)
            .then()
    }

    return(
        <div className="col-md-6 col-lg-4 p-4">
            <div className="card" style={{minHeight: "15rem"}}>
                <div className="card-block m-3 text-start">
                    <h4 className="card-title p-1 text-wrap">{categoryItem.props.name}</h4>
                    <h6 className="card-subtitle text-muted pb-2">Updated at: 2021-01-30</h6>
                    <div style={{marginTop:"5rem"}} >
                        <a href={`/category/edit/${categoryItem.props.id}`} className="btn btn-warning m-1">Edytuj</a>
                        <button onClick={handleDelete} className="btn btn-danger">Usuń</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category;