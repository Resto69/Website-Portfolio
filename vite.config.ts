import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    
    base: '/', // Change this to match your repository name

    build: {
        outDir: 'dist', // Output directory for production build
        sourcemap: true, // Generate source maps for easier debugging
    },
    server: {
        port: 3000, // Ensure the dev server is running on a valid port
        open: true, // Automatically open the browser
        strictPort: true, 
        hmr: {
            overlay: false,
        },
    },
});