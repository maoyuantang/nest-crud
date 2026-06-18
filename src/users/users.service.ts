// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PrismaClient } from '@prisma/client';

// 直接实例化，不用传任何参数
const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  // ... 所有方法保持不变
  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await prisma.user.create({
      data: createUserDto,
    });
    return newUser;
  }

  async findAll(): Promise<User[]> {
    return await prisma.user.findMany();
  }

  async findOne(id: number): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`用户 ID ${id} 不存在`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });
    if (!existingUser) {
      throw new NotFoundException(`用户 ID ${id} 不存在`);
    }
    return await prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number): Promise<User> {
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });
    if (!existingUser) {
      throw new NotFoundException(`用户 ID ${id} 不存在`);
    }
    return await prisma.user.delete({
      where: { id },
    });
  }
}