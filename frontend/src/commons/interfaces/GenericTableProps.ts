import Entity from "../Enums/Entity";
import { TableConfig } from "../helpers/SerializationHelper";
import PaginationMetaData from "./PaginationMetaData";
export default interface GenericTableProps<T> {
  data: T[];
  config: TableConfig<T>;
  meta: PaginationMetaData;
  isLoading: boolean;
  entity: Entity;
  isError: boolean;
  onEdit: any;
  onDelete: any;
  primaryKey: string;
  handleParamsChange: (params: any) => void;
}
