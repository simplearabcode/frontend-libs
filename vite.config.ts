import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: [
        'ui/**/*.ts',
        'ui/**/*.tsx',
        'shared/**/*.ts',
        'shared/**/*.tsx'
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
      '@/ui': resolve(__dirname, './ui'),
      '@/shared': resolve(__dirname, './shared'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      name: 'SimpleArabCodeUIKit',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
