import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // 已經透過resolve.alias自行告訴vite "@"代表的是哪個絕對路徑，所以不用安裝vite-tsconfig-paths
  // 沒設定的話執行，也沒安裝vite-tsconfig-paths的話，vitest會報錯"Failed to resolve import "@/components/<file name>" from "test/<file name>.test.tsx"."
  resolve: {
    alias: {
      // https://vitest.dev/guide/common-errors.html#cannot-find-module-relative-path
      // 務必要定義成絕對路徑
      '@': resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
  },
});
