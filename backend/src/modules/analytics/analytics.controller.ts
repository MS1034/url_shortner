import {
  Controller,
  Get,
  ParseArrayPipe,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { OptionalParseArrayPipe } from 'src/common/pipes/optional-parse-array-pipe/optional-parse-array-pipe.pipe';
import { Request } from 'express';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get()
  async getAnalytics(
    @Req() req: Request,
    @Query('urlIds') urlIdsStr?: string,
    @Query(
      'tagIds',
      new OptionalParseArrayPipe(
        new ParseArrayPipe({ items: Number, separator: ',' }),
      ),
    )
    tagIds?: number[],
    @Query('startDate') startDate?: Date,
    @Query('endDate') endDate?: Date,
  ): Promise<any> {
    const userId = req['user']['user_id'];

    if (!userId) {
      throw new UnauthorizedException('User ID is required');
    }

    console.log('User ID:', userId); // Debugging line
    console.log('Tag IDs:', tagIds); // Debugging line
    console.log('Start Date:', startDate); // Debugging line
    console.log('End Date:', endDate); // Debugging line
    console.log('UrlIdsStr:', urlIdsStr); // Debugging line

    if (urlIdsStr) {
      const urlIds = JSON.parse(urlIdsStr);
      return this.analyticsService.getAnalytics({
        userId, // Include userId in the parameters
        urlIds,
        tagIds,
        startDate,
        endDate,
      });
    }

    return this.analyticsService.getAnalytics({
      userId, // Include userId in the parameters
      tagIds,
      startDate,
      endDate,
    });
  }
}
