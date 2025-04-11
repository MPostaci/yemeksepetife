import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

import fs from 'fs';

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    https: {
      key: fs.readFileSync('localhost-key.pem'),
      cert: fs.readFileSync('localhost.pem'),
    },
    host: "localhost", // Ensure it binds correctly
    port: 5173, // Explicitly define port
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true, // Fix CORS issues
        secure: false, // Allow HTTP if needed
      }
    }
  }
});
