import SortIcon from "./SortIcons";

const TableHeader = ({
  headers,
  requestSort,
  sortConfig,
}: {
  headers: string[];
  requestSort: (key: string) => void;
  sortConfig: { key: string; direction: "asc" | "desc" } | null;
}) => (
  <thead>
    <tr className="text-left border-t   font-bold border-stroke dark:border-strokedark">
      {headers.map((header) => (
        <th
          key={header}
          className="cursor-pointer px-4 py-4  text-slate-500 dark:text-white"
        >
          <div
            className="flex items-center"
            onClick={() => requestSort(header)}
          >
            <span>{header}</span>
            <SortIcon sortConfig={sortConfig} header={header} />
          </div>
        </th>
      ))}
      <th className="cursor-pointer align-text-top px-4 py-4  text-slate-500 dark:text-white">
        Actions
      </th>
    </tr>
  </thead>
);

export default TableHeader;
