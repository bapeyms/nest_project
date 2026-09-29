export class CategoryGetResDto {
    id: number;
    title: string;
    slug: string;
    image?: string | null;
    // ! означає, що це поле точно буде існувати
    parent_id!: number | null;
    is_show: boolean;
    description: string;
};