import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/clash-royale-clone/',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
    },
    server: {
        port: 5173,
        open: true
    }
})
