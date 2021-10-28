import axios from "axios";
import {CategoryDto} from "./Category/Category.model";
import {toast, ToastOptions} from "react-toastify";

axios.defaults.headers.common["Authorization"] = 'fd9ba9e1-0788-4e8f-ac46-a43df43e205e';
const URL = "https://newdemostock.gopos.pl/ajax/219";

const getCategories = (): Promise<CategoryDto[]> => {
    return axios.get<CategoryDto[]>(`${URL}/product_categories?size=100`)
        .then((response: any) => response.data.data as CategoryDto[])
}

const getCategory = (id: number): Promise<CategoryDto> => {
    return axios.get<CategoryDto>(`${URL}/product_categories/${id}`)
        .then((response: any) => response.data.data as CategoryDto)
}

const postCategory = (name: string): Promise<void> => {
    return axios.post(`${URL}/product_categories`,
        {
            "name": name,
        })
        .then((_) => showToast('SUCCESS', "Dodano kategorię"))
        .catch((error) => showToast('ERROR', error.message))
}

const deleteCategory = (id: number): Promise<void> => {
    return axios.delete(`${URL}/product_categories/${id}`)
        .then((_) => showToast('SUCCESS', "Usunięto kategorię"))
        .catch((error) => showToast('ERROR', error.message))
}

const putCategory = (category: CategoryDto): Promise<void> => {
    return axios.put(`${URL}/product_categories/${category.id}`,
        {
            "name": category.name,
            "id": +category.id,
            "updated_at": category.updated_at,
            "status": "ENABLED",
            "uid": category.uid
        })
        .then((_) => showToast('SUCCESS', "Edytowano kategorię"))
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

const CategoryService = {
    getCategories,
    getCategory,
    postCategory,
    deleteCategory,
    putCategory
};

export default CategoryService;