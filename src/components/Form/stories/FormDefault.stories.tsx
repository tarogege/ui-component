import React from "react";
import type { FormProps } from "fish-ui-sy";
import { Button, Checkbox, Form, Input, FormItem, Select } from "fish-ui-sy";

const onFinish: FormProps["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Default: React.FC = () => (
  <Form
    name="basic"
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true, username: "admin" }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
  >
    <FormItem
      label="Username"
      name="username"
      rules={[{ required: true, message: "Please input your username!" }]}
    >
      <Input />
    </FormItem>

    <FormItem
      label="Password"
      name="password"
      rules={[{ required: true, message: "Please input your password!" }]}
    >
      <Input type="password" />
    </FormItem>

    {/* <FormItem
      label="Gender"
      name="gender"
      rules={[{ required: true, message: "Please select your gender!" }]}
    >
      <Select>
        <option value="">请选择</option>
        <option value="female">female</option>
        <option value="male">male</option>
      </Select>
    </FormItem> */}

    <FormItem
      name="remember"
      valuePropName="checked"
      label={null}
      // rules={[{ required: true, message: "Please checked!" }]}
    >
      <Checkbox label="Remember me" />
    </FormItem>

    <FormItem label={null}>
      <Button appearance="primary">Submit</Button>
    </FormItem>
  </Form>
);

export default Default;
