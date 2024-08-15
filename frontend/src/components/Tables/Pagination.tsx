import React from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { usePagination } from "@/hooks/usePagination"; // Adjust the import path as needed
import PaginationMetaData from "@/commons/interfaces/PaginationMetaData";

const Pagination = ({
  meta,
  handleParamsChange,
}: {
  meta: PaginationMetaData;
  handleParamsChange: (params: any) => void;
}) => {
  const { currentPage, goToPage, getPageNumbers, prevPage, nextPage } =
    usePagination(meta, handleParamsChange);

  return (
    <div className="flex justify-between border-t border-stroke px-6 pt-5 dark:border-strokedark">
      <div className="flex mb-4">
        <button
          className="flex cursor-pointer items-center justify-center rounded-md p-1 px-2 hover:bg-primary hover:text-white"
          onClick={prevPage}
          disabled={meta.prev === null}
        >
          <BsChevronLeft />
        </button>
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            className={`${
              page === currentPage
                ? "bg-primary text-white"
                : "bg-white text-black"
            } mx-1 flex cursor-pointer items-center justify-center rounded-md p-1 px-3 hover:bg-primary hover:text-white`}
            onClick={() => page !== "..." && goToPage(Number(page))}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}
        <button
          className="flex cursor-pointer items-center justify-center rounded-md p-1 px-2 hover:bg-primary hover:text-white"
          onClick={nextPage}
          disabled={meta.next === null}
        >
          <BsChevronRight />
        </button>
      </div>
      {/* <p className="font-medium text-gray-900 dark:text-white">
        Showing {currentPage} of {meta.lastPage}
      </p> */}
    </div>
  );
};

export default Pagination;
