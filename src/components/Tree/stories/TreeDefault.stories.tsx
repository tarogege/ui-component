import React from "react";
import { Tree } from "fish-ui-sy";
import type { TreeDataNode, TreeProps } from "fish-ui-sy";

const treeData: TreeDataNode[] = [
  {
    title: "parent 1",
    key: "0-0",
    children: [
      {
        title: "parent 1-0",
        key: "0-0-0",
        disabled: true,
        children: [
          {
            title: "leaf",
            key: "0-0-0-0",
          },
          {
            title: "leaf",
            key: "0-0-0-1",
          },
        ],
      },
      {
        title: "parent 1-1",
        key: "0-0-1",
        children: [
          {
            title: <span style={{ color: "#1677ff" }}>sss</span>,
            key: "0-0-1-0",
          },
        ],
      },
    ],
  },
];

const App: React.FC = () => {
  const onClick: TreeProps["onClick"] = (e, node) => {
    console.log("click", e, node);
  };

  const onExpand: TreeProps["onExpand"] = (e, node) => {
    console.log("expand", e, node);
  };

  return (
    <Tree
      treeData={treeData}
      onClick={onClick}
      onExpand={onExpand}
      // defaultExpandAll
      // defaultExpandedKeys={["0-0-0", "0-0-1"]}
    />
  );
};

export default App;
