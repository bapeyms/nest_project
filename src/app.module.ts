import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CategoryModule } from './category/category.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // підключення до pg
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: ''
    }),
    CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
