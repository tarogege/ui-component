import React from "react";
import { Space, Table } from "fish-ui-sy";
import type { TableProps, PaginationProps } from "fish-ui-sy";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const showTotal: PaginationProps["showTotal"] = (total) =>
  `Total ${total} items`;

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    align: "center",
    title: "Action",
    dataIndex: "action",
    render: (_, record, renderIndex) => (
      <Space size="medium">
        <a>
          Invite {record.name} {renderIndex}
        </a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data2 = Array.from({ length: 199 }, (_, i) => ({
  key: String(i),
  name: `UU ${i}`,
  age: i + 1,
  address: `London, Park Lane no. ${i}`,
}));

const TablePagination: React.FC = () => (
  <div>
    <Table<DataType>
      columns={columns}
      dataSource={data2}
      bordered={true}
      pagination={{
        // defaultCurrent: 1, // 当前页
        // defaultPageSize: 10, // 每页显示条数
        // total: data2.length, // 数据总条数
        showSizeChanger: true, // 是否显示每页条数选择器
        pageSizeOptions: [5, 10, 20, 50], // 每页条数选项
        showQuickJumper: true, // 是否可以快速跳转到某页
        onChange: (page, pageSize) => {
          console.log(`Page: ${page}, PageSize: ${pageSize}`);
        },
        showTotal,
        paginationAlign: "end",
      }}
      onChange={(pagination, sorter, extra) => {
        console.log("table展示的数据发生改变", pagination, sorter, extra);
      }}
    />
  </div>
);

export default TablePagination;
