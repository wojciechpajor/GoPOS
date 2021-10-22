export interface ProductProps {
    props:ProductDto
}

export interface ProductDto {
    id: number;
    uid: string,
    name: string,
    recipe_amount: number,
    category_id: 45,
    updated_at: Date,
}