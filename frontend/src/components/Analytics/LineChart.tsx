"use client";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { satoshi } from "@/commons/helpers/FontHelper";
import SkeletonChart from "./SkeletonChart";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

interface LineChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
      tension: number;
    }[];
  };
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-6">
      <div className="mb-4 flex flex-col sm:flex-row justify-between gap-4">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Top 10 Countries with Clicks
        </h4>
      </div>
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
        {isLoading ? (
          <SkeletonChart />
        ) : (
          <Line
            data={data}
            options={{
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
            }}
          />
        )}
      </div>
    </div>
  );
};

export default LineChart;
