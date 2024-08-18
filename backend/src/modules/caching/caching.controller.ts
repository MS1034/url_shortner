import { Controller, Get } from '@nestjs/common';
import { CachingService } from './caching.service';

@Controller('test-cache')
export class TestCacheController {
  constructor(private readonly cachingService: CachingService) {}
  params = {
    urlIds: ['dcfd40df-42d1-480e-be84-c6769b961daa'],
    tagIds: [],
    startDate: '2024-08-17T20:08:43.975Z',
    endDate: undefined,
  };

  @Get('set')
  async setCache() {
    await this.cachingService.set(
      `analytics-${JSON.stringify(this.params)}`,

      `${JSON.stringify({
        status: true,
        path: '/api/v1/analytics?urlIds=[%22dcfd40df-42d1-480e-be84-c6769b961daa%22]&startDate=2024-08-17T20:11:50.987Z',
        message: 'success',
        statusCode: 200,
        result: {
          totalClicks: 15,
          osBreakdown: {
            Windows: 8,
            'Mac OS': 6,
            Linux: 1,
          },
          deviceBreakdown: {
            Desktop: 15,
          },
          referrerBreakdown: {
            'https://reflecting-subprime.info/': 8,
            Direct: 7,
          },
          countryMapData: {
            Norway: 1,
            Curacao: 1,
            Vietnam: 1,
            'Isle of Man': 1,
            Chad: 1,
            Vanuatu: 1,
            Haiti: 1,
            'Pitcairn Islands': 1,
            Congo: 1,
            Israel: 1,
            Malawi: 1,
            Guinea: 1,
            Estonia: 1,
            Niue: 1,
            Djibouti: 1,
          },
          hourlyClickDistribution: [
            1, 0, 0, 0, 1, 3, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 2, 1, 2, 0,
            1,
          ],
          topCities: {
            'West Anikaport': 1,
            Howeton: 1,
            Sunrise: 1,
            Brookline: 1,
            Schuppeside: 1,
            'West Jack': 1,
            'Bel Air South': 1,
            'New Holliston': 1,
            'West Gunnerhaven': 1,
            'Lake Arturo': 1,
            'Lake Marilie': 1,
            Ressiefurt: 1,
            Nitzschetown: 1,
            Zaneside: 1,
            Ernserfurt: 1,
          },
          clickGrowthOverTime: {
            '2024-08-17': 15,
          },
          returningUsers: 0,
          newUsers: 15,
        },
        timestamp: '2024-08-18 01:11:55',
      })}`,
      { ttl: 60000 },
    );
    return 'Cache set!';
  }

  @Get('get')
  async getCache() {
    const value = await this.cachingService.get<string>(
      `analytics-${JSON.stringify(this.params)}`,
    );
    return JSON.parse(value);
  }
}
