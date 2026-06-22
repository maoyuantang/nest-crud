// src/users/users.service.ts
import { QueryUserDto } from './dto/query-user.dto';
import { PageResultDto } from '../common/dto/page-result.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PrismaService } from '../prisma/prisma.service'; // 之前我们直接在这里实例化 PrismaClient，现在改为通过依赖注入使用 PrismaService

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll(query: QueryUserDto) {
    const { page = 1, pageSize = 10, keyword } = query;

    const where = {
      ...(keyword && {
        name: {
          contains: keyword,
        },
      }),
    };

    const total = await this.prisma.user.count({
      where,
    });

    const list = await this.prisma.user.findMany({
      where,

      skip: (page - 1) * pageSize,

      take: pageSize,

      orderBy: {
        createdAt: 'desc',
      },
    });

    return new PageResultDto(list, total, page, pageSize);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`用户 ID ${id} 不存在`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!existingUser) {
      throw new NotFoundException(`用户 ID ${id} 不存在`);
    }
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!existingUser) {
      throw new NotFoundException(`用户 ID ${id} 不存在`);
    }
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
