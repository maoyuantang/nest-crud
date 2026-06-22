import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsInt,
  Min,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: '商品名称',
    example: 'iPhone 16',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: '商品描述',
    example: '苹果手机',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: '商品价格',
    example: 6999,
  })
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiProperty({
    description: '库存',
    example: 100,
  })
  @IsInt()
  @Min(0)
  stock!: number;
}
