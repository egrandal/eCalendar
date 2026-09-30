import { defineConfig } from "vite";
export default defineConfig({
  base: "/admin/",
  server: {
    proxy: {
      "/health": "http://127.0.0.1:3000",
      "/ready": "http://127.0.0.1:3000",
      "/e/": "http://127.0.0.1:3000",
      "/widget/": "http://127.0.0.1:3000",
    },
  },
});
