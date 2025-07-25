/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dts from "vite-plugin-dts";

function resolve(str: string) {
  return path.resolve(__dirname, str);
}

const ReactCompilerConfig = {
  sources: (filename: string) => {
    return filename.indexOf("src/components") !== -1;
  },
  target: "18",
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
      },
    }),
    dts({
      // 打包到一个index.d.ts文件中
      // rollupTypes: true,
    }),
  ],
  resolve: {
    alias: {
      "fish-ui-sy": path.resolve(__dirname, "./src/index.ts"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },

  build: {
    outDir: "dist",
    lib: {
      entry: resolve("src/index.ts"),
      name: "fish-ui-sy",
      fileName: (format) => `fish-ui-sy.${format}.js`,
      formats: ["cjs", "es", "umd"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        format: "cjs",
      },
    },
  },
});
