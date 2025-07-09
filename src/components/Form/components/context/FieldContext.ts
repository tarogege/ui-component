import React from "react";
import type { FormInstance } from "../interface";
import { noop } from "../../../../utilities";

const defaultFormInstance = {
  getFieldValue: noop,
  getFieldsValue: () => {
    return {};
  },
  setFieldsValue: noop,
  registerFieldEntities: () => noop,
  submit: noop,
  setCallbacks: noop,
  getErrorByName: () => "",
  validateField: noop,
} as FormInstance;

const FieldContext = React.createContext<FormInstance>(defaultFormInstance);

export default FieldContext;
