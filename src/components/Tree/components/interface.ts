import React, { Key } from "react";

/** Provide a wrap type define for developer to wrap with customize fieldNames data type */
export type FieldDataNode<
  T,
  ChildFieldName extends string = "children",
> = BasicDataNode &
  T &
  Partial<Record<ChildFieldName, FieldDataNode<T, ChildFieldName>[]>>;

export type DataNode = FieldDataNode<{
  key: Key;
  title?: React.ReactNode;
}>;

/** For fieldNames, we provides a abstract interface */
export interface BasicDataNode {
  key: Key;
  title?: React.ReactNode;
  children?: this[];

  disabled?: boolean;
  isLeaf?: boolean;

  /** Set style of TreeNode. This is not recommend if you don't have any force requirement */
  className?: string;
  style?: React.CSSProperties;
}

export interface FlattenNode<TreeDataType extends BasicDataNode> {
  title: React.ReactNode;
  key: Key;
  disabled?: boolean;

  parent: FlattenNode<TreeDataType> | null;
  children: FlattenNode<TreeDataType>[];
  pos: string;
  data: TreeDataType;
}

export type EventDataNode<TreeDataType> = {
  key: Key;
  expanded: boolean;
  pos: string;
  active: boolean;
} & TreeDataType &
  BasicDataNode;
