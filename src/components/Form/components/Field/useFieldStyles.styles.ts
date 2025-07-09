import { makeStyles, mergeClasses } from "@griffel/react";
import { tokens } from "../../../../tokens";

/**
 * Static CSS class names used internally for the component slots.
 */
export const optionsClassNames = {
  root: "fish-ui-Field",
};

export const useStyles = makeStyles({
  root: {
    display: "flex",
    height: "30px",
  },
  error: {
    color: tokens.colorPaletteRedBackground3,
    marginTop: "4px",
  },
});

export const useFieldStyles = () => {
  const _styles = useStyles();
  const styles = {
    root: mergeClasses(optionsClassNames.root),
    error: mergeClasses(_styles.error),
  };

  return styles;
};
