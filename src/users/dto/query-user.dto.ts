import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PageDto } from '../../common/dto/page.dto';

export class QueryUserDto extends PageDto {
  @ApiPropertyOptional({
    description: '姓名搜索',
    example: '张三',
  })
  @IsOptional()
  @IsString()
  keyword?: string;
}
