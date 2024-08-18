import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { CachingService } from '../caching/caching.service';
import { CachingModule } from '../caching/caching.module';

@Module({
  imports: [CachingModule],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
