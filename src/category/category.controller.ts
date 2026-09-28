import { Controller, Get, Post, Param, Body, Delete, Put, NotFoundException } from '@nestjs/common';
import { CategoryService } from './category.service.js';
import { CategoryCreateReqDto } from './dtos/category_create.request.dto.js';
import { CategoryGetResDto } from './dtos/category_get.res.dto.js';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAllCategories(): CategoryGetResDto[] {
    return this.categoryService.getCategories();
  }
  
  @Get(':id')
  getCategoryById(@Param('id') id: string): CategoryGetResDto {
    const category: CategoryGetResDto | undefined = 
    this.categoryService.getCategoryById(+id)
    if (category !== undefined) {
      return category;
    }
    throw new NotFoundException('Category not found');
  }

  @Post()
  createCategory(@Body() category:CategoryCreateReqDto): CategoryGetResDto {
    return this.categoryService.addCategory(category);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: string): CategoryGetResDto {
    const category = this.categoryService.deleteCategory(+id);
    if (category !== undefined) {
      return category;
    }

    throw new NotFoundException('Category not found');
  }

  @Put(':id')
  updateCategory(@Param('id') id: string, @Body() category: CategoryCreateReqDto): CategoryGetResDto {
    const updatedCategory = this.categoryService.updateCategory(+id, category);
    if (updatedCategory !== undefined) {
      return updatedCategory;
    }
    throw new NotFoundException('Category not found');
  }
}
