import { Key } from "react";
import { BasicDataNode, DataNode, FlattenNode } from "../components/interface";

export function getPosition(level: string | number, index: number) {
  return `${level}-${index}`;
}

/**
 * Flat nest tree data into flatten list. This is used for virtual list render.
 * @param treeNodeList Origin data node list
 * @param expandedKeys
 * need expanded keys, provides `true` means all expanded (used in `rc-tree-select`).
 */
export function flattenTreeData<TreeDataType extends BasicDataNode = DataNode>(
  treeNodeList: TreeDataType[],
  expandedKeys: Key[]
): FlattenNode<TreeDataType>[] {
  const expandedKeySet = new Set(expandedKeys);
  const flattenList: FlattenNode<TreeDataType>[] = [];

  function dig(
    list: TreeDataType[],
    parent?: FlattenNode<TreeDataType>
  ): FlattenNode<TreeDataType>[] {
    return list.map((treeNode, index) => {
      const pos: string = getPosition(parent ? parent.pos : "0", index);
      const mergedKey = treeNode.key || pos;

      const flattenNode: FlattenNode<TreeDataType> = {
        key: mergedKey,
        title: treeNode.title,
        disabled: treeNode.disabled,
        parent: parent || null,
        pos,
        children: [],
        data: treeNode,
      };
      flattenList.push(flattenNode);

      // Loop treeNode children
      if (expandedKeySet.has(mergedKey)) {
        if (treeNode.children) {
          flattenNode.children = dig(treeNode.children || [], flattenNode);
        }
      }

      return flattenNode;
    });
  }

  dig(treeNodeList);

  return flattenList;
}
