/* eslint-disable @typescript-eslint/no-explicit-any */

import { FieldProps } from "../Field";

export interface FormItemProps extends Omit<FieldProps, "name"> {
  label?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  // children?: ChildrenType<Values>;
  id?: string;
  required?: boolean;
  name?: string;
}
