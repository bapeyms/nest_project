import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CategoryCreateReqDto } from './dtos/category_create.request.dto.js';
import { CategoryGetResDto } from './dtos/category_get.res.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity.js';
import { Repository } from 'typeorm';

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
}
