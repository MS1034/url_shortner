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
  LogarithmicScale,
} from "chart.js";
import { satoshi } from "@/commons/helpers/FontHelper";
import { useEffect, useState } from "react";
import SkeletonChart from "./SkeletonChart";

// Registering the necessary components for Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LogarithmicScale
);

interface TopCountriesChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
    }[];
  };
  label: string;
}

const VerticalBarChart: React.FC<TopCountriesChartProps> = ({
  data,
  label,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-6">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="mb-4 flex flex-col sm:flex-row justify-between gap-4">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            {label}
          </h4>
        </div>
      </div>

      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
        {isLoading ? (
          <SkeletonChart />
        ) : (
          <div className="absolute inset-0">
            <Bar
              data={data}
              options={{
                indexAxis: "y",
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
                    type: "logarithmic", // Use logarithmic scale
                    ticks: {
                      autoSkip: true,
                      maxTicksLimit: 10,
                      callback: function (value) {
                        if (
                          value === 1000 ||
                          value === 10000 ||
                          value === 100000 ||
                          value === 1000000
                        ) {
                          return value.toLocaleString(); // Customize to show only certain ticks
                        }
                        return null;
                      },
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
          </div>
        )}
      </div>
    </div>
  );
};

export default VerticalBarChart;
