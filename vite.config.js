import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split React core
          "vendor-react": ["react", "react-dom"],
          // Split Three.js ecosystem (large)
          "vendor-three": ["three"],
          // Split R3F separately
          "vendor-r3f": ["@react-three/fiber", "@react-three/drei"],
          // Split Framer Motion
          "vendor-motion": ["framer-motion"],
        },
      },
    },
  },
});
