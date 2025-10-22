import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['__tests__/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.config.*',
        '**/*.d.ts',
        '**/index.ts',
        '**/__tests__/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
      '@/ui': resolve(__dirname, './ui'),
      '@/shared': resolve(__dirname, './shared'),
    },
  },
});
