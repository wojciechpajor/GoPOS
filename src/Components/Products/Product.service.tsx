import axios from "axios";
import {ProductDto} from "./Product/Product.model";
import {toast, ToastOptions} from "react-toastify";

const URL = "https://newdemostock.gopos.pl/ajax/219";

const getProducts = (): Promise<ProductDto[]> => {
    return axios.get<ProductDto[]>(`${URL}/products?size=100`)
        .then((response: any) => response.data.data as ProductDto[])
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
    deleteProduct,
    putProduct
};

export default ProductService;