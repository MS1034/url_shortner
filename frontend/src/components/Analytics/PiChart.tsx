// "use client";
// import dynamic from "next/dynamic";
// import { Pie } from "react-chartjs-2";
// import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
// import { satoshi } from "@/commons/helpers/FontHelper";

// ChartJS.register(Title, Tooltip, Legend, ArcElement);

// export interface PieChartProps {
//   data: {
//     labels: string[];
//     datasets: {
//       data: number[];
//       backgroundColor: string[];
//     }[];
//   };
//   title: string;
// }

// const PieChart: React.FC<PieChartProps> = ({ data, title }) => {
//   return (
//     <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-4">
//       <div className="mb-4 flex flex-col sm:flex-row justify-between gap-4">
//         <h4 className="text-xl font-semibold text-black dark:text-white">
//           {title}
//         </h4>
//       </div>

//       <div className="relative w-full h-[300px] md:h-[400px]">
//         <Pie
//           data={data}
//           options={{
//             responsive: true,
//             maintainAspectRatio: false,
//             plugins: {
//               legend: {
//                 labels: {
//                   font: {
//                     size: 14,
//                     family: satoshi.style.fontFamily,
//                   },
//                 },
//               },
//             },
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default PieChart;

"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { satoshi } from "@/commons/helpers/FontHelper";
import SkeletonChart from "./SkeletonChart";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export interface PieChartProps {
  data: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
    }[];
  };
  title: string;
}

const PieChart: React.FC<PieChartProps> = ({ data, title }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-4">
      <div className="mb-4 flex flex-col sm:flex-row justify-between gap-4">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          {title}
        </h4>
      </div>

      <div className="relative w-full h-[300px] md:h-[400px]">
        {isLoading ? (
          <SkeletonChart />
        ) : (
          <Pie
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
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PieChart;
