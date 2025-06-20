import { defineConfig } from 'vite';

export default defineConfig({
  base: '/practice-site1/', // ← GitHub リポジトリ名と一致
  plugins: [],
  build: {
    outDir: 'docs'
  }
});
