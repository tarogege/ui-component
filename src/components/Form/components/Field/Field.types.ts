import { ReactElement } from "react";
import { Rules } from "../interface";

export interface FieldProps {
  disabled?: boolean;
  required?: boolean;
  name: string;
  valuePropName?: "value" | "checked";
  children: ReactElement;
  rules?: Rules;
}
