import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // endpoints - точки входу
  @Get('/chick')
  getTest(): string {
    return "Hello CHICK Method"
  }

  @Get('/product/id/:id')
  getProductById(@Param('id') id: string): string {
    return `Hello from Nest! Your ID: ${+id}`
  }

  @Get('/product/title/:title')
  getProductByTitle(@Param('title') title: string): string {
    return `Hello from Nest! Title: ${title}`
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
