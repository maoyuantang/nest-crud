import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(dto: RegisterDto) {
    // 检查邮箱是否存在
    const existUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (existUser) {
      throw new BadRequestException('邮箱已存在');
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // 创建用户
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
      },
    });

    const { password, ...result } = user;

    return result;
  }
}
