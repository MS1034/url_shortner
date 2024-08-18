import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as crypto from 'crypto';
import { User } from '@prisma/client';

@Injectable()
export class ApiKeyService {
  constructor(private readonly prisma: DatabaseService) {}

  async createApiKey(
    user_id: string,
    expiresAt?: Date | string,
  ): Promise<string> {
    if (!user_id) {
      throw new UnauthorizedException('User ID is required');
    }

    // Check if the user exists
    const userExists = await this.prisma.user.findUnique({
      where: { user_id: user_id },
    });

    if (!userExists) {
      throw new UnauthorizedException('User does not exist');
    }

    // Check if the user already has an API key
    const existingApiKey = await this.prisma.apiKey.findFirst({
      where: { user_id: user_id },
    });

    if (existingApiKey) {
      throw new ConflictException('API key already exists for this user');
    }

    // Generate a new API key
    const apiKey = crypto.randomBytes(32).toString('hex');

    // Create the API key record
    await this.prisma.apiKey.create({
      data: {
        user_id: user_id,
        api_key: apiKey,
        expires_at: expiresAt || null,
      },
    });

    return apiKey;
  }

  async getApiKey(user_id: string): Promise<string | null> {
    const apiKeyRecord = await this.prisma.apiKey.findFirst({
      where: { user_id: user_id },
    });

    if (apiKeyRecord && !apiKeyRecord.is_deleted) {
      return apiKeyRecord.api_key;
    }

    return null;
  }

  async deleteApiKey(user_id: string): Promise<void> {
    const apiKeyRecord = await this.prisma.apiKey.findFirst({
      where: { user_id: user_id },
    });

    if (!apiKeyRecord) {
      throw new NotFoundException('API key not found');
    }

    await this.prisma.apiKey.delete({
      where: { api_key_id: apiKeyRecord.api_key_id },
    });
  }

  async validateApiKey(apiKey: string): Promise<User | null> {
    const apiKeyRecord = await this.prisma.apiKey.findUnique({
      where: { api_key: apiKey },
      include: { user: true },
    });

    if (
      apiKeyRecord &&
      !apiKeyRecord.is_deleted &&
      (!apiKeyRecord.expires_at || apiKeyRecord.expires_at > new Date())
    ) {
      return apiKeyRecord.user;
    }

    return null;
  }
}
