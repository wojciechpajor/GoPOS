export interface CategoryProps {
    props: CategoryDto;
}


export interface CategoryDto {
    name: string,
    id: number,
    uid: string,
    updated_at: Date,
}