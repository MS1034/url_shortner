const SortIcon = ({
  sortConfig,
  header,
}: {
  sortConfig: { key: string; direction: "asc" | "desc" } | null;
  header: string;
}) => (
  <div className="ml-2 inline-flex flex-col space-y-[2px]">
    <svg
      className={`fill-current ${
        sortConfig?.key === header && sortConfig?.direction === "asc"
          ? "text-primary"
          : ""
      }`}
      width="10"
      height="5"
      viewBox="0 0 10 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 0L0 5H10L5 0Z" />
    </svg>
    <svg
      className={`fill-current ${
        sortConfig?.key === header && sortConfig?.direction === "desc"
          ? "text-primary"
          : ""
      }`}
      width="10"
      height="5"
      viewBox="0 0 10 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 5L10 0L0 0L5 5Z" />
    </svg>
  </div>
);

export default SortIcon;
