import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { Prisma } from '@prisma/client';

@Controller('urls')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  async create(@Request() req, @Body() createUrlDto: any) {
    const user_id = req['user']['user_id'];

    if (user_id) {
      const { logo_id, tag_id, ...rest } = createUrlDto;

      const urlData: Prisma.UrlCreateInput = {
        ...rest,
      };

      return this.urlService.create(user_id, urlData, logo_id, tag_id);
    }
    throw new Error('User Not Found');
  }

  @Post('pregenerate')
  async createMultiple(
    @Request() req,
    @Body() createUrlDto: any,
    @Query() query: { quantity: number },
  ) {
    console.log('createUrlDto');
    console.log(createUrlDto);
    console.log(query.quantity);
    console.log('query.quantity');
    return this.urlService.createMultiple(
      req.user.user_id,
      createUrlDto,
      +query.quantity,
    );
  }

  @Get()
  async findAll(
    @Request() req,
    @Query() query: { page: number; pageSize: number },
  ) {
    const user_id = req.user.user_id;
    // console.log(query.page, query.pageSize);
    if (user_id) {
      const result = await this.urlService.findAll({
        where: {
          user_id,
          is_deleted: false,
        },
        include: {
          url_tag: true,
          logo: true,
        },

        orderBy: {
          created_at: 'asc',
        },
        page: query.page,
        pageSize: query.pageSize,
      });
      // console.log(result);
      return result;
    }
    throw new Error('User Not Found');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.urlService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUrlDto: any,
    @Request() req,
  ) {
    const user_id = req.user?.user_id;

    if (user_id) {
      return this.urlService.update(id, updateUrlDto);
    }
    throw new UnauthorizedException('User Not Found or Unauthorized');
  }

  @Patch(':id/soft-delete')
  async softDelete(@Param('id') id: string, @Request() req) {
    const userId = req.user.user_id;
    return this.urlService.softDelete(id, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.urlService.remove(id);
  }
}
