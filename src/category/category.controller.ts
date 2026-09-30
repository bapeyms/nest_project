import { Controller, Get, Post, Param, Body, Delete, Put, Patch } from '@nestjs/common';
import { CategoryService } from './category.service.js';

import { CategoryCreateReqDto } from './dtos/category_create.request.dto.js';
import { CategoryGetResDto } from './dtos/category_get.res.dto.js';
import { CategoryUpdateReqDto } from './dtos/category_update.req.dto.js';
import { CategoryPatchReqDto } from './dtos/category_patch.req.dto.js';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories(): Promise<CategoryGetResDto[]> {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: string): Promise<CategoryGetResDto> {
    return await this.categoryService.getCategoryById(+id);
  }

  @Post()
  async create(
    @Body() dto: CategoryCreateReqDto): Promise<CategoryGetResDto> {
    return await this.categoryService.create(dto);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string): Promise<CategoryGetResDto> {
    return await this.categoryService.deleteCategoryById(+id);
  }

  @Put(':id')
  async updateCategory(@Param('id') id:string, @Body() dto:CategoryUpdateReqDto): Promise<CategoryGetResDto> {
    return await this.categoryService.updateCategory(+id, dto);
  }

  @Patch(':id')
  async patchCategory(@Param('id') id:string, @Body() dto:CategoryPatchReqDto): Promise<CategoryGetResDto> {
    return await this.categoryService.updateCategory(+id, dto);
  }

  // @Get(':id')
  // getCategoryById(@Param('id') id: string): CategoryGetResDto {
  //   const category: CategoryGetResDto | undefined = 
  //   this.categoryService.getCategoryById(+id)
  //   if (category !== undefined) {
  //     return category;
  //   }
  //   throw new NotFoundException('Category not found');
  // }

  // @Post()
  // createCategory(@Body() category:CategoryCreateReqDto): CategoryGetResDto {
  //   return this.categoryService.addCategory(category);
  // }

  // @Delete(':id')
  // deleteCategory(@Param('id') id: string): CategoryGetResDto {
  //   const category = this.categoryService.deleteCategory(+id);
  //   if (category !== undefined) {
  //     return category;
  //   }

  //   throw new NotFoundException('Category not found');
  // }

  // @Put(':id')
  // updateCategory(@Param('id') id: string, @Body() category: CategoryCreateReqDto): CategoryGetResDto {
  //   const updatedCategory = this.categoryService.updateCategory(+id, category);
  //   if (updatedCategory !== undefined) {
  //     return updatedCategory;
  //   }
  //   throw new NotFoundException('Category not found');
  // }
}
