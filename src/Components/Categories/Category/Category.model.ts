export interface CategoryProps {
    props:CategoryDto;
}

export enum Status {
    ENABLED,
    DISABLED
}

export interface CategoryDto {
    name: string;
    id: number;
    uid: string;
    updated_at: Date;
    status: Status;
}