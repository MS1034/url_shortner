import React, { useState } from "react";

import Pagination from "./Pagination";
import { TableRowData } from "@/commons/types/TableRowData";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import GenericTableProps from "@/commons/interfaces/GenericTableProps";
import TableControls from "./TableControls";
import SkeletonLoader from "./SekeltonLoader";
import { TableColumnConfig } from "@/commons/helpers/SerializationHelper";

const DataTable = <T extends TableRowData>({
  data,
  meta,
  entity,
  onDelete,
  onEdit,
  primaryKey,
  config,
  handleParamsChange,
}: GenericTableProps<T>) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const headers = Object.keys(config).filter(
    (key) => (config as Record<string, TableColumnConfig<T>>)[key]?.show
  );

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
            primarykey={primaryKey}
            sortConfig={sortConfig}
            config={config}
          />
          <TableBody
            data={filteredData}
            onDelete={onDelete}
            onEdit={onEdit}
            entity={entity}
            primarykey={primaryKey}
            headers={headers}
            config={config}
          />
        </table>
      </div>
      <Pagination meta={meta} handleParamsChange={handleParamsChange} />
    </div>
  );
};

export default DataTable;
