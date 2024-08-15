import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, UrlTag } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import {
  PaginatedResult,
  PaginateFunction,
  paginator,
} from 'src/shared/utils/paginator';

@Injectable()
export class TagsService {
  constructor(private readonly prisma: DatabaseService) {}

  create(createTagDto: Prisma.UrlTagCreateInput, user_id: string) {
    const dto: Prisma.UrlTagCreateInput = {
      ...createTagDto,
      user: {
        connect: { user_id },
      },
    };

    return this.prisma.urlTag.create({
      data: dto,
    });
  }
  async findPaginated({
    where,
    orderBy,
    include,
    page,
    pageSize,
  }: {
    where?: Prisma.UrlTagWhereInput;
    orderBy?: Prisma.UrlTagOrderByWithRelationInput;
    include?: Prisma.UrlTagInclude;
    page?: number;
    pageSize?: number;
  }): Promise<PaginatedResult<UrlTag>> {
    const paginate: PaginateFunction = paginator({ perPage: pageSize || 10 });
    console.log(where);
    return paginate(
      this.prisma.urlTag,
      {
        where,
        orderBy,
        include,
      },
      {
        page,
      },
    );
  }

  async findAll(user_id: string): Promise<UrlTag[]> {
    return this.prisma.urlTag.findMany({
      where: {
        user_id: user_id,
        is_deleted: false,
      },
    });
  }

  async findOne(id: number, user_id: string) {
    const tag = await this.prisma.urlTag.findFirst({
      where: {
        tag_id: id,
        user_id: user_id,
        is_deleted: false,
      },
    });

    if (!tag) {
      throw new NotFoundException(
        `Tag with ID ${id} not found for user ${user_id}`,
      );
    }

    return tag;
  }

  async update(
    id: number,
    updateTagDto: Prisma.UrlTagUpdateInput,
    userId: string,
  ) {
    console.log(typeof id);
    const tag = await this.prisma.urlTag.update({
      where: { tag_id: id, user_id: userId, is_deleted: false },
      data: { tag_name: updateTagDto.tag_name },
    });
    if (!tag) {
      throw new NotFoundException(`tag with ID ${id} not found`);
    }
    return tag;
  }

  async softDelete(id: number, userId: string) {
    // Check if the tag exists
    const tag = await this.prisma.urlTag.findUnique({
      where: { tag_id: +id },
    });

    if (!tag) {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }

    if (tag.user_id !== userId) {
      throw new ForbiddenException('You are not authorized to delete this tag');
    }

    const isReferenced = await this.prisma.url.findFirst({
      where: { tag_id: +id },
    });

    if (isReferenced) {
      throw new ConflictException('Tag is referenced and cannot be deleted');
    }

    return this.prisma.urlTag.update({
      where: { tag_id: +id },
      data: { is_deleted: true, deleted_at: new Date() },
    });
  }

  async remove(id: number, user_id: string) {
    const tag = await this.findOne(id, user_id);

    if (tag.user_id !== user_id) {
      throw new ForbiddenException(`You are not authorized to delete this tag`);
    }

    return this.prisma.urlTag.delete({
      where: { tag_id: id },
    });
  }
}
