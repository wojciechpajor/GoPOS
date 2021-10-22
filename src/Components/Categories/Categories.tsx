import React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import Category from "./Category/Category";
import {CategoryDto} from "./Category/Category.model";

const Categories = () => {
    const [items, setItems] = useState<CategoryDto[] | []>([]);;
    const [isLoaded, setIsLoaded] = useState(false);
    const [input, setInput] = useState('');
    const url = "https://newdemostock.gopos.pl//ajax/219/product_categories"

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
                    <input className="form-control mt-1"  placeholder="Nazwa kategorii" onChange={(e) => {setInput(e.target.value)}}></input>
                    <button onClick={handleClick} className="btn m-1" style={{border: "solid"}}>Dodaj kategorie</button>
                </div>
                {
                    isLoaded
                        ? items.map(item => <Category key={item.id} props={item}/>)
                        : <div>Loading</div>
                }
            </div>
        </div>
    )
}

export default Categories;