import type { Key } from "react";
import type { BasicDataNode, DataNode, EventDataNode } from "../interface";

export type TreeDataNode = DataNode;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface TreeProps<TreeDataType extends BasicDataNode = DataNode> {
  /**
   * tree data
   */
  treeData?: TreeDataType[]; // Generate treeNode by children

  // /**
  //  *  expanded keys
  //  */
  // // expandedKeys?: Key[];

  /**
   * default expand all treeNodes
   */
  defaultExpandAll?: boolean;

  /**
   * default expanded keys
   * @default []
   */
  defaultExpandedKeys?: Key[];

  /**
   * callback function for expand or collapse
   */
  onExpand?: (
    expandedKeys: Key[],
    info: {
      node: EventDataNode<TreeDataType>;
      expanded: boolean;
      nativeEvent: MouseEvent;
    }
  ) => void;

  /**
   * callback function for click
   */
  onClick?: NodeMouseEventHandler<TreeDataType>;
}

export type NodeMouseEventHandler<
  TreeDataType extends BasicDataNode,
  T = HTMLSpanElement,
> = (e: React.MouseEvent<T>, node: EventDataNode<TreeDataType>) => void;
