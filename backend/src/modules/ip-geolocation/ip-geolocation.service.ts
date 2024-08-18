import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class IpGeolocationService {
  private readonly apiUrl = 'http://ip-api.com/json/';

  async getLocation(ip: string): Promise<{ country?: string; city?: string }> {
    try {
      const response = await axios.get(`${this.apiUrl}${ip}`);
      const { country, city } = response.data;
      return { country, city };
    } catch (error) {
      console.error('Failed to fetch IP geolocation', error);
      return { country: 'Unknown', city: 'Unknown' };
    }
  }
}
