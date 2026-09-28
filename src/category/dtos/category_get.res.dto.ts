export class CategoryGetResDto {
    id: number;
    title: string;
    slug: string;
    image?: string;
    // ! означає, що це поле точно буде існувати
    parent_id!: number | null;
};