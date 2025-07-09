import React from "react";
import { noop } from "../../../../utilities";
import type { BasicDataNode, DataNode } from "../interface";
import { TreeProps } from "../Tree";

export interface TreeContextProps<
  TreeDataType extends BasicDataNode = DataNode,
> {
  onNodeClick?: TreeProps<TreeDataType>["onClick"];
  onNodeExpand?: TreeProps<TreeDataType>["onExpand"];
}

const defaultTreeContextValue = {
  onNodeClick: noop,
  onNodeExpand: noop,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

const TreeContext = React.createContext(defaultTreeContextValue);

export default TreeContext;
