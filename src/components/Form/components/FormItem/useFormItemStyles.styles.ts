import { makeStyles, mergeClasses } from "@griffel/react";
import { FormItemProps } from "./FormItem.types";
import { tokens } from "../../../../tokens";

/**
 * Static CSS class names used internally for the component slots.
 */
export const optionsClassNames = {
  root: "fish-ui-FormItem",
};

export const useStyles = makeStyles({
  root: {
    display: "flex",
    boxSizing: "border-box",
    padding: 0,
    lineStyle: "none",
    verticalAlign: "top",
    marginBottom: "24px",
    flexFlow: "row wrap",
    minWidth: "0",
  },
  label: {
    boxSizing: "border-box",
    position: "relative",
    flexGrow: 0,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textAlign: "end",
    verticalAlign: "middle",
    flex: "0 0 33.33333333333333%",
    maxWidth: "33.33333333333333%",
  },

  requiredLabel: {
    "&::before": {
      content: "'*'",
      display: "inline-block",
      color: "red",
      marginInlineEnd: "4px",
    },
  },

  colonLabel: {
    "&::after": {
      content: "':'",
      display: "inline-block",
      margin: "0 8px",
    },
  },

  control: {
    boxSizing: "border-box",
    position: "relative",
    flex: "1 1 0",
    minWidth: "0",
    flexDirection: "column",
    flexGrow: 1,
    maxWidth: "66.66666666666666%",
  },
});

export const useFormItemStyles = (props: Partial<FormItemProps>) => {
  const { className, required, rules, label } = props;
  const requiredRules = rules?.find((rule) => rule.required);
  const hasRequiredRule = required || !!requiredRules;
  const _styles = useStyles();
  const styles = {
    root: mergeClasses(optionsClassNames.root, _styles.root, className),
    label: mergeClasses(
      _styles.label,
      !!label && _styles.colonLabel,
      hasRequiredRule && _styles.requiredLabel
    ),
    control: mergeClasses(_styles.control),
  };

  return styles;
};
