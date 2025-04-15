import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      '@': resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'jsdom', // ✅ 加這行
  },
});
