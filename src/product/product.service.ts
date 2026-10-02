import { Inject, Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity.js';
import { Repository } from 'typeorm';

import { ProductGetResDto } from './dto/category_get.res.dto.js';
import { ProductCreateReqDto } from './dto/product_create.req.dto.js';
import { ProductUpdateReqDto } from './dto/category_update.req.dto.js';
import { ProductPatchReqDto } from './dto/category_patch.req.dto.js';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) 
  private readonly _repository: Repository<Product>) {}
  
  async findAll(): Promise<ProductGetResDto[]> {
    return await this._repository.find();
  }

  async getProductById(id: number): Promise<ProductGetResDto> {
    const product = await this._repository.findOneBy({id});
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} is not found`)
    }
    return product;
  }
  
  async create(dto: ProductCreateReqDto): Promise<ProductGetResDto> {
    const product = this._repository.create({
      title: dto.title,
      slug: dto.slug,
      price: dto.price,
      category_id: dto.category_id
    });
    
    const result = await this._repository.save(product);
    return {
      id: result.id,
      title: result.title,
      slug: result.slug,
      price: result.price,
      category_id: result.category_id
    };
  }
  
  async deleteProductById(id: number): Promise<ProductGetResDto> {
    const product = await this._repository.findOneBy({id});
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} is not found`)
    }
    
    await this._repository.remove(product);
    return {
      id: product.id,
      title: product.title,
      slug: product.slug,
      price: product.price,
      category_id: product.category_id
    };
  }

  async updateProduct(id: number, dto: ProductUpdateReqDto): Promise<ProductGetResDto> {
    const product = await this._repository.findOneBy({id});
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} is not found`)
    }
  
    if (dto.slug && dto.slug !== product.slug) {
      const existingSlug = await this._repository.findOneBy({slug: dto.slug});
      if (existingSlug) {
        throw new ConflictException(`Product with slug ${dto.slug} is already exist`)
      }
    }
  
      product.title = dto.title;
      product.slug = dto.slug;
      product.price = dto.price;
      product.category_id = dto.category_id;
  
      const updatedProduct = await this._repository.save(product);
      return {
        id: updatedProduct.id,
        title: updatedProduct.title,
        slug: updatedProduct.slug,
        price: updatedProduct.price,
        category_id: updatedProduct.category_id
      };
    }
  
    async patchProduct(id: number, dto: ProductPatchReqDto): Promise<ProductGetResDto> {
      const product = await this._repository.findOneBy({id});
      if (!product) {
        throw new ConflictException(`Product with ID ${id} is not found`)
      }
  
      if (dto.slug && dto.slug !== product.slug) {
        const existingSlug = await this._repository.findOneBy({slug: dto.slug});
        if (existingSlug) {
          throw new NotFoundException(`Product with slug ${dto.slug} is already exist`)
        }
      }
      Object.assign(product, dto);
      const updatedProduct = await this._repository.save(product);
      return {
        id: updatedProduct.id,
        title: updatedProduct.title,
        slug: updatedProduct.slug,
        price: updatedProduct.price,
        category_id: updatedProduct.category_id
      };
    }
}
