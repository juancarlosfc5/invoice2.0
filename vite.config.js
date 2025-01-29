import {defineConfig, loadEnv} from "vite";
import json from "@rollup/plugin-json";

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [json()],
    build: {
        outDir: "dist",
        sourcemap: true,
    },
    server: {
        host: env.VITE_HOST,
        port: env.VITE_PORT,
    },
  };
});