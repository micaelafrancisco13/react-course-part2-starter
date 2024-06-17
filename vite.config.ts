import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
const port = 5173;
const open = `http://localhost:${port}`;

export default defineConfig({
    plugins: [react()],
    server: { open }
})
