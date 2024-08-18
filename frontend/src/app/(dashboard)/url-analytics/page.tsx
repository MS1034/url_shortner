"use client";
import React, { useState, useEffect, Suspense } from "react";
import HourlyClickChart from "@/components/Analytics/HourlyClickChart";
import VerticalBarChart from "@/components/Analytics/VerticalBarChart";
import CardDataStats from "@/components/CardStats";
import { BsEye, BsFillPersonPlusFill, BsPerson } from "react-icons/bs";
import PieChart from "@/components/Analytics/PiChart";
import dynamic from "next/dynamic";
import SkeletonDateRangePicker from "@/components/DatePicker/DatePickerSkeleton";
import { useFetchTagsQuery } from "@/services/url-tags";
import { useFetchUrlsQuery } from "@/services/url";
import { Tag } from "@/commons/types/Tags";
import { Url } from "@/commons/types/Url";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MultiSelect from "@/components/Dropdown/MultiSelect";
import DateRangePicker from "@/components/DatePicker/DateRangePicker";
import { useLazyGetAnalyticsQuery } from "@/services/analytics";
import LineChart from "@/components/Analytics/LineChart";
import GeneratePDFButton from "@/components/Analytics/GenerateReportButton";
import millify from "millify";

const schema = z
  .object({
    urls: z.array(z.any()).optional(),
    tags: z.array(z.any()).optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
  })
  .refine(
    (data) => {
      return (
        (data.urls && data.urls.length > 0) ||
        (data.tags && data.tags.length > 0) ||
        data.startDate ||
        data.endDate
      );
    },
    {
      message: "Select at least one URL, one tag, or one date.",
      path: ["validation"],
    }
  );

function UrlAnalytics() {
  const { data: tags, isLoading: tagsLoading } = useFetchTagsQuery({});
  const { data: urls, isLoading: urlsLoading } = useFetchUrlsQuery({});
  const [getAnalytics, { data: analytics, isLoading: analyticsLoading }] =
    useLazyGetAnalyticsQuery();

  const currentDate = new Date();
  const oneWeekAgo = new Date(currentDate);
  oneWeekAgo.setDate(currentDate.getDate() - 7);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      urls: [],
      tags: [],
      startDate: oneWeekAgo,
      endDate: currentDate,
    },
  });

  const onSubmit = (data: {
    urls: any;
    tags: any;
    startDate: any;
    endDate: any;
  }) => {
    const { urls, tags, startDate, endDate } = data;
    const urlIds = urls
      ? urls.map((url: { value: string | number }) => url.value)
      : [];
    const tagIds = tags
      ? tags.map((tag: { value: string | number }) => tag.value)
      : [];
    getAnalytics({
      urlIds,
      tagIds,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
    });
  };

  useEffect(() => {
    handleSubmit((data) => {
      const { urls, tags, startDate, endDate } = data;

      getAnalytics({
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
      });
    })();
  }, [handleSubmit, getAnalytics]);

  const tagOptions =
    tags?.result?.map((tag: Tag) => ({
      value: tag.tag_id,
      label: tag.tag_name,
    })) || [];

  const urlOptions =
    urls?.result?.map((url: Url) => ({
      value: url.url_id,
      label: url.short_url,
    })) || [];

  const deviceData = {
    labels: Object.keys(analytics?.result?.deviceBreakdown || {}),
    datasets: [
      {
        data: Object.values(analytics?.result?.deviceBreakdown || {}),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const osData = {
    labels: Object.keys(analytics?.result?.osBreakdown || {}),
    datasets: [
      {
        data: Object.values(analytics?.result?.osBreakdown || {}),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#E7E9ED"],
      },
    ],
  };

  const referrerData = {
    labels: Object.keys(analytics?.result?.referrerBreakdown || {}),
    datasets: [
      {
        data: Object.values(analytics?.result?.referrerBreakdown || {}),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#E7E9ED"],
      },
    ],
  };

  const topCountriesData = {
    labels: Object.keys(analytics?.result?.countryMapData || {}),
    datasets: [
      {
        label: "Clicks",
        data: Object.values(analytics?.result?.countryMapData || {}),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 206, 86)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
          "rgb(255, 159, 64)",
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 206, 86)",
          "rgb(75, 192, 192)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const topCitiesData = {
    labels: Object.keys(analytics?.result?.topCities || {}),
    datasets: [
      {
        label: "Clicks",
        data: Object.values(analytics?.result?.topCities || {}),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 206, 86)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
          "rgb(255, 159, 64)",
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 206, 86)",
          "rgb(75, 192, 192)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const hourlyClickData = {
    labels: Array.from({ length: 24 }, (_, i) => i.toString()),
    datasets: [
      {
        label: "Hourly Clicks Rate",
        data: analytics?.result?.hourlyClickDistribution,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const clickGrowthOverTimeData = {
    labels: Object.keys(analytics?.result?.clickGrowthOverTime || []),
    datasets: [
      {
        label: "Click Growth Over Time",
        data: Object.values(analytics?.result?.clickGrowthOverTime || []),
        borderColor: "#FF6384",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
        tension: 0.19,
      },
    ],
  };

  type ChartData = {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
    }[];
  };
  const handleClear = () => {
    reset({
      urls: [],
      tags: [],
      startDate: oneWeekAgo,
      endDate: currentDate,
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5"
      >
        <Controller
          name="urls"
          control={control}
          render={({ field }) => (
            <MultiSelect
              {...field}
              isDarkMode={
                window.matchMedia &&
                window.matchMedia("(prefers-color-scheme: dark)").matches
              }
              options={urlOptions}
              label="Select Urls"
              isLoading={urlsLoading}
            />
          )}
        />
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <MultiSelect
              {...field}
              isDarkMode={
                window.matchMedia &&
                window.matchMedia("(prefers-color-scheme: dark)").matches
              }
              options={tagOptions}
              label="Select Tags"
              isLoading={tagsLoading}
            />
          )}
        />
        <div className="min-h-8 min-w-32">
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <DateRangePicker
                {...field}
                onDateChange={field.onChange}
                placeholderText="Start Date"
              />
            )}
          />
        </div>
        <div className="min-h-8 min-w-32">
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <DateRangePicker
                {...field}
                onDateChange={field.onChange}
                placeholderText="End Date"
              />
            )}
          />
        </div>
        {errors.validation && (
          <div className="col-span-full text-meta-1">
            {errors?.validation?.message}
          </div>
        )}
        <div className="col-span-full flex gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2 bg-gray-200 text-black dark:text-gray border rounded"
          >
            Clear
          </button>
          <GeneratePDFButton data={analytics} isLoading={analyticsLoading} />
        </div>
      </form>
      <div id="pdf-content">
        <div className="mt-4 md:mt-6 2xl:mt7.5 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
          <CardDataStats
            title="Total Visits"
            total={millify(analytics?.result.totalClicks || 0)}
          >
            <BsEye className="fill-primary dark:fill-white" size={24} />
          </CardDataStats>

          <CardDataStats
            title="Total New Users"
            total={millify(analytics?.result?.newUsers || 0)}
          >
            <BsFillPersonPlusFill
              className="fill-primary dark:fill-white"
              size={24}
            />
          </CardDataStats>
          <CardDataStats
            title="Total Returning Users"
            total={millify(analytics?.result?.returningUsers || 0)}
          >
            <BsPerson className="fill-primary dark:fill-white" size={24} />
          </CardDataStats>
        </div>
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <HourlyClickChart
            data={hourlyClickData}
            label={"  Top 10 Countries with Clicks"}
          />
          <VerticalBarChart data={topCountriesData} label="Top 10 Countries" />
          <VerticalBarChart data={topCitiesData} label="Top 10 Cities" />
          <LineChart
            data={
              clickGrowthOverTimeData.labels.length > 1
                ? clickGrowthOverTimeData
                : hourlyClickData
            }
          />
          {/* <TopCountriesChart data={clickGrowthOverTimeData as ChartData} /> */}
          <PieChart data={deviceData as ChartData} title="Device Breakdown" />
          <PieChart data={osData as ChartData} title="OS Breakdown" />
          <PieChart
            data={referrerData as ChartData}
            title="Referrer Breakdown"
          />
        </div>
      </div>
    </>
  );
}

export default UrlAnalytics;
