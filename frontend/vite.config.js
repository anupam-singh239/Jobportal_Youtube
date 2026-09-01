import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  preview: {
    allowedHosts: [
      "jobportal.buzz",
      "www.jobportal.buzz",
      "jobportal-youtube-3.onrender.com",
    ],
  },
})