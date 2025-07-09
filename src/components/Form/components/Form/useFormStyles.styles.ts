import { makeStyles, mergeClasses, shorthands } from "@griffel/react";
import type { FormProps } from "./Form.types";
import { tokens } from "../../../../tokens";

/**
 * Static CSS class names used internally for the component slots.
 */
export const flexClassNames = {
  root: "fish-ui-Form",
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

export const useDisabledStyles = makeStyles({
  yes: {
    cursor: "not-allowed",
    backgroundColor: tokens.colorNeutralBackgroundDisabled,
    ...shorthands.borderColor(tokens.colorNeutralForegroundDisabled),
    color: tokens.colorNeutralStrokeDisabled,
  },
  no: {
    cursor: "pointer",
    ":hover": {
      ...shorthands.borderColor(tokens.colorNeutralForeground2BrandHover),
      color: tokens.colorNeutralForeground2BrandHover,
    },
  },
});

export const useFormStyles = (props: Partial<FormProps>) => {
  const { className } = props;

  const _styles = useStyles();
  const styles = {
    root: mergeClasses(flexClassNames.root, _styles.root, className),
  };

  return styles;
};
