import React from "react";
import type {
  Callbacks,
  ErrorStore,
  Errors,
  FieldEntity,
  FormInstance,
  Store,
} from "../interface";

class FormStore {
  private store: Store;
  private errorStore: ErrorStore;
  private fieldEntities: FieldEntity[];
  private callbacks: Callbacks;

  constructor() {
    this.store = {};
    this.errorStore = {};
    this.fieldEntities = [];
    this.callbacks = {};
  }

  setCallbacks = (callbacks: Callbacks) => {
    this.callbacks = { ...this.callbacks, ...callbacks };
  };

  // 注册实例(forceUpdate)
  // 注册与取消注册
  // 订阅与取消订阅
  registerFieldEntities = (entity: FieldEntity) => {
    this.fieldEntities.push(entity);

    return () => {
      this.fieldEntities = this.fieldEntities.filter((item) => item !== entity);
      delete this.store[entity.props.name];
      delete this.errorStore[entity.props.name];
    };
  };

  // get
  getFieldsValue = () => {
    return { ...this.store };
  };

  getFieldValue = (name: string) => {
    return this.store[name];
  };

  // set
  // password: 123
  setFieldsValue = (newStore: Store) => {
    // 1. update store
    this.store = {
      ...this.store,
      ...newStore,
    };

    // 2. update Field
    this.fieldEntities.forEach((entity) => {
      Object.keys(newStore).forEach((k) => {
        if (k === entity.props.name) {
          entity.onStoreChange();
        }
      });
    });
  };

  validateField = (entity: FieldEntity) => {
    let err;
    const { name, rules } = entity.props;
    const value = this.getFieldValue(name);
    const rule = rules?.[0];
    if (rule && rule.required && isInValidValue(value)) {
      err = { [name]: rule.message, value };
      const old = this.errorStore[name];
      if (old !== rule.message) {
        this.errorStore[name] = rule.message;
        entity.onStoreChange();
      }
    } else {
      this.errorStore[name] = null;
      entity.onStoreChange();
    }

    return err;
  };

  validate = () => {
    const errors: Errors = [];
    // 简版校验
    this.fieldEntities.forEach((entity) => {
      const res = this.validateField(entity);
      if (res) {
        errors.push(res);
      }
    });

    return errors;
  };

  submit = () => {
    const errors: Errors = this.validate();
    // 提交
    const { onFinish, onFinishFailed } = this.callbacks;

    if (errors.length === 0) {
      // 校验通过
      onFinish && onFinish(this.getFieldsValue());
    } else {
      // 校验不通过
      onFinishFailed && onFinishFailed(errors, this.getFieldsValue());
    }
  };

  getErrorByName = (name: string) => {
    return this.errorStore[name];
  };

  getForm = (): FormInstance => {
    return {
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
      setFieldsValue: this.setFieldsValue,
      registerFieldEntities: this.registerFieldEntities,
      submit: this.submit,
      setCallbacks: this.setCallbacks,
      getErrorByName: this.getErrorByName,
      validateField: this.validateField,
    };
  };
}

export default function useForm(form?: FormInstance) {
  // 存值，在组件卸载之前指向的都是同一个值
  const formRef = React.useRef<FormInstance | null>(null);
  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      const formStore = new FormStore();

      formRef.current = formStore.getForm();
    }
  }
  return [formRef.current];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isInValidValue = (value: any) => {
  if (
    value === undefined ||
    value === "" ||
    value === null ||
    value === false
  ) {
    return true;
  }
  return false;
};
