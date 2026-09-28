import { Injectable } from "@nestjs/common";
import { CategoryCreateReqDto } from "./dtos/category_create.request.dto.js";
import { CategoryGetResDto } from "./dtos/category_get.res.dto.js";

@Injectable()
export class CategoryService {
  private categories: CategoryGetResDto[] = [
    {
      id: 1,
      title: "Chick",
      slug: "chick chick",
      image: 'pic1.jpg',
      parent_id: 1
    },
    {
      id: 2,
      title: "Chirick",
      slug: "chirick chirick",
      image: 'pic2.jpg',
      parent_id: 2
    }
  ];
  getCategories(): CategoryGetResDto[] {
    return this.categories;
  }
  getCategoryById(id: number): CategoryGetResDto | undefined {
    return this.categories.find(category => category.id === id);
  }

  addCategory(category: CategoryCreateReqDto): CategoryGetResDto {
    const newCategory: CategoryGetResDto = {
      id: this.categories.length + 1,
      title: category.title,
      slug: category.slug,
      image: category.image,
      parent_id: category.parent_id
    };

    this.categories.push(newCategory);
    return newCategory;
  }

  deleteCategory(id: number) : CategoryGetResDto | undefined {
    const index = this.categories.findIndex(category => category.id === id);
    if (index === -1) {
      return undefined;
    }
    const deletedCategory = this.categories[index];
    this.categories.splice(index, 1);

    return deletedCategory;
  }

  updateCategory(id: number, category: CategoryCreateReqDto): CategoryGetResDto | undefined {
    const existingCategoty = this.categories.find(category => category.id === id);
    if (existingCategoty === undefined) {
      return undefined;
    }

    existingCategoty.title = category.title;
    existingCategoty.slug = category.slug;
    existingCategoty.image = category.image;
    existingCategoty.parent_id = category.parent_id;

    return existingCategoty;
  }
}
