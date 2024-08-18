import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
@Injectable()
export class UrlClickService {
  constructor(private readonly prisma: DatabaseService) {}

  async logClick({
    urlId,
    ipAddress,
    userAgent,
    referrer,
    country,
    city,
    accessDate,
    accessTime,
  }: {
    urlId: string;
    ipAddress: string;
    userAgent: string;
    referrer?: string;
    country?: string;
    city?: string;
    accessDate: Date;
    accessTime: Date;
  }): Promise<void> {
    await this.prisma.urlClick.create({
      data: {
        url_id: urlId,
        ip_address: ipAddress,
        user_agent: userAgent,
        referrer,
        country,
        city,
        access_date: accessDate,
        access_time: accessTime,
      },
    });
  }
}
