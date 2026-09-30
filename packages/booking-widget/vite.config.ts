import { defineConfig } from "vite";
export default defineConfig({
  build: {
    lib: {
      entry: "src/booking.ts",
      formats: ["es"],
      fileName: () => "booking.js",
    },
  },
  server: { proxy: { "/health": "http://127.0.0.1:3000" } },
});
