import { IsOptional, IsString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PageDto } from '../../common/dto/page.dto';

export class QueryProductDto extends PageDto {
  @ApiPropertyOptional({
    description: '商品名称搜索',
    example: 'iphone',
  })
  @IsOptional()
  @IsString()
  keyword?: string;

  @ApiPropertyOptional({
    description: '商品状态',
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  status?: number;
}
