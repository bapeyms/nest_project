import { Inject, Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity.js';
import { Repository } from 'typeorm';

import { ProductGetResDto } from './dto/category_get.res.dto.js';
import { ProductCreateReqDto } from './dto/product_create.req.dto.js';
import { ProductUpdateResDto } from './dto/category_update.req.dto.js';
import { ProductPatchResDto } from './dto/category_patch.req.dto.js';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) 
  private readonly _repository: Repository<Product>) {}
  
  async findAll(): Promise<ProductGetResDto[]> {
    return await this._repository.find();
  }

  async getCategoryById(id: number): Promise<ProductGetResDto> {
    const category = await this._repository.findOneBy({id});
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} is not found`)
    }
    return category;
  }
  
  async create(dto: ProductCreateReqDto): Promise<ProductGetResDto> {
    const category = this._repository.create({
      title: dto.title,
      slug: dto.slug,
      price: dto.price,
      category_id: dto.category_id
    });
    
    const result = await this._repository.save(category);
    return {
      id: result.id,
      title: result.title,
      slug: result.slug,
      price: result.price,
      category_id: result.category_id
    };
  }
  
  async deleteCategoryById(id: number): Promise<ProductGetResDto> {
    const category = await this._repository.findOneBy({id});
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} is not found`)
    }
    
    await this._repository.remove(category);
    return {
      id: category.id,
      title: category.title,
      slug: category.slug,
      price: category.price,
      category_id: category.category_id
    };
  }
}
