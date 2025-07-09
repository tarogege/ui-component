/* eslint-disable @typescript-eslint/no-explicit-any */

export type StoreValue = any;
export type Store = Record<string, StoreValue>;
export type ErrorStore = Record<string, string | null>;

type Error = {
  [key: string]: string;
};

export type Errors = Error[];

export interface FormInstance {
  // Origin Form API
  getFieldValue: (name: string) => StoreValue;
  getFieldsValue: () => Store;
  setFieldsValue: (newStore: Store) => void;
  registerFieldEntities: (entity: FieldEntity) => () => void;
  submit: () => void;
  setCallbacks: (callbacks: Callbacks) => void;
  getErrorByName: (name: string) => string | null;
  validateField: (entity: FieldEntity) => Error | undefined;
}

export interface Callbacks<Values = any> {
  onFinish?: (values: Values) => void;
  onFinishFailed?: (err: Errors, store: Store) => void;
}

type Rule = {
  required?: boolean;
  message: string;
};

export type Rules = Rule[];

export interface FieldEntity {
  onStoreChange: (store?: Store) => void;
  props: {
    name: string;
    rules?: Rule[];
    initialValue?: any;
  };
}
