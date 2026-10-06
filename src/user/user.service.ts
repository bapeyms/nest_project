import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { CreateUserReqDto } from './dto/create-user.req.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import {CreateAddressReqDto} from './dto/create-address.req.dto.js';
import { HashHelper } from '../helpers/hash.helper.js';

import { User } from './entities/user.entity.js';
import {Address} from './entities/address.entity.js';
import {City} from '../location/entities/city.entity.js';

import { ConflictException } from '@nestjs/common/exceptions/conflict.exception.js';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception.js';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly _repository: Repository<User>,
    @InjectRepository(Address)
    private readonly _addressRepository: Repository<Address>,
    @InjectRepository(City)
    private readonly _cityRepository: Repository<City>,
    private readonly _hashHelper: HashHelper,
  ) {}

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

  async addAddress(userId: number, dto: CreateAddressReqDto) {
    const user = await this._repository.findOne(
      { where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    const city = await this._cityRepository.findOne(
      { where: { id: dto.cityId } });
    if (!city) {
      throw new NotFoundException(`City with id ${dto.cityId} not found`);
    }

    if (dto.isDefault) {
      await this._addressRepository.update(
        { user: { id: userId } },
        { isDefault: false },
      );
    }

    const address = this._addressRepository.create({
      street: dto.street,
      building: dto.building,
      apartment: dto.apartment,
      postalCode: dto.postalCode,
      isDefault: dto.isDefault ?? false,
      user,
      city,
    });
    return await this._addressRepository.save(address);
  }

  async getUserAddresses(userId: number) {
    const user = await this._repository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    return await this._addressRepository.find({
      where: { user: { id: userId } },
      relations: {
        city: {
          country: true
        }
      },
    });
  }
 
}
