export class CategoryUpdateReqDto {
    id: number;
    title: string;
    slug: string;
    image?: string | null;
    parent_id!: number | null;
    is_show: boolean;
    description: string;
}