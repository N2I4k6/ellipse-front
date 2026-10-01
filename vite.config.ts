import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "node:path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      svgr({
        include: "**/*.svg?react",
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "./src"),
      },
    },
    server: {
      port: 5173,
      open: true,
      proxy: {
        "/api": {
          target: env.VITE_PROXY_TARGET || "https://elltpse-back.onrender.com",
          changeOrigin: true,
          secure: true,
        },
      },
    },
    build: {
      target: "es2020",
      sourcemap: mode !== "production",
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom", "react-router-dom"],
            redux: ["@reduxjs/toolkit", "react-redux"],
            antd: ["antd"],
          },
        },
      },
    },
  };
});
