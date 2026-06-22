import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: '用户名',
    example: '张三',
  })
  @IsNotEmpty()
  @MinLength(2)
  name!: string;

  @ApiProperty({
    description: '邮箱',
    example: 'test@qq.com',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    description: '密码',
    example: '123456',
  })
  @MinLength(6)
  password!: string;
}
