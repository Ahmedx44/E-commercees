import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // Directory where test files are located
    dir: "test",
    // File pattern to match test files
    filePattern: "**/*.test.{js,jsx,ts,tsx}",
  },
});
