import {CategoryDto} from "../../Categories/Category/Category.model";

export interface ProductProps {
    product: ProductDto
    categories: CategoryDto[]
}

export interface ProductDto {
    id: number,
    name: string,
    type: string,
    category_id: number,
    tax_id: number,
    updated_at: Date,
    measure_type: string
}