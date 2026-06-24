import { PageResultDto } from '../common/dto/page-result.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductDto } from './dto/query-product.dto';
import { BusinessException } from '../common/exceptions/business.exception';
import { ErrorCode } from '../common/constants/error-code';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 创建商品
   */
  async create(dto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        ...dto,
      },
    });
  }

  /**
   * 查询全部商品
   */
  async findAll(query: QueryProductDto) {
    const { page = 1, pageSize = 10, keyword, status } = query;

    const where = {
      deletedAt: null,

      ...(keyword && {
        name: {
          contains: keyword,
        },
      }),

      ...(status !== undefined && {
        status,
      }),
    };

    const total = await this.prisma.product.count({
      where,
    });

    const list = await this.prisma.product.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return new PageResultDto(list, total, page, pageSize);
  }

  /**
   * 查询单个商品
   */
  async findOne(id: number) {
    const product = await this.prisma.product.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!product) {
      throw new BusinessException(ErrorCode.NOT_FOUND, `商品 ID ${id} 不存在`);
    }

    return product;
  }

  /**
   * 更新商品
   */
  async update(id: number, dto: UpdateProductDto) {
    await this.findOne(id);

    return this.prisma.product.update({
      where: { id },
      data: dto,
    });
  }

  /**
   * 软删除商品
   */
  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.product.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
