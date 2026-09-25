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

  deleteCategory(id: number) : CategoryType | undefined {
    const index = this.categories.findIndex(category => category.id === id);
    if (index === -1) {
      return undefined;
    }
    const deletedCategory = this.categories[index];
    this.categories.splice(index, 1);

    return deletedCategory;
  }

  updateCategory(id: number, category: CategoryCreateType): CategoryType | undefined {
    const existingCategoty = this.categories.find(category => category.id === id);
    if (existingCategoty === undefined) {
      return undefined;
    }

    existingCategoty.title = category.title;
    existingCategoty.image = category.image;
    existingCategoty.parent_id = category.parent_id;

    return existingCategoty;
  }
}
