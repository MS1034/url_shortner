import { Module } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { ApiKeyController } from './api-key.controller';
import { ApiKeyStrategy } from './api-key.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule],
  providers: [ApiKeyService, ApiKeyStrategy],
  controllers: [ApiKeyController],
})
export class ApiKeyModule {}
