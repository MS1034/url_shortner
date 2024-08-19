import JWTHelper from "@/commons/helpers/JwtHelper";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export interface AnalyticsResponse {
  status: boolean;
  path: string;
  message: string;
  statusCode: number;
  result: {
    totalClicks: number;
    osBreakdown: Array<{ os: string; count: number }>;
    deviceBreakdown: Array<{ device: string; count: number }>;
    referrerBreakdown: Array<{ referrer: string; count: number }>;
    countryMapData: Array<{ country: string; count: number }>;
    hourlyClickDistribution: Array<{ hour: number; count: number }>;
    topCities: Array<{ name: string; count: number }>;
    clickGrowthOverTime: Array<{ date: string; count: number }>;
    newUsers: number;
    returningUsers: number;
    urlIds?: string[];
    tagIds?: number[];
    startDate?: string;
    endDate?: string;
  };
  timestamp: string;
}

export const analyticsApi = createApi({
  reducerPath: "analyticsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.BASE_URL || "http://192.168.0.106:5000/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = JWTHelper.getToken();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAnalytics: builder.query<
      AnalyticsResponse,
      {
        urlIds?: string[];
        tagIds?: number[];
        startDate?: string;
        endDate?: string;
      }
    >({
      query: ({ urlIds, tagIds, startDate, endDate }) => ({
        url: "/analytics",
        params: {
          urlIds: urlIds ? JSON.stringify(urlIds) : undefined,
          tagIds: tagIds ? tagIds.join(",") : undefined,
          startDate,
          endDate,
        },
      }),
    }),
  }),
});

export const { useGetAnalyticsQuery, useLazyGetAnalyticsQuery } = analyticsApi;
