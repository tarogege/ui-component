/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta } from "@storybook/react";
import { Tree } from "fish-ui-sy";

import Default from "./TreeDefault.stories";

// ! raw code imports
/*  @ts-expect-error - required for ts*/
import DefaultSource from "./TreeDefault.stories.tsx?raw";

const meta: Meta = {
  title: "组件/Tree",
  component: Tree,
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
