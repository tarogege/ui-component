import { Field } from "../Field";
import { FormItemProps } from "./FormItem.types";
import { useFormItemStyles } from "./useFormItemStyles.styles";

export const FormItem = (props: FormItemProps) => {
  const { children, label, name, rules, ...rest } = props;

  const styles = useFormItemStyles(props);

  return (
    <div className={styles.root}>
      <div className={styles.label}>{label}</div>
      {name && (
        <div className={styles.control}>
          <Field name={name} rules={rules} {...rest}>
            {children}
          </Field>
        </div>
      )}
      {!name && <div className={styles.control}>{children}</div>}
    </div>
  );
};

FormItem.displayName = "FormItem";

export default FormItem;
