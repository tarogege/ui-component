/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta } from "@storybook/react";
import { Form } from "fish-ui-sy";

import Default from "./FormDefault.stories";

// ! raw code imports
/*  @ts-expect-error - required for ts*/
import DefaultSource from "./FormDefault.stories.tsx?raw";

const meta: Meta = {
  title: "组件/Form",
  component: Form,
};

export default meta;

(Default as any).parameters = {
  docs: {
    source: {
      code: DefaultSource,
    },
  },
};

export { Default };
