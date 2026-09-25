import { Injectable } from "@nestjs/common";
import { CategoryCreateType, CategoryType } from "./type/CategoryType.js";

@Injectable()
export class CategoryService {
  private categories: CategoryType[] = [
    {
      id: 1,
      title: "Chick",
      image: 'pic1.jpg',
      parent_id: 1
    },
    {
      id: 2,
      title: "Chirick",
      image: 'pic2.jpg',
      parent_id: 2
    }
  ];
  getCategories(): CategoryType[] {
    return this.categories;
  }
  getCategoryById(id: number): CategoryType | undefined {
    return this.categories.find(category => category.id === id);
  }

  addCategory(categoty: CategoryCreateType): CategoryType {
    const newCategory: CategoryType = {
      id: this.categories.length + 1,
      title: categoty.title,
      image: categoty.image,
      parent_id: categoty.parent_id
    };

    this.categories.push(newCategory);
    return newCategory;
  }
}
