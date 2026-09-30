import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserReqDto } from './dto/create-user.req.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { HashHelper } from '../helpers/hash.helper.js';


@Injectable()
export class UserService {
  constructor(@InjectRepository(User) 
  private readonly _repository: Repository<User>,
  private readonly _hashHelper:HashHelper) {}

  async create(createUserDto: CreateUserReqDto) {
    const hashedPassword = await this._hashHelper.hash(createUserDto.password);
    const user = this._repository.create({
      ...createUserDto,
      password_hash: hashedPassword
    })
    return await this._repository.save(user);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
