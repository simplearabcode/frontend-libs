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
      outDir: 'dist',
      staticImport: true,
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
      entry: {
        index: resolve(__dirname, 'index.ts'),
        ui: resolve(__dirname, 'ui/index.ts'),
        shared: resolve(__dirname, 'shared/index.ts'),
      },
      name: 'SimpleArabCodeUIKit',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'mjs' : 'js'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
        // Preserve directory structure for better tree-shaking
        preserveModules: false,
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
