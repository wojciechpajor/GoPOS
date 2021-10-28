import axios from "axios";
import {ProductDto} from "./Product/Product.model";
import {toast, ToastOptions} from "react-toastify";
import {CategoryDto} from "../Categories/Category/Category.model";

axios.defaults.headers.common["Authorization"] = 'fd9ba9e1-0788-4e8f-ac46-a43df43e205e';
const URL = "https://newdemostock.gopos.pl/ajax/219";

const getProducts = (): Promise<ProductDto[]> => {
    return axios.get<ProductDto[]>(`${URL}/products?size=100`)
        .then((response: any) => response.data.data as ProductDto[])
}

const getCategories = (): Promise<CategoryDto[]> => {
    return axios.get<CategoryDto[]>(`${URL}/product_categories?size=100`)
        .then((response: any) => response.data.data as CategoryDto[])
}

const getProduct = (id: number): Promise<ProductDto> => {
    return axios.get<ProductDto>(`${URL}/products/${id}`)
        .then((response: any) => response.data.data as ProductDto)
}

const deleteProduct = (id: number): Promise<void> => {
    return axios.delete(`${URL}/products/${id}`)
        .then((_) => showToast('SUCCESS', "Usunięto produkt"))
        .catch((error) => showToast('ERROR', error.message))
}

const putProduct = (product: ProductDto): Promise<void> => {
    return axios.put(`${URL}/products/${product.id}`,
        {
            "name": product.name,
            "type": "BASIC",
            "updated_at": null,
            "tax_id": 1,
            "category_id": +product.category_id,
            "measure_type": product.measure_type.toUpperCase(),
        })
        .then((_) => showToast('SUCCESS', "Edytowano produkt"))
        .catch((error) => showToast('ERROR', error.message))
}

const postProduct = (name:string,category_id:number,measure_type:string): Promise<void> => {
    return axios.post(`${URL}/products`,
        {
            "name": name,
            "type": "BASIC",
            "updated_at": null,
            "tax_id": 1,
            "category_id": +category_id,
            "measure_type": measure_type.toUpperCase(),
        })
        .then((_) => showToast('SUCCESS', "Dodano produkt"))
        .catch((error) => showToast('ERROR', error.message))
}


const showToast = (status: 'SUCCESS' | 'ERROR', message: string): void => {

    const options: ToastOptions = {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };

    switch (status) {
        case "SUCCESS":
            toast.success(message, options);
            break;
        case "ERROR":
            toast.error(message, options);
            break;
        default:
            break;
    }

}

const ProductService = {
    getProducts,
    getCategories,
    getProduct,
    postProduct,
    deleteProduct,
    putProduct
};

export default ProductService;