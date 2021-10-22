import React from 'react';
import Product from "./Product/Product";
import {useEffect, useState} from "react";
import axios from "axios";
import {ProductDto} from "./Product/Product.model";

const Products = () => {
    const [items, setItems] = useState<ProductDto[] | []>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [input, setInput] = useState('');
    const url = "https://newdemostock.gopos.pl//ajax/219/products"

    useEffect(() => {
    const fetchData = async () => {
        const result:any = await axios.get(url)
        await setItems(result.data.data)
        await (setIsLoaded(true))
    };
    fetchData();
    }, [])

    const handleClick = () => {
        axios.post('https://newdemostock.gopos.pl//ajax/219/product_categories', {
            "name": input
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    return(
        <div className="container">
            <div className="row">
                <div className="form-group mt-1" style={{border: "solid"}}>
                    <input className="form-control mt-1"  placeholder="Nazwa" onChange={(e) => {setInput(e.target.value)}}></input>
                    <input className="form-control mt-1"  placeholder="Kategoria" onChange={(e) => {setInput(e.target.value)}}></input>
                    <input className="form-control mt-1"  placeholder="Typ" onChange={(e) => {setInput(e.target.value)}}></input>
                    <input className="form-control mt-1"  placeholder="Jednostka" onChange={(e) => {setInput(e.target.value)}}></input>
                    <button onClick={handleClick} className="btn m-1" style={{border: "solid"}}>Dodaj Produkt</button>
                </div>
                {
                    isLoaded
                        ? items.map(item => <Product key={item.id} props={item}/>)
                        : <div>Loading</div>
                }
            </div>
        </div>
    )
}

export default Products;