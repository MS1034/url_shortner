import { Module } from '@nestjs/common';
import { LogoService } from './logo.service';
import { LogoController } from './logo.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule], // Import the Cloudinary module

  controllers: [LogoController],
  providers: [LogoService],
})
export class LogoModule {}
