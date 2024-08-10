import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { v2 as cloudinary } from 'cloudinary';
import { Logo, Prisma } from '@prisma/client';
import {
  PaginatedResult,
  PaginateFunction,
  paginator,
} from 'src/shared/utils/paginator';

@Injectable()
export class LogoService {
  constructor(private readonly prisma: DatabaseService) {}

  async create(
    user_id: string,
    createLogoDto: Prisma.LogoCreateInput,
    file: Express.Multer.File,
  ) {
    // console.log('subhan');
    // console.log(file);

    const uploadedImage = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'logos',
          width: 300,
          height: 300,
          quality: 'auto',
          format: 'jpg',
        },
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        },
      );
      stream.end(file.buffer);
    });

    if (!uploadedImage || !uploadedImage['secure_url']) {
      throw new Error('Failed to upload image to Cloudinary');
    }

    const dto: Prisma.LogoCreateInput = {
      ...createLogoDto,
      logo_path: uploadedImage['secure_url'],
      user: {
        connect: { user_id },
      },
    };

    return this.prisma.logo.create({
      data: dto,
    });
  }

  async findAll({
    user_id,
    page,
    pageSize,
  }: {
    user_id: string;
    page?: number;
    pageSize?: number;
  }): Promise<PaginatedResult<Logo>> {
    const paginate: PaginateFunction = paginator({ perPage: pageSize || 10 });

    return paginate(
      this.prisma.logo,
      {
        where: { is_deleted: false, user_id },
      },
      {
        page,
      },
    );
  }

  async findOne(id: number, userId: string) {
    const logo = await this.prisma.logo.findFirst({
      where: {
        logo_id: id,
        user_id: userId,
        is_deleted: false,
      },
    });

    if (!logo) {
      throw new NotFoundException(
        `Logo with ID ${id} not found for user ${userId}`,
      );
    }

    return logo;
  }

  async update(
    id: number,
    userId: string,
    updateLogoDto: Prisma.LogoUpdateInput,
    file?: Express.Multer.File,
  ) {
    const logo = await this.findOne(id, userId);

    if (logo.user_id !== userId) {
      throw new ForbiddenException(
        `You are not authorized to update this logo`,
      );
    }

    if (file) {
      const publicId = logo.logo_path.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`logos/${publicId}`);

      const uploadedImage = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'logos',
            width: 300,
            height: 300,
            quality: 'auto',
            format: 'jpg',
          },
          (error, result) => {
            if (error) reject(error);
            resolve(result);
          },
        );
        stream.end(file.buffer);
      });

      if (!uploadedImage || !uploadedImage['secure_url']) {
        throw new Error('Failed to upload image to Cloudinary');
      }

      updateLogoDto.logo_path = uploadedImage['secure_url'];
    }

    return this.prisma.logo.update({
      where: { logo_id: id },
      data: { logo_path: updateLogoDto.logo_path, updated_at: new Date() },
    });
  }

  async softDelete(id: number, userId: string) {
    const logo = await this.prisma.logo.findUnique({ where: { logo_id: id } });

    if (!logo) {
      throw new NotFoundException(`Logo with ID ${id} not found`);
    }

    if (logo.user_id !== userId) {
      throw new ForbiddenException(
        'You are not authorized to delete this logo',
      );
    }

    return this.prisma.logo.update({
      where: { logo_id: id },
      data: { is_deleted: true, deleted_at: new Date() },
    });
  }

  async remove(id: number, user_id: string) {
    const logo = await this.findOne(id, user_id);

    if (logo.user_id !== user_id) {
      throw new ForbiddenException(
        `You are not authorized to delete this logo`,
      );
    }

    await cloudinary.uploader.destroy(logo.logo_path);

    return this.prisma.logo.update({
      where: { logo_id: id },
      data: { is_deleted: true, deleted_at: new Date() },
    });
  }
}
