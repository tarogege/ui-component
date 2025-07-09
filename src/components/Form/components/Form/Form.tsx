import React, { useLayoutEffect } from "react";
import { type ForwardRefComponent, type FormProps } from "fish-ui-sy";
import { useFormStyles } from "./useFormStyles.styles";
import { FormInstance } from "../interface";
import useForm from "../hooks/useForm";
import FieldContext from "../context/FieldContext";

/** High-performance form component with data domain management. Includes data entry, validation, and corresponding styles.*/
export const Form: ForwardRefComponent<FormProps> = React.forwardRef(
  (props, ref) => {
    const {
      children,
      form,
      onFinish,
      onFinishFailed,
      initialValues,
      ...restProps
    } = props;

    const [formInstance] = useForm(form);

    useLayoutEffect(() => {
      if (initialValues) {
        formInstance?.setFieldsValue(initialValues);
      }
    }, [formInstance, initialValues]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    React.useImperativeHandle(ref, () => formInstance as any);

    formInstance.setCallbacks({
      onFinish,
      onFinishFailed,
    });

    const styles = useFormStyles(props);

    return (
      <form
        {...restProps}
        ref={ref as React.RefObject<HTMLFormElement>}
        className={styles.root}
        onSubmit={(e) => {
          e.preventDefault();
          formInstance.submit();
        }}
      >
        <FieldContext.Provider value={formInstance}>
          {children}
        </FieldContext.Provider>
      </form>
    );
  }
);

export { type FormInstance };

Form.displayName = "Form";
