import * as React from "react";
import { Callbacks, FormInstance, Store } from "../interface";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormProps<Values = any> = React.HTMLAttributes<HTMLFormElement> & {
  /**
   *  form name
   */
  name?: string;

  /**
   * form initial values
   */
  initialValues?: Store;
  /**
   * FormInstance
   */
  form?: FormInstance;
  /**
   * Called when the form is submitted and verification is successful
   */
  onFinish?: Callbacks<Values>["onFinish"];
  /**
   * Called when the form is finished failed
   */
  onFinishFailed?: Callbacks<Values>["onFinishFailed"];
};
