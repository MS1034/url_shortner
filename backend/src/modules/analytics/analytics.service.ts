import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CachingService } from '../caching/caching.service';

interface GetAnalyticsParams {
  userId: string;
  urlIds?: string[];
  tagIds?: number[];
  startDate?: Date;
  endDate?: Date;
}

interface AnalyticsResults {
  totalClicks: number;
  osBreakdown: Record<string, number>;
  deviceBreakdown: Record<string, number>;
  referrerBreakdown: Record<string, number>;
  countryMapData: Record<string, number>;
  hourlyClickDistribution: number[];
  topCities: Record<string, number>;
  clickGrowthOverTime: Record<string, number>;
  returningUsers: number;
  newUsers: number;
  urlIds?: string[];
  tagIds?: number[];
  startDate?: Date;
  endDate?: Date;
}

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly cacheService: CachingService,
  ) {}

  async getAnalytics(params: GetAnalyticsParams): Promise<AnalyticsResults> {
    const cacheKey = this.generateCacheKey(params);
    const cachedResult = await this.cacheService.get<string>(cacheKey);

    if (cachedResult) {
      console.log('Using cached data');
      return JSON.parse(cachedResult);
    }

    const whereConditions = this.buildWhereConditions(params);

    const batchSize = 10000;
    let offset = 0;
    let hasMore = true;
    const results: AnalyticsResults = {
      totalClicks: 0,
      osBreakdown: {},
      deviceBreakdown: {},
      referrerBreakdown: {},
      countryMapData: {},
      hourlyClickDistribution: Array(24).fill(0),
      topCities: {},
      clickGrowthOverTime: {},
      returningUsers: 0,
      newUsers: 0,
      startDate: params.startDate,
      endDate: params.endDate,
      urlIds: params.urlIds,
      tagIds: params.tagIds,
    };

    while (hasMore) {
      const clicks = await this.prisma.urlClick.findMany({
        where: whereConditions,
        include: { url: false },
        take: batchSize,
        skip: offset,
      });

      if (clicks.length < batchSize) {
        hasMore = false;
      }

      offset += batchSize;
      this.processClicks(clicks, results);
    }

    this.calculateTopEntries(results, [
      'topCities',
      'countryMapData',
      'referrerBreakdown',
    ]);

    this.sortClickGrowthOverTime(results);

    const now = new Date();
    const nextMidnight = new Date(now);
    nextMidnight.setHours(24, 0, 0, 0);
    const ttl = nextMidnight.getTime() - now.getTime();
    console.log(ttl);

    await this.cacheService.set(cacheKey, JSON.stringify(results), {
      ttl: ttl,
    });

    return results;
  }

  private buildWhereConditions(params: GetAnalyticsParams) {
    const { userId, urlIds, tagIds, startDate, endDate } = params;
    return {
      ...(urlIds?.length && { url_id: { in: urlIds } }),
      ...(tagIds?.length && { url: { tag_id: { in: tagIds } } }),
      ...(startDate && {
        access_date: { gte: startDate, lte: endDate || new Date() },
      }),
      ...(endDate && !startDate && { access_date: { lte: endDate } }),
      ...(userId && {
        url: { user_id: userId },
      }),
    };
  }

  private processClicks(clicks: any[], results: AnalyticsResults) {
    const ipMap: Record<string, boolean> = {};

    clicks.forEach((click) => {
      const os = this.extractOS(click.user_agent);
      const device = this.extractDevice(click.user_agent);
      const referrer = click.referrer || 'Direct';
      const country = click.country || 'Unknown';
      const city = click.city || 'Unknown';
      const date = click.access_date.toISOString().split('T')[0];
      const hour = click.access_time.getHours();
      const ip = click.ip_address;

      results.totalClicks += 1;

      results.osBreakdown[os] = (results.osBreakdown[os] || 0) + 1;
      results.deviceBreakdown[device] =
        (results.deviceBreakdown[device] || 0) + 1;
      results.referrerBreakdown[referrer] =
        (results.referrerBreakdown[referrer] || 0) + 1;
      results.countryMapData[country] =
        (results.countryMapData[country] || 0) + 1;
      results.hourlyClickDistribution[hour] += 1;
      results.topCities[city] = (results.topCities[city] || 0) + 1;
      results.clickGrowthOverTime[date] =
        (results.clickGrowthOverTime[date] || 0) + 1;

      if (ipMap[ip]) {
        results.returningUsers += 1;
      } else {
        ipMap[ip] = true;
      }
    });

    results.newUsers = results.totalClicks - results.returningUsers;
  }

  private calculateTopEntries(results: AnalyticsResults, keys: string[]) {
    const processTopEntries = (
      counts: Record<string, number>,
      result: Record<string, number>,
    ) => {
      const sortedEntries = Object.entries(counts).sort(
        ([, a], [, b]) => b - a,
      );
      let totalOther = 0;

      sortedEntries.slice(0, 10).forEach(([key, value]) => {
        result[key] = value;
      });

      sortedEntries.slice(10).forEach(([, value]) => {
        totalOther += value;
      });

      if (totalOther > 0) {
        result['Others'] = totalOther;
      }
    };

    const topEntries: Record<string, Record<string, number>> = {
      topCities: {},
      clickGrowthOverTime: {},
      osBreakdown: {},
      deviceBreakdown: {},
      referrerBreakdown: {},
      countryMapData: {},
    };

    keys.forEach((key) => {
      if (results[key] !== undefined) {
        processTopEntries(results[key], topEntries[key]);
        results[key] = topEntries[key];
      }
    });
  }

  private extractOS(userAgent: string) {
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac OS')) return 'Mac OS';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('iOS')) return 'iOS';
    return 'Unknown';
  }

  private extractDevice(userAgent: string) {
    if (userAgent.includes('Mobile')) return 'Mobile';
    if (userAgent.includes('Tablet')) return 'Tablet';
    return 'Desktop';
  }

  private generateCacheKey(params: GetAnalyticsParams) {
    return `analytics-${JSON.stringify(params)}`;
  }

  private sortClickGrowthOverTime(results: AnalyticsResults) {
    const sortedEntries = Object.entries(results.clickGrowthOverTime).sort(
      ([dateA], [dateB]) =>
        new Date(dateA).getTime() - new Date(dateB).getTime(),
    );

    results.clickGrowthOverTime = Object.fromEntries(sortedEntries);
  }
}
