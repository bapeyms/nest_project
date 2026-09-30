import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CategoryModule } from './category/category.module.js';
import { TypeOrmModule } from '@nestjs/typeorm'; // для роботи з реляційними та деякими NoSQL базами даних
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module.js';
import { UserModule } from './user/user.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    // підключення до pg
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true
    }),
    CategoryModule,
    ProductModule,
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
