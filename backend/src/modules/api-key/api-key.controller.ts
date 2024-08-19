import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiKey, Prisma } from '@prisma/client';
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

  @Put()
  async updateApiKey(
    @Request() req,
    @Body() updateApiKeyDto: Prisma.ApiKeyUpdateInput,
  ): Promise<{ apiKey: string }> {
    const user_id = req.user.user_id;
    if (!user_id) {
      throw new UnauthorizedException('User does not exist');
    }

    try {
      const updatedApiKey = await this.apiKeyService.updateApiKey(
        user_id,
        updateApiKeyDto,
      );
      return { apiKey: updatedApiKey.api_key };
    } catch (error) {
      throw error; // Let the service layer handle the specific error
    }
  }

  @Get()
  async getApiKey(@Request() req): Promise<ApiKey> {
    const user_id = req.user.user_id;
    console.log(user_id, 'Ali');

    if (user_id) {
      const apiKey = await this.apiKeyService.getApiKey(user_id);
      return apiKey;
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
