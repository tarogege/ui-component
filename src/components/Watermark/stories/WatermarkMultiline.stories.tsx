import React from "react";
import { Watermark } from "fish-ui-sy";

const Default: React.FC = () => (
  <Watermark content={["UI", "maomao"]}>
    <div style={{ height: 500 }} />
  </Watermark>
);

export default Default;
