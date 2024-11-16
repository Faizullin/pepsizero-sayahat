import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(async () => {
    return {
        plugins: [react()],
        server: {
            host: true,
        },
        // base: './',
        resolve: {
            alias: [
                {find: '@packages', replacement: path.resolve(__dirname, 'src/packages')},
                {find: '@', replacement: path.resolve(__dirname, 'src')},
            ]
        }
    }
});
