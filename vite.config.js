import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgLoader from "vite-svg-loader";

export default defineConfig({
  plugins: [react(), svgLoader({ svgrOptions: { icon: true } })],
  server: {
    host: "0.0.0.0",
  },
  css: {
    preprocessorOptions: {
      scss: {

      }
    }
  }
});
