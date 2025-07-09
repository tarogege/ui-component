import { makeStyles, mergeClasses } from "@griffel/react";

/**
 * Static CSS class names used internally for the component slots.
 */
export const flexClassNames = {
  root: "fish-ui-Tree",
};

export const useStyles = makeStyles({
  root: {
    display: "block",
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
    lineStyle: "none",
  },
});

export const useTreeStyles = () => {
  const _styles = useStyles();
  const styles = {
    root: mergeClasses(flexClassNames.root, _styles.root),
  };

  return styles;
};
