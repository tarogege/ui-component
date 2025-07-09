import type { BasicDataNode, DataNode, FlattenNode } from "../interface";

export interface TreeNodeProps<TreeDataType extends BasicDataNode = DataNode> {
  node: {
    className?: string;
    style?: React.CSSProperties;
    id?: string;

    // By parent
    expanded?: boolean;
    title?: React.ReactNode;
    pos?: string;
    /** New added in Tree for easy data access */
    data?: TreeDataType;
    active?: boolean;

    // By user
    isLeaf?: boolean;
    disabled?: boolean;
    icon?: React.ReactNode;
    children?: FlattenNode<TreeDataType>[];
  };
}
