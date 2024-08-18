import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ApiKeyService } from './api-key.service';

@Controller('api-key')
export class ApiKeyController {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  @Post()
  async createApiKey(
    @Request() req,
    @Body() createApiKeyDto: Prisma.ApiKeyCreateInput,
  ): Promise<{ apiKey: string }> {
    const user_id = req.user.user_id;
    if (user_id) {
      const apiKey = await this.apiKeyService.createApiKey(
        user_id,
        createApiKeyDto.expires_at,
      );
      return { apiKey };
    }

    throw new UnauthorizedException('User does not exist');
  }

  @Get()
  async getApiKey(@Request() req): Promise<{ apiKey: string | null }> {
    const user_id = req.user.user_id;
    console.log(user_id, 'Ali');

    if (user_id) {
      const apiKey = await this.apiKeyService.getApiKey(user_id);
      return { apiKey };
    }

    throw new UnauthorizedException('User does not exist');
  }

  @Delete()
  async deleteApiKey(@Request() req): Promise<{ message: string }> {
    const user_id = req.user.user_id;
    if (user_id) {
      await this.apiKeyService.deleteApiKey(user_id);
      return { message: 'API key deleted successfully' };
    }

    throw new UnauthorizedException('User does not exist');
  }
}
