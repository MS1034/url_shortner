import PaginationMetaData from "./PaginationMetaData";
export default interface GenericTableProps<T> {
  data: T[];
  meta: PaginationMetaData;
  isLoading: boolean;
  isError: boolean;
  handleParamsChange: (params: any) => void;
}
