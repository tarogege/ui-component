import React from "react";
import { arrAdd, arrDel, type TreeProps } from "fish-ui-sy";
import { useTreeStyles } from "./useTreeStyles.styles";
import type { BasicDataNode, DataNode, EventDataNode } from "../interface";
import { flattenTreeData } from "../../utils/treeUtil";
import { TreeNode } from "../TreeNode";
import TreeContext from "../context/TreeContext";

/** Multiple-level structure list.*/
export const Tree = React.forwardRef(function Tree<
  TreeDataType extends BasicDataNode = DataNode,
>(props: TreeProps<TreeDataType>, ref: React.Ref<HTMLDivElement>) {
  const {
    treeData = [],
    defaultExpandedKeys = [],
    defaultExpandAll = false,
    onExpand,
    onClick,
    ...restProps
  } = props;

  const [expandedKeys, setExpandedKeys] = React.useState(() => {
    if (!defaultExpandAll) {
      return defaultExpandedKeys;
    } else {
      // 默认展开所有节点
      const _defaultExpandedKeys: React.Key[] = [];
      const loop = (data: TreeDataType[]) => {
        data.forEach((item) => {
          if (item.children) {
            _defaultExpandedKeys.push(item.key);
            loop(item.children);
          }
        });
      };
      loop(treeData);
      return _defaultExpandedKeys;
    }
  });

  const flattenNodes = flattenTreeData(treeData, expandedKeys);

  const onNodeExpand = (
    e: React.MouseEvent,
    treeNode: EventDataNode<TreeDataType>
  ) => {
    const { expanded } = treeNode;

    const key = treeNode.key;

    // Update selected keys
    const targetExpanded = !expanded;

    let _expandedKeys;

    if (targetExpanded) {
      _expandedKeys = arrAdd(expandedKeys, key);
    } else {
      _expandedKeys = arrDel(expandedKeys, key);
    }

    setExpandedKeys(_expandedKeys);

    onExpand?.(_expandedKeys, {
      node: treeNode,
      expanded: targetExpanded,
      nativeEvent: e.nativeEvent,
    });
  };

  const onNodeClick = (
    e: React.MouseEvent<HTMLDivElement>,
    treeNode: EventDataNode<TreeDataType>
  ) => {
    onClick?.(e, treeNode);
  };

  const TreeContextValue = {
    onNodeExpand,
    onNodeClick,
  };

  const styles = useTreeStyles();

  return (
    <div
      {...restProps}
      role="tree"
      ref={ref as React.RefObject<HTMLDivElement>}
      className={styles.root}
    >
      <TreeContext.Provider value={TreeContextValue}>
        {flattenNodes.map((node) => {
          const nodeProps = {
            ...node,
            expanded: expandedKeys.indexOf(node.key) !== -1,
          };
          return <TreeNode key={node.key} node={nodeProps} />;
        })}
      </TreeContext.Provider>
    </div>
  );
});

Tree.displayName = "Tree";
