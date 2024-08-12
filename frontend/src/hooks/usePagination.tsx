import { useState, useMemo } from "react";

interface PaginationMetaData {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: number | null;
  next: number | null;
}

export const usePagination = (
  meta: PaginationMetaData,
  handleParamsChange: (params: any) => void
) => {
  const [currentPage, setCurrentPage] = useState(meta.currentPage);

  const getPageNumbers = (): (string | number)[] => {
    const pages: (string | number)[] = [];
    const maxPagesToShow = 4;
    const range = Math.floor(maxPagesToShow / 2);

    if (meta.lastPage <= maxPagesToShow) {
      for (let i = 1; i <= meta.lastPage; i++) {
        pages.push(i);
      }
    } else {
      if (meta.currentPage <= range) {
        for (let i = 1; i <= maxPagesToShow - 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(meta.lastPage);
      } else if (meta.currentPage >= meta.lastPage - range) {
        pages.push(1);
        pages.push("...");
        for (
          let i = meta.lastPage - maxPagesToShow + 2;
          i <= meta.lastPage;
          i++
        ) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (
          let i = meta.currentPage - range + 1;
          i <= meta.currentPage + range - 1;
          i++
        ) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(meta.lastPage);
      }
    }

    return pages;
  };

  const goToPage = (page: number) => {
    if (page !== currentPage && page > 0 && page <= meta.lastPage) {
      setCurrentPage(page);
      handleParamsChange({ page });
    }
  };

  return {
    currentPage,
    goToPage,
    getPageNumbers,
    prevPage: () => goToPage(meta.prev || currentPage),
    nextPage: () => goToPage(meta.next || currentPage),
  };
};
