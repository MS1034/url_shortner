const TableControls = ({
  searchQuery,
  setSearchQuery,
  handleParamsChange,
}: {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleParamsChange: (params: any) => void;
}) => (
  <div className="flex justify-between px-8 py-4">
    <div className="w-100">
      <input
        className="w-full rounded-md border border-stroke bg-transparent px-5 py-2.5 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary"
        placeholder="Search..."
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>

    <div className="flex items-center font-medium">
      <select
        className="bg-transparent pl-2 text-slate-500"
        onChange={(e) => handleParamsChange({ pageSize: e.target.value })}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
      <p className="pl-2 text-black dark:text-white text-sm">Per Page</p>
    </div>
  </div>
);

export default TableControls;
