// DTO - Data Transfer Object приймає метод контролера та може їх повертати
import { IsString, IsOptional } from "class-validator";

export class CategoryCreateReqDto {
    @IsString({message: "Title must be string!"})
    title: string;
    @IsString({message: "Slug must be string!"})
    slug: string;
    @IsString({message: "Image path must be string!"})
    image?: string;
    parent_id: number | null;
};