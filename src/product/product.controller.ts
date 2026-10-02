import { Controller } from '@nestjs/common';
import {Get, Post, Param, Body, Delete, Put, Patch} from '@nestjs/common';

import { ProductCreateReqDto } from './dto/product_create.req.dto.js';
import { ProductGetResDto } from './dto/category_get.res.dto.js';
import { ProductUpdateReqDto } from './dto/category_update.req.dto.js';
import { ProductPatchReqDto } from './dto/category_patch.req.dto.js';

import { ProductService } from './product.service.js';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(): Promise<ProductGetResDto[]> {
    return await this.productService.findAll();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<ProductGetResDto> {
    return await this.productService.getProductById(+id);
  }

  @Post()
  async create(
    @Body() dto: ProductCreateReqDto): Promise<ProductGetResDto> {
    return await this.productService.create(dto);
  }

  @Delete(':id')
  async deleteProductById(@Param('id') id: string): Promise<ProductGetResDto> {
    return await this.productService.deleteProductById(+id);
  }

  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() dto: ProductUpdateReqDto): Promise<ProductGetResDto> {
    return await this.productService.updateProduct(+id, dto);
  }

  @Patch(':id')
  async patchProduct(@Param('id') id: string, @Body() dto: ProductPatchReqDto): Promise<ProductGetResDto> {
    return await this.productService.patchProduct(+id, dto);
  }
}
