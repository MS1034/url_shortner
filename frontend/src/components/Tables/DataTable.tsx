// import React, { useState } from "react";
// import {
//   BsDownload,
//   BsTrash,
//   BsEye,
//   BsChevronLeft,
//   BsChevronRight,
//   BsQrCodeScan,
//   BsQrCode,
//   BsCopy,
// } from "react-icons/bs";
// import { CiEdit } from "react-icons/ci";
// import { GoSortAsc } from "react-icons/go";

// interface paginationMetaData {
//   total: number;
//   lastPage: number;
//   currentPage: number;
//   perPage: number;
//   prev: number | null;
//   next: number | null;
// }
// interface GenericTableProps<T> {
//   data: T[];
//   meta: paginationMetaData;
//   handleParamsChange: any;
// }
// type TableRowData = Record<string, any>;

// const DataTable = <T extends TableRowData>({
//   data,
//   meta,
//   handleParamsChange,
// }: GenericTableProps<T>) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortConfig, setSortConfig] = useState<{
//     key: string;
//     direction: "asc" | "desc";
//   } | null>(null);

//   if (!data || data.length === 0) return <p>No data available</p>;

//   const headers = Object.keys(data[0]);

//   const sortedData = React.useMemo(() => {
//     let sortableData = [...data];
//     if (sortConfig !== null) {
//       sortableData.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) {
//           return sortConfig.direction === "asc" ? -1 : 1;
//         }
//         if (a[sortConfig.key] > b[sortConfig.key]) {
//           return sortConfig.direction === "asc" ? 1 : -1;
//         }
//         return 0;
//       });
//     }
//     return sortableData;
//   }, [data, sortConfig]);

//   const filteredData = sortedData.filter((row) =>
//     headers.some((header) =>
//       String(row[header]).toLowerCase().includes(searchQuery.toLowerCase())
//     )
//   );

//   const requestSort = (key: string) => {
//     let direction: "asc" | "desc" = "asc";
//     if (
//       sortConfig &&
//       sortConfig.key === key &&
//       sortConfig.direction === "asc"
//     ) {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });
//   };

//   const getPageNumbers = () => {
//     const pages = [];
//     const maxPagesToShow = 4;
//     const range = Math.floor(maxPagesToShow / 2);

//     if (meta.lastPage <= maxPagesToShow) {
//       for (let i = 1; i <= meta.lastPage; i++) {
//         pages.push(i);
//       }
//     } else {
//       if (meta.currentPage <= range) {
//         for (let i = 1; i <= maxPagesToShow - 1; i++) {
//           pages.push(i);
//         }
//         pages.push("...");
//         pages.push(meta.lastPage);
//       } else if (meta.currentPage >= meta.lastPage - range) {
//         pages.push(1);
//         pages.push("...");
//         for (
//           let i = meta.lastPage - maxPagesToShow + 2;
//           i <= meta.lastPage;
//           i++
//         ) {
//           pages.push(i);
//         }
//       } else {
//         pages.push(1);
//         pages.push("...");
//         for (
//           let i = meta.currentPage - range + 1;
//           i <= meta.currentPage + range - 1;
//           i++
//         ) {
//           pages.push(i);
//         }
//         pages.push("...");
//         pages.push(meta.lastPage);
//       }
//     }

//     return pages;
//   };

//   return (
//     <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark !border-collapse">
//       <div className="flex justify-between px-8 py-4">
//         <div className="w-100">
//           <input
//             className="w-full rounded-md border border-stroke bg-transparent px-5 py-2.5 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary"
//             placeholder="Search..."
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//         <div className="flex items-center font-medium">
//           <select
//             className="bg-transparent pl-2 text-slate-500"
//             onChange={(e) => handleParamsChange({ pageSize: e.target.value })}
//           >
//             <option value="5">5</option>
//             <option value="10">10</option>
//             <option value="20">20</option>
//             <option value="50">50</option>
//           </select>
//           <p className="pl-2 text-black dark:text-white">Entries Per Page</p>
//         </div>
//       </div>
//       <div className="max-w-full overflow-x-auto px-4 md:px-8">
//         <table className="w-full table-auto text-sm">
//           <thead className="border-separate px-4">
//             <tr className=" text-left border-t border-stroke dark:border-strokedark ">
//               {headers.map((header) => (
//                 <th className="cursor-pointer  px-4 py-4 font-medium text-slate-500 dark:text-white  ">
//                   <div
//                     className="flex items-center "
//                     onClick={() => requestSort(header)}
//                   >
//                     <span>{header}</span>
//                     <div className="ml-2 inline-flex flex-col space-y-[2px]">
//                       <span
//                         className="inline-block"
//                         onClick={() => requestSort(header)}
//                       >
//                         <svg
//                           className={`fill-current ${
//                             sortConfig?.key === header &&
//                             sortConfig?.direction === "asc"
//                               ? "text-primary"
//                               : ""
//                           }`}
//                           width="10"
//                           height="5"
//                           viewBox="0 0 10 5"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path d="M5 0L0 5H10L5 0Z" fill=""></path>
//                         </svg>
//                       </span>
//                       <span
//                         className="inline-block"
//                         onClick={() => requestSort(header)}
//                       >
//                         <svg
//                           className={`fill-current ${
//                             sortConfig?.key === header &&
//                             sortConfig?.direction === "desc"
//                               ? "text-primary"
//                               : ""
//                           }`}
//                           width="10"
//                           height="5"
//                           viewBox="0 0 10 5"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             d="M5 5L10 0L-4.37114e-07 8.74228e-07L5 5Z"
//                             fill=""
//                           ></path>
//                         </svg>
//                       </span>
//                     </div>
//                   </div>
//                   <div className="mt-2.5 w-full">
//                     <input
//                       className="w-full rounded-md border border-stroke bg-transparent px-5 py-2.5 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary"
//                       type="text"
//                     />
//                   </div>
//                 </th>
//               ))}
//               <th className="cursor-pointer align-text-top  px-4 py-4 font-medium text-slate-500 dark:text-white  ">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.map((row, rowIndex) => (
//               <tr
//                 key={rowIndex}
//                 className="border-t border-stroke dark:border-strokedark"
//               >
//                 {headers.map((header) => (
//                   <td
//                     key={header}
//                     className="border-b border-[#eee] px-4 py-5 dark:border-strokedark"
//                   >
//                     <p className="text-slate-500 dark:text-white">
//                       {String(row[header])}
//                     </p>
//                   </td>
//                 ))}
//                 <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
//                   <div className="flex items-center space-x-3.5">
//                     <button className="hover:text-primary">
//                       <BsCopy size={18} />
//                     </button>
//                     <button className="hover:text-primary">
//                       <BsQrCode size={18} />
//                     </button>
//                     <button className="hover:text-primary">
//                       <BsEye size={18} />
//                     </button>
//                     <button className="hover:text-primary">
//                       <CiEdit size={18} />
//                     </button>
//                     <button className="hover:text-primary">
//                       <BsTrash size={18} />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="flex justify-between border-t border-stroke px-6 pt-5 dark:border-strokedark">
//         <div className="flex mb-4">
//           <button className="flex cursor-pointer items-center justify-center rounded-md p-1 px-2 hover:bg-primary hover:text-white">
//             <BsChevronLeft />
//           </button>
//           {getPageNumbers().map((page, index) => (
//             <button
//               key={index}
//               className={`${
//                 page === meta.currentPage
//                   ? "bg-primary text-white"
//                   : "bg-white text-black"
//               } mx-1 flex cursor-pointer items-center justify-center rounded-md p-1 px-3 hover:bg-primary hover:text-white`}
//               disabled={page === "..."}
//             >
//               {page}
//             </button>
//           ))}

//           <button className="flex cursor-pointer items-center justify-center rounded-md p-1 px-2 hover:bg-primary hover:text-white">
//             <BsChevronRight />
//           </button>
//         </div>
//         <p className="font-medium text-gray-900 dark:text-white">
//           Showing {meta.currentPage} of {meta.lastPage}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default DataTable;
import React, { useState } from "react";

import Pagination from "./Pagination";
import { TableRowData } from "@/commons/types/TableRowData";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import GenericTableProps from "@/commons/interfaces/GenericTableProps";
import TableControls from "./TableControls";
import SkeletonLoader from "./SekeltonLoader";

const DataTable = <T extends TableRowData>({
  data,
  meta,
  handleParamsChange,
}: GenericTableProps<T>) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  const sortedData = React.useMemo(() => {
    if (!data || sortConfig === null) return data;

    const sortableData = [...data];
    sortableData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    return sortableData;
  }, [data, sortConfig]);

  const filteredData = sortedData.filter((row) =>
    headers.some((header) =>
      String(row[header]).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const requestSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  if (!data || data.length === 0) return <p>No data available</p>;

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <TableControls
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleParamsChange={handleParamsChange}
      />
      <div className="max-w-full overflow-x-auto px-4 md:px-8">
        <table className="w-full table-auto text-sm">
          <TableHeader
            headers={headers}
            requestSort={requestSort}
            sortConfig={sortConfig}
          />
          <TableBody data={filteredData} headers={headers} />
        </table>
      </div>
      <Pagination meta={meta} handleParamsChange={handleParamsChange} />
    </div>
  );
};

export default DataTable;
