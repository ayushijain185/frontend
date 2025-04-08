import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite config
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Alias for the src folder
    },
  },
});
