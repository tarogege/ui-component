import { useContext, useMemo } from "react";
import type { TreeNodeProps } from "./TreeNode.types";
import { useTreeNodeStyles } from "./useTreeNodeStyles.styles";
import {
  ChevronDown12Regular,
  ChevronRight12Regular,
} from "fish-ui-sy-react-icons";
import TreeContext from "../context/TreeContext";

export function TreeNode(props: TreeNodeProps) {
  const { node } = props;
  const { icon, title, pos = "", style, expanded, disabled } = node;

  const styles = useTreeNodeStyles(props);

  const isLeafNode = useMemo(() => isLeaf(props), [props]);

  const { onNodeExpand, onNodeClick } = useContext(TreeContext);

  // Disabled item still can be switch
  const onExpand: React.MouseEventHandler<HTMLDivElement> = (e) => {
    // if (disabled) return;

    onNodeExpand && onNodeExpand(e, node);
  };

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    onNodeClick && onNodeClick(e, node);
  };
  const paddingLeft = useMemo(() => {
    const level = (pos.match(/-/g) || []).length;
    return (level - 1) * 24;
  }, [pos]);

  return (
    <div
      className={styles.root}
      style={{
        paddingLeft,
        ...style,
      }}
    >
      {isLeafNode ? null : (
        <span className={styles.icon} onClick={onExpand}>
          {expanded ? <ChevronDown12Regular /> : <ChevronRight12Regular />}
        </span>
      )}

      <span role="treeitem" className={styles.root} onClick={onClick}>
        {icon}
        {title}
      </span>
    </div>
  );
}

TreeNode.displayName = "TreeNode";

export default TreeNode;

const isLeaf = (props: TreeNodeProps): boolean => {
  const { isLeaf, children } = props.node;

  const hasChildren = !!(children || []).length;

  const hasChildren2 = !!(props?.node.data?.children || []).length;

  if (isLeaf === false) {
    return false;
  }

  return isLeaf || !(hasChildren || hasChildren2);
};
