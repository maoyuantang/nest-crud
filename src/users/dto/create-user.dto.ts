import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: '用户姓名',
    example: '张三',
  })
  @IsNotEmpty({
    message: '用户姓名不能为空',
  })
  @MinLength(2, {
    message: '用户姓名不能少于 2 个字符',
  })
  name!: string;

  @ApiProperty({
    description: '邮箱',
    example: 'test@qq.com',
  })
  @IsEmail(
    {},
    {
      message: '邮箱格式不正确',
    },
  )
  @IsNotEmpty({
    message: '邮箱不能为空',
  })
  email!: string;

  @ApiProperty({
    description: '密码',
    example: '123456',
  })
  @IsNotEmpty({
    message: '密码不能为空',
  })
  @MinLength(6, {
    message: '密码不能少于 6 个字符',
  })
  password!: string;
}
