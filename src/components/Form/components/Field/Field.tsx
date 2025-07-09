import React from "react";
import type { FieldProps } from "./Field.types";
import FieldContext from "../context/FieldContext";
import { useStyles } from "./useFieldStyles.styles";
import type { CheckboxOnChangeData, SelectOnChangeData } from "fish-ui-sy";
import { InputOnChangeData } from "../../../Input/Input.types";

export function Field(props: FieldProps) {
  const { children, name, valuePropName } = props;

  const {
    getFieldValue,
    setFieldsValue,
    registerFieldEntities,
    getErrorByName,
    validateField,
  } = React.useContext(FieldContext);

  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  React.useLayoutEffect(() => {
    const unregister = registerFieldEntities({
      props,
      onStoreChange: forceUpdate,
    });
    // 1. 组件卸载之前执行 2. 依赖项变化时，更新之前执行
    return unregister;
  }, [registerFieldEntities, props]);

  const getControlled = () => {
    const valueName = valuePropName || "value"; // 比如checkbox的value是checked
    return {
      [valueName]: getFieldValue(name), //"omg", // get state
      onChange: (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _: any,
        data: CheckboxOnChangeData | InputOnChangeData | SelectOnChangeData
      ) => {
        const newValue = "value" in data ? data.value : data.checked;

        // set state
        setFieldsValue({ [name]: newValue });
        if (props.rules) {
          validateField({ props, onStoreChange: forceUpdate });
        }
      },
    };
  };

  const returnChildNode = React.cloneElement(children, getControlled());
  const styles = useStyles();

  const error = getErrorByName(name);

  return (
    <>
      {returnChildNode}
      {error && <div className={styles.error}> {getErrorByName(name)}</div>}
    </>
  );
}

Field.displayName = "Field";

export default Field;
