import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { LogoService } from './logo.service';
import { Prisma } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@Controller('logos')
@UseGuards(AuthGuard('jwt'))
export class LogoController {
  constructor(private readonly logoService: LogoService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Req() req,
    @Body() createLogoDto: Prisma.LogoCreateInput,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // console.log(req.user);
    // console.log('req.user');
    return this.logoService.create(req.user.user_id, createLogoDto, file);
  }

  @Get()
  async findAll(
    @Request() req,
    @Query() query: { page?: number; pageSize?: number },
  ) {
    const user_id = req.user.user_id;
    if (user_id) {
      return this.logoService.findAll({
        user_id,
        page: query.page,
        pageSize: query.pageSize,
      });
    }
    throw new Error('User Not Found');
  }

  @Get(':id')
  findOne(@Req() req, @Param('id') id: string) {
    return this.logoService.findOne(+id, req.user.user_id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Req() req,
    @Param('id') id: number,
    @Body() updateLogoDto: Prisma.LogoUpdateInput,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.logoService.update(+id, req.user.user_id, updateLogoDto, file);
  }

  @Patch(':id/soft-delete')
  async softDelete(@Param('id') id: number, @Req() req) {
    const userId = req.user.user_id;
    return this.logoService.softDelete(+id, userId);
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: number) {
    console.log(req.user.user_id, id, 'Subahn');

    return this.logoService.remove(+id, req.user.user_id);
  }
}
