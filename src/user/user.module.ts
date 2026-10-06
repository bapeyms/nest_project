import { Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity.js';
import { HashHelper } from '../helpers/hash.helper.js';
import { Address } from './entities/address.entity.js';
import { City } from '../location/entities/city.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([User, Address, City])],
  controllers: [UserController],
  providers: [UserService, HashHelper],
})
export class UserModule {}