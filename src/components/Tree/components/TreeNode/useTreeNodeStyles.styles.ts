import { makeStyles, mergeClasses } from "@griffel/react";
import { TreeNodeProps } from "./TreeNode.types";
import { tokens } from "../../../../tokens";

/**
 * Static CSS class names used internally for the component slots.
 */
export const optionsClassNames = {
  root: "fish-ui-TreeNode",
};

export const useStyles = makeStyles({
  root: {
    cursor: "pointer",
    display: "flex",
    height: "30px",
  },

  disabled: {
    color: tokens.colorNeutralStrokeDisabled,
  },

  icon: {
    marginRight: "4px",
  },
});

export const useTreeNodeStyles = (props: TreeNodeProps) => {
  const { className, disabled } = props.node;
  const _styles = useStyles();
  const styles = {
    root: mergeClasses(
      optionsClassNames.root,
      _styles.root,
      disabled && _styles.disabled,
      className
    ),
    icon: mergeClasses(_styles.icon),
  };

  return styles;
};
