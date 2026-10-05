import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserReqDto } from './dto/create-user.req.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { HashHelper } from '../helpers/hash.helper.js';

import { ConflictException } from '@nestjs/common/exceptions/conflict.exception.js';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception.js';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) 
  private readonly _repository: Repository<User>,
  private readonly _hashHelper:HashHelper) {}

  async create(createUserDto: CreateUserReqDto) {
    const existingUser = await this._repository.findOne({
      where: {email: createUserDto.email}
    });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await this._hashHelper.hash(createUserDto.password);
    const {password, ...userData} = createUserDto;
    const user = this._repository.create({
      ...userData,
      password_hash: hashedPassword
    })
    const savedUser = await this._repository.save(user);
    const {password_hash, ...result} = savedUser;
    return result;
  }

  async findAll() {
    return await this._repository.find();
  }

  async findOne(id: number) {
    const user = await this._repository.findOne({
      where: {id}
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this._repository.findOne(
      { where: { id }}
    );
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const { password, ...updateData } = updateUserDto;
    const dataToUpdate: Partial<User> = { ...updateData };
    if (password) {
      dataToUpdate.password_hash = await this._hashHelper.hash(password);
    }
    const updatedUser = this._repository.merge(user, dataToUpdate);
    const savedUser = await this._repository.save(updatedUser);
    const { password_hash, ...result } = savedUser;
    return result;
  }

  async remove(id: number) {
    const user = await this._repository.findOne(
      { where: { id }}
    );
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return await this._repository.remove(user);
  }
}
