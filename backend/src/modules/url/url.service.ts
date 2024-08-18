import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma, Url } from '@prisma/client';
import {
  PaginatedResult,
  PaginateFunction,
  paginator,
} from '../../shared/utils/paginator';

import { nanoid } from 'nanoid';

@Injectable()
export class UrlService {
  constructor(private readonly prisma: DatabaseService) {}

  async create(
    user_id: string,
    UrlCreateDto: Prisma.UrlCreateInput,
    logo_id?: number,
    tag_id?: number,
  ): Promise<Url> {
    const shortUrl = nanoid(14);

    const existingUrl = await this.prisma.url.findUnique({
      where: { short_url: shortUrl },
    });

    if (existingUrl) {
      return this.create(user_id, UrlCreateDto);
    }

    const dto: Prisma.UrlCreateInput = {
      original_url: UrlCreateDto.original_url,
      url_type: UrlCreateDto.url_type,
      expiration_date: UrlCreateDto.expiration_date,
      status: UrlCreateDto.status,
      is_deleted: UrlCreateDto.is_deleted,
      is_pre_generated: UrlCreateDto.is_pre_generated,
      short_url: shortUrl,
      associated: UrlCreateDto.original_url ? true : false,
      user: {
        connect: { user_id },
      },
      logo: logo_id ? { connect: { logo_id } } : undefined,
      url_tag: tag_id ? { connect: { tag_id } } : undefined,
    };

    return this.prisma.url.create({
      data: dto,
    });
  }

  async createMultiple(
    user_id: string,
    UrlCreateDto: any,
    quantity: number,
  ): Promise<Url[]> {
    const createMultipleUrlDto = [];
    if (quantity > 0) {
      for (let i = 0; i < quantity; i++) {
        createMultipleUrlDto.push({
          short_url: nanoid(14),
          url_type: UrlCreateDto.url_type,
          expiration_date: UrlCreateDto.expiration_date,
          status: UrlCreateDto.status,
          is_deleted: UrlCreateDto.is_deleted,
          is_pre_generated: UrlCreateDto.is_pre_generated,
          associated: UrlCreateDto.original_url ? true : false,
          logo_id: UrlCreateDto.logo_id,
          tag_id: UrlCreateDto.tag_id,
          user_id,
        });
      }

      return this.prisma.url.createManyAndReturn({
        data: createMultipleUrlDto,
        skipDuplicates: true,
      });
    }
    throw new Error('Quantity must be greater than zero');
  }

  async findPaginated({
    where,
    orderBy,
    include,
    page,
    pageSize,
  }: {
    where?: Prisma.UrlWhereInput;
    orderBy?: Prisma.UrlOrderByWithRelationInput;
    include?: Prisma.UrlInclude;
    page?: number;
    pageSize?: number;
  }): Promise<PaginatedResult<Url>> {
    const paginate: PaginateFunction = paginator({ perPage: pageSize || 10 });
    console.log(where);
    return paginate(
      this.prisma.url,
      {
        where,
        orderBy,
        include,
      },
      {
        page,
      },
    );
    // return this.prisma.url.findMany();
  }

  async findAll(user_id: string): Promise<Url[]> {
    return this.prisma.url.findMany({
      where: {
        user_id: user_id,
        is_deleted: false,
      },
    });
  }

  async findOne(id: string): Promise<Url> {
    const url = await this.prisma.url.findUnique({
      where: { url_id: id, is_deleted: false },
    });
    if (!url) {
      throw new NotFoundException(`URL with ID ${id} not found`);
    }
    return url;
  }

  async findByShortUrl(shortUrl: string): Promise<Url> {
    const url = await this.prisma.url.findUnique({
      where: { short_url: shortUrl, is_deleted: false },
    });
    if (!url) {
      throw new NotFoundException(`URL with short URL ${shortUrl} not found`);
    }
    return url;
  }

  async update(id: string, updateUrlDto: any): Promise<Url> {
    const {
      original_url,
      url_type,
      expiration_date,
      status,
      is_deleted,
      is_pre_generated,
      logo_id,
      tag_id,
    } = updateUrlDto;

    const dto: Prisma.UrlUpdateInput = {
      original_url,
      url_type,
      expiration_date,
      status,
      is_deleted,
      is_pre_generated,
      associated: !!original_url,
      ...(logo_id && { logo: { connect: { logo_id } } }),
      ...(tag_id && { url_tag: { connect: { tag_id } } }),
    };

    try {
      const url = await this.prisma.url.update({
        where: { url_id: id, is_deleted: false },
        data: dto,
      });

      return url;
    } catch (error) {
      throw new NotFoundException(`URL with ID ${id} not found`);
    }
  }

  async softDelete(id: string, userId: string) {
    const tag = await this.prisma.url.findUnique({
      where: { url_id: id },
    });

    if (!tag) {
      throw new NotFoundException(`tag with ID ${id} not found`);
    }

    if (tag.user_id !== userId) {
      throw new ForbiddenException('You are not authorized to delete this tag');
    }

    return this.prisma.url.update({
      where: { url_id: id },
      data: { is_deleted: true, deleted_at: new Date() },
    });
  }

  async remove(id: string): Promise<Url> {
    const url = await this.prisma.url.delete({
      where: { url_id: id },
    });
    if (!url) {
      throw new NotFoundException(`URL with ID ${id} not found`);
    }
    return url;
  }
}
