import Entity from "@/commons/Enums/Entity";
import DataTable from "@/components/Tables/DataTable";
import SkeletonLoader from "../Tables/SekeltonLoader";
import toast from "react-hot-toast";
import { urlConfig } from "@/commons/Serialization Objects/url.serialization";

type UrlDataTableProps = {
  isLoading: boolean;
  isError: boolean;
  data: any[];
  meta: any;
  handleParamsChange: (params: any) => void;
  onDelete: (url_id: string) => Promise<void>;
  onEdit: (url: URL) => Promise<void>;
};

const UrlDataTable = ({
  isLoading,
  isError,
  data,
  meta,
  handleParamsChange,
  onDelete,
  onEdit,
}: UrlDataTableProps) => (
  <>
    {isLoading ? (
      <SkeletonLoader />
    ) : isError ? (
      <p className="text-meta-1">Failed to load URLs. Please try again.</p>
    ) : (
      <DataTable
        isError={isError}
        isLoading={isLoading}
        data={data}
        primaryKey="url_id"
        entity={Entity.url}
        onEdit={onEdit}
        config={urlConfig}
        onDelete={onDelete}
        meta={meta}
        handleParamsChange={handleParamsChange}
      />
    )}
  </>
);

export default UrlDataTable;
