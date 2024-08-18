import { Module } from '@nestjs/common';
import { CacheModule, CacheModuleOptions } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { CachingService } from './caching.service';
import { TestCacheController } from './caching.controller';

@Module({
  // imports: [
  //   CacheModule.registerAsync<CacheModuleOptions>({
  //     isGlobal: true,
  //     imports: [ConfigModule],
  //     inject: [ConfigService],
  //     useFactory: async (configService: ConfigService) => {
  //       const host = configService.get<string>('REDIS_HOST') || 'localhost';
  //       const port = configService.get<number>('REDIS_PORT') || 6379;
  //       const ttl = configService.get<number>('CACHE_TTL') || 600; // Default TTL in seconds
  //       return {
  //         store: redisStore as any, // Cast to 'any' to bypass type issues
  //         host: host,
  //         port: port,
  //         ttl: ttl, // Ensure TTL is used if needed
  //       } as CacheModuleOptions;
  //     },
  //   }),
  // ],
  controllers: [TestCacheController],
  providers: [CachingService],
  imports: [CacheModule.register()],
  exports: [CachingService],
})
export class CachingModule {}
