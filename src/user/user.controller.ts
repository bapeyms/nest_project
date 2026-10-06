import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe} from '@nestjs/common';
import { UserService } from './user.service.js';
import { CreateUserReqDto } from './dto/create-user.req.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { CreateAddressReqDto } from './dto/create-address.req.dto.js';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserReqDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post(':id/addresses')
  addAddress(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateAddressReqDto,
  ) {
    return this.userService.addAddress(id, dto);
  }

  // GET /users/:id/addresses - Отримати список усіх адрес користувача
  @Get(':id/addresses')
  getUserAddresses(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserAddresses(id);
  }
}
