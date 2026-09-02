import { defineConfig } from 'vite';

export default defineConfig({
  root: 'app',
  envDir: '../',
  server: {
    port: 5173,
    strictPort: true // Si el puerto 5173 está ocupado, fallará en lugar de cambiar a 5174
  }
});