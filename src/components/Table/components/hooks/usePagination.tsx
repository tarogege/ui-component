import { useState } from "react";
import type { PaginationProps } from "fish-ui-sy";
import type { TablePaginationConfig } from "../interface";

export const DEFAULT_PAGE_SIZE = 10;

function usePagination(
  total: number,
  onChange: (current: number, pageSize: number) => void,
  pagination?: TablePaginationConfig | false
): [
  {
    current: number;
    pageSize: number;
    total: number;
    onChange: PaginationProps["onChange"];
  },
  (current?: number, pageSize?: number) => void,
] {
  const { total: paginationTotal = 0, ...paginationObj } =
    pagination && typeof pagination === "object" ? pagination : {};

  const [innerPagination, setInnerPagination] = useState<{
    current?: number;
    pageSize?: number;
  }>(() => ({
    current:
      "defaultCurrent" in paginationObj ? paginationObj.defaultCurrent : 1,
    pageSize:
      "defaultPageSize" in paginationObj
        ? paginationObj.defaultPageSize
        : DEFAULT_PAGE_SIZE,
  }));

  // ============ Basic Pagination Config ============
  const mergedPagination = {
    ...innerPagination,
    ...paginationObj,
    total: paginationTotal > 0 ? paginationTotal : total,
  };

  // Reset `current` if data length or pageSize changed
  const maxPage = Math.ceil(
    (paginationTotal || total) / mergedPagination.pageSize!
  );
  if (mergedPagination.current! > maxPage) {
    // Prevent a maximum page count of 0
    mergedPagination.current = maxPage || 1;
  }

  const refreshPagination = (current?: number, pageSize?: number) => {
    setInnerPagination({
      current: current ?? 1,
      pageSize: pageSize || mergedPagination.pageSize,
    });
  };

  const onInternalChange: PaginationProps["onChange"] = (current, pageSize) => {
    if (pagination) {
      pagination.onChange?.(current, pageSize);
    }
    refreshPagination(current, pageSize);
    onChange(current, pageSize || mergedPagination.pageSize!);
  };

  if (pagination === false) {
    return [
      {
        current: 1,
        pageSize: total, //DEFAULT_PAGE_SIZE,
        total,
        onChange: onInternalChange,
      },
      refreshPagination,
    ];
  }

  return [
    {
      ...mergedPagination,
      onChange: onInternalChange,
    } as {
      current: number;
      pageSize: number;
      total: number;
      onChange: PaginationProps["onChange"];
    },
    refreshPagination,
  ];
}

export default usePagination;
