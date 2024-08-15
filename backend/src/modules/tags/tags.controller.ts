import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { Prisma } from '@prisma/client';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  create(@Body() createTagDto: Prisma.UrlTagCreateInput, @Req() req) {
    const userId = req.user.user_id;
    return this.tagsService.create(createTagDto, userId);
  }

  @Get()
  async findAll(
    @Req() req,
    @Query() query: { page?: number; pageSize?: number },
  ) {
    const user_id = req.user.user_id;
    if (user_id) {
      if (!query.pageSize) {
        return this.tagsService.findAll(user_id);
      }
      return this.tagsService.findPaginated({
        where: {
          user_id,
          is_deleted: false,
        },

        page: query.page,
        pageSize: query.pageSize,
      });
    }
    throw new Error('User Not Found');
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    const userId = req.user.user_id;
    return this.tagsService.findOne(+id, userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateTagDto: Prisma.UrlTagUpdateInput,
    @Req() req,
  ) {
    const userId = req.user.user_id;
    return this.tagsService.update(+id, updateTagDto, userId);
  }

  @Patch(':id/soft-delete')
  async softDelete(@Param('id') id: string, @Req() req) {
    const userId = req.user.user_id;
    return this.tagsService.softDelete(+id, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    const userId = req.user.user_id;
    return this.tagsService.remove(+id, userId);
  }
}
