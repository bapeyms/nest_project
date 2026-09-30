import { Inject, Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity.js';
import { Repository } from 'typeorm';

import { CategoryCreateReqDto } from './dtos/category_create.request.dto.js';
import { CategoryGetResDto } from './dtos/category_get.res.dto.js';
import { CategoryUpdateReqDto } from './dtos/category_update.req.dto.js';
import { CategoryPatchReqDto } from './dtos/category_patch.req.dto.js';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category)
  private readonly _repository: Repository<Category>,) { }

  async findAll(): Promise<CategoryGetResDto[]> {
    return await this._repository.find();
  }

  async getCategoryById(id: number): Promise<CategoryGetResDto> {
    const category = await this._repository.findOneBy({id});
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} is not found`)
    }
    return category;
  }

  async create(dto: CategoryCreateReqDto): Promise<CategoryGetResDto> {
    const category = this._repository.create({
      title: dto.title,
      slug: dto.slug,
      image: dto.image,
      is_show: true,
      parent_id: dto.parent_id,
      description: dto.description,
    });
    const result = await this._repository.save(category);
    return {
      id: result.id,
      title: result.title,
      slug: result.slug,
      image: result.image ?? '',
      parent_id: result.parent_id,
      is_show: result.is_show,
      description: result.description
    };
  }

  async deleteCategoryById(id: number): Promise<CategoryGetResDto> {
    const category = await this._repository.findOneBy({id});
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} is not found`)
    }

    await this._repository.remove(category);
    return {
      id: category.id,
      title: category.title,
      slug: category.slug,
      image: category.image ?? '',
      parent_id: category.parent_id,
      is_show: category.is_show,
      description: category.description
    };
  }

  async updateCategory(id: number, dto: CategoryUpdateReqDto): Promise<CategoryGetResDto> {
    const category = await this._repository.findOneBy({id});
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} is not found`)
    }

    if (dto.slug && dto.slug !== category.slug) {
      const existingSlug = await this._repository.findOneBy({slug: dto.slug});
      if (existingSlug) {
        throw new ConflictException(`Category with slug ${dto.slug} is already exist`)
      }
    }

    category.title = dto.title;
    category.slug = dto.slug;
    category.image = dto.image ?? null;
    category.is_show = dto.is_show;
    category.parent_id = dto.parent_id ?? null;
    category.description = dto.description;

    const updatedCategory = await this._repository.save(category);
    return {
      id: updatedCategory.id,
      title: updatedCategory.title,
      slug: updatedCategory.slug,
      image: updatedCategory.image ?? '',
      parent_id: updatedCategory.parent_id,
      is_show: updatedCategory.is_show,
      description: updatedCategory.description
    };
  }

  async patchCategory(id: number, dto: CategoryPatchReqDto): Promise<CategoryGetResDto> {
    const category = await this._repository.findOneBy({id});
    if (!category) {
      throw new ConflictException(`Category with ID ${id} is not found`)
    }

    if (dto.slug && dto.slug !== category.slug) {
      const existingSlug = await this._repository.findOneBy({slug: dto.slug});
      if (existingSlug) {
        throw new NotFoundException(`Category with slug ${dto.slug} is already exist`)
      }
    }
    Object.assign(category, dto);
    const updatedCategory = await this._repository.save(category);
    return {
      id: updatedCategory.id,
      title: updatedCategory.title,
      slug: updatedCategory.slug,
      image: updatedCategory.image ?? '',
      parent_id: updatedCategory.parent_id,
      is_show: updatedCategory.is_show,
      description: updatedCategory.description
    };
  }
}
