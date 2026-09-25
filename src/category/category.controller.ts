import { Controller, Get, Post, Param, Body, Delete, Put, NotFoundException } from '@nestjs/common';
import { CategoryService } from './category.service.js';
import type { CategoryCreateType, CategoryType } from './type/CategoryType.js';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAllCategories(): CategoryType[] {
    return this.categoryService.getCategories();
  }
  
  @Get(':id')
  getCategoryById(@Param('id') id: string): CategoryType {
    const category: CategoryType | undefined = 
    this.categoryService.getCategoryById(+id)
    if (category !== undefined) {
      return category;
    }
    throw new NotFoundException('Category not found');
  }

  @Post()
  createCategory(@Body() category:CategoryCreateType): CategoryType {
    return this.categoryService.addCategory(category);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: string): CategoryType {
    const category = this.categoryService.deleteCategory(+id);
    if (category !== undefined) {
      return category;
    }

    throw new NotFoundException('Category not found');
  }

  @Put(':id')
  updateCategory(@Param('id') id: string, @Body() category: CategoryCreateType): CategoryType {
    const updatedCategory = this.categoryService.updateCategory(+id, category);
    if (updatedCategory !== undefined) {
      return updatedCategory;
    }
    throw new NotFoundException('Category not found');
  }
}
