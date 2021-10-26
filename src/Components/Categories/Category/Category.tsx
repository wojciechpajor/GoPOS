import React, {useState} from 'react';
import {CategoryProps} from "./Category.model";
import axios from "axios";
import {toast} from "react-toastify";

const Category = (categoryItem:CategoryProps) => {

    const url = "https://newdemostock.gopos.pl//ajax/219/product_categories"
    const [isChecked, setIsChecked] = useState(false);
    const [inputEdit, setInputEdit] = useState('');

    const handleDelete = (key: any) => {
        axios.delete(`${url}/${key}`)
            .then((response) => {
                if (response.status === 204) {
                    toast.success("Usunięto kategorie", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                else {
                    console.log(response);
                }
            })
            .catch((error) => {
                toast.error(error.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
    }

    const handlePut = (key: any) => {
        axios.put(`${url}/${key}`, {
            "name": inputEdit
        })
            .then((response) => {
                if (response.status === 200) {
                    toast.success("Edytowano kategorie", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                else {
                    console.log(response);
                }
            })
            .catch((error) => {
                toast.error(error.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
    }

    const categoryHtml = () => {
    return <div>
        <input onChange={(e) => {
            setInputEdit(e.target.value)
        }} className="form-control my-1" placeholder={categoryItem.props.name}/>
        <button onClick={() => handlePut(categoryItem.props.id)} className="btn m-1 btn-warning">Edytuj produkt</button>
        <button onClick={() => handleDelete(categoryItem.props.id)} className="btn btn-danger m-1">Usuń Kategorię</button>
    </div>
    }

    return(
        <div className="container mt-1" style={{border: "solid"}}  key="{categoryItem.id}">
            <h5>Nazwa: {categoryItem.props.name}</h5>
            <input onChange={() => setIsChecked(!isChecked)} type={"checkbox"}/>
            <p>Edytuj</p>
            {
                isChecked
                    ? categoryHtml()
                    : ""
            }
        </div>
    )
}

export default Category;