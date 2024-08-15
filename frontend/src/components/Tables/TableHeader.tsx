// import { TableConfig } from "@/commons/helpers/SerializationHelper";
// import SortIcon from "./SortIcons";

// const TableHeader = ({
//   headers,
//   requestSort,
//   sortConfig,
//   config,
//   primarykey,
// }: {
//   headers: string[];
//   primarykey: string;
//   requestSort: (key: string) => void;
//   sortConfig: { key: string; direction: "asc" | "desc" } | null;
//   config: TableConfig<T>;
// }) => (
//   <thead>
//     <tr className="text-left border-t   font-bold border-stroke dark:border-strokedark">
//       {/* {headers.map((key) => (
//             <th key={key}>{config[key as keyof T]?.displayName}</th>
//           ))} */}
//       {/* {headers.map((header) =>
//         header != primarykey ? (
//           <th
//             key={header}
//             className="cursor-pointer px-4 py-4  text-slate-500 dark:text-white"
//           >
//             <div
//               className="flex items-center"
//               onClick={() => requestSort(header)}
//             >
//               <span>{header}</span>
//               <SortIcon sortConfig={sortConfig} header={header} />
//             </div>
//           </th>
//         ) : (
//           <></>
//         )
//       )} */}
//       {headers.map((header) =>
//         header != primarykey ? (
//           <th
//             key={header}
//             className="cursor-pointer px-4 py-4  text-slate-500 dark:text-white"
//           >
//             <div
//               className="flex items-center"
//               onClick={() => requestSort(header)}
//             >
//               <span>{config[key as keyof T]?.displayName}</span>
//               <SortIcon sortConfig={sortConfig} header={header} />
//             </div>
//           </th>
//         ) : (
//           <></>
//         )
//       )}
//       <th className="cursor-pointer align-text-top px-4 py-4  text-slate-500 dark:text-white">
//         Actions
//       </th>
//     </tr>
//   </thead>
// );

// export default TableHeader;

import { TableConfig } from "@/commons/helpers/SerializationHelper";
import SortIcon from "./SortIcons";

interface SortConfig {
  key: string;
  direction: "asc" | "desc";
}

interface TableHeaderProps<T> {
  headers: (keyof T)[];
  primarykey: keyof T;
  requestSort: (key: keyof T) => void;
  sortConfig: SortConfig | null;
  config: TableConfig<T>;
}

const TableHeader = <T extends object>({
  headers,
  primarykey,
  requestSort,
  sortConfig,
  config,
}: TableHeaderProps<T>) => (
  <thead>
    <tr className="text-left border-t font-bold border-stroke dark:border-strokedark">
      {headers.map((header) =>
        header !== primarykey ? (
          <th
            key={String(header)}
            className="cursor-pointer px-4 py-4 text-slate-500 dark:text-white"
          >
            <div
              className="flex items-center"
              onClick={() => requestSort(header)}
            >
              <span>{config[header]?.displayName}</span>
              <SortIcon sortConfig={sortConfig} header={String(header)} />
            </div>
          </th>
        ) : null
      )}
      <th className="cursor-pointer align-text-top px-4 py-4 text-slate-500 dark:text-white">
        Actions
      </th>
    </tr>
  </thead>
);

export default TableHeader;
