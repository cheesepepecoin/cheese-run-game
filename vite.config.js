import { defineConfig } from 'vite';
import { terser } from 'rollup-plugin-terser';

export default defineConfig({
  base: '/cheese-run-game/',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
    rollupOptions: {
      plugins: [terser()],
    },
  },
  assetsInclude: ['**/*.png','**/*.jpg', '**/*.mp3'],
});
