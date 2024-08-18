"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { satoshi } from "@/commons/helpers/FontHelper";
import { ChartData, ChartOptions } from "chart.js";
import { useEffect, useState } from "react";
import SkeletonChart from "./SkeletonChart";

// Registering the necessary components for Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

// Define the type for your data prop
interface HourlyClickChartProps {
  data: ChartData<"bar", number[], string>;
}

const HourlyClickChart: React.FC<HourlyClickChartProps> = ({ data }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14,
            family: satoshi.style.fontFamily,
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
    },
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="mb-4 flex flex-col sm:flex-row justify-between gap-4">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Hourly Click Distribution
          </h4>
        </div>
      </div>
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
        {isLoading ? (
          <SkeletonChart />
        ) : (
          <div className="absolute inset-0">
            <Bar data={data} options={options} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HourlyClickChart;
