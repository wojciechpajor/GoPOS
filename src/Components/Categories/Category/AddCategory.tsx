import React, {useState} from "react";
import {ToastContainer} from "react-toastify";
import CategoryService from "../Category.service";

const AddCategory = () => {

    const [name, setName] = useState('');

    const handlePost = () => {
        CategoryService
            .postCategory(name)
            .then()
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
            <div className="form-group col-lg-6 col-sm-12 m-auto bg-light p-3">
                <h4 className="text-start m-3">Nowa kategoria</h4>
                <div className="input-group mb-1">
                    <div className="input-group-prepend">
                        <label className="input-group-text"
                               htmlFor="name"
                               style={{width: "6rem"}}>
                            Nazwa
                        </label>
                    </div>
                    <input id="name"
                           placeholder="Podaj nazwę nowej kategorii"
                           className="form-control mx-1"
                           onChange={e => setName(e.target.value)}/>
                </div>
                <button onClick={handlePost} data-bs-toogle="modal" data-bs-target="#reg-modal"
                        className="btn mb-1 btn-primary">Dodaj Kategorie
                </button>
            </div>
        </div>
    )
}

export default AddCategory;