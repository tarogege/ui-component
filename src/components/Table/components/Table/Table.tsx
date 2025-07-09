import * as React from "react";
import type { ChangeEventInfo, TableProps } from "./Table.types";
import { useTableStyles } from "./useTableStyles.styles";
import { TableHeader } from "../TableHeader";
import { TableBody } from "../TableBody";
import type {
  ColumnType,
  DefaultRecordType,
  GetRowKey,
  SortInfo,
  TableAction,
} from "../interface";
import { useColumns } from "../hooks/useColumns";
import { TableContextProvider } from "../context/TableContext";
import { useSelection } from "../hooks/useSelection";
import { areArraysEqual } from "../../../../utilities";
import { Pagination } from "../../../Pagination";
import usePagination from "../hooks/usePagination";

/**
 * A table displays rows of data.
 */
export const Table = React.forwardRef(function Table<
  RecordType extends DefaultRecordType,
>(props: TableProps<RecordType>, ref: React.Ref<HTMLDivElement>) {
  const {
    className,
    dataSource = [],
    rowKey = "key",
    showHeader = true,
    // title,
    // footer,
    columns,
    children,
    bordered = false,
    rowSelection,
    onChange, //当展示数据发生变化时触发，如排序
    pagination,
    ...restProps
  } = props;

  const styles = useTableStyles({ className, bordered });

  // ========================== Columns ==========================
  // 第一个参数是_baseColumns 暂时不用
  const [, flattenColumns] = useColumns(columns, children);

  const getRowKey = React.useMemo<GetRowKey<RecordType>>(() => {
    if (typeof rowKey === "function") {
      return rowKey;
    }
    return (record: RecordType) => {
      const key = record && record[rowKey as keyof RecordType];

      return key;
    };
  }, [rowKey]);

  // ========================== Selections ==========================
  const [mergedColumns] = useSelection(
    flattenColumns,
    dataSource,
    getRowKey,
    rowSelection
  );

  // ========================== Pagination ==========================

  const onPaginationChange = (current: number, pageSize: number) => {
    triggerOnChange(
      {
        pagination: {
          ...changeEventInfo.current.pagination,
          current,
          pageSize,
        },
      },
      "paginate"
    );
  };

  const [mergedPagination] = usePagination(
    dataSource.length,
    onPaginationChange,
    pagination
  );

  // const changeEventInfo: Partial<ChangeEventInfo<RecordType>> = {};
  const changeEventInfo = React.useRef<Partial<ChangeEventInfo<RecordType>>>({
    pagination: { ...mergedPagination },
  });

  const currentDataSource = React.useMemo(() => {
    const { current, pageSize } = mergedPagination;
    return dataSource.slice((current - 1) * pageSize, current * pageSize);
  }, [dataSource, mergedPagination]);

  // ============================ Events =============================

  const [sortInfo, setSortInfo] = React.useState<SortInfo>([null, null]);

  // ========================== Sort Data ==========================
  // 根据 sortInfo 排序 currentDataSource
  const sortedData = React.useMemo(() => {
    if (typeof sortInfo[0] === "number") {
      // 创建一个新数组并使用 sortInfo 排序
      const { sorter } = mergedColumns[sortInfo[0]] as ColumnType<RecordType>;
      if (typeof sorter === "function") {
        const sortedSource = [...currentDataSource].toSorted((a, b) => {
          const result = sorter?.(a, b) ?? 0; // 确保 sortInfo 是一个有效函数

          return sortInfo[1] === "ascend" ? result : -result;
        });
        return sortedSource;
      }
    }

    // 如果没有 sorter，直接返回 currentDataSource
    return currentDataSource;
  }, [currentDataSource, sortInfo, mergedColumns]);

  const triggerOnChange = (
    info: Partial<ChangeEventInfo<RecordType>>,
    action: TableAction
  ) => {
    const changeInfo = {
      ...changeEventInfo.current,
      ...info,
    };
    changeEventInfo.current.pagination = changeInfo.pagination;
    changeEventInfo.current.sorter = changeInfo.sorter;
    onChange?.(changeInfo.pagination!, changeInfo.sorter!, {
      currentDataSource: sortedData as RecordType[],
      action,
    });
  };

  const updateSortInfo = React.useCallback(
    (_sortInfo: SortInfo) => {
      let newSortInfo = _sortInfo;
      if (areArraysEqual(sortInfo, _sortInfo)) {
        newSortInfo = [null, null];
      }

      setSortInfo(newSortInfo);
      const index = newSortInfo[0];
      let column;
      if (index !== null) {
        column = mergedColumns[index] as ColumnType<RecordType>;
      }
      triggerOnChange(
        {
          sorter: {
            order: newSortInfo[1],
            field: column?.dataIndex || column?.key,
            column,
          },
        },
        "sort"
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sortInfo, mergedColumns]
  );

  const TableContextValue = React.useMemo(() => {
    return {
      bordered,
      sortInfo,
      updateSortInfo,
    };
  }, [bordered, sortInfo, updateSortInfo]);

  return (
    <TableContextProvider value={TableContextValue}>
      <div
        {...restProps}
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        className={styles.root as any}
        ref={ref}
      >
        <table className={styles.table}>
          {showHeader && <TableHeader<RecordType> columns={mergedColumns} />}
          <TableBody<RecordType>
            data={sortedData as RecordType[]}
            columns={mergedColumns}
            getRowKey={getRowKey}
          />
        </table>

        {pagination != false && <Pagination {...mergedPagination} />}
      </div>
    </TableContextProvider>
  );
}) as <RecordType extends DefaultRecordType>(
  props: TableProps<RecordType> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement;

type TableType = typeof Table & {
  displayName: string;
};

(Table as TableType).displayName = "Table";
