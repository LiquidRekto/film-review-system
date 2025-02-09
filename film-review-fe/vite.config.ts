import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  envPrefix: "APP_",
  server: {
    // Only available in dev mode
    // For production, a proxy server might be used - example: nginx
    proxy: {
      "/api": {
        target: process.env.VITE_API_URL,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  define: {
    global: {},
  },
});
