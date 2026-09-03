import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        comparador: resolve(__dirname, 'src/pages/comparador/index.html'),
        favoritos: resolve(__dirname, 'src/pages/favoritos/index.html'),
      },
    },
  },
});
