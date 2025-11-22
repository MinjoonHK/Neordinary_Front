import path from 'path';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@layouts': path.resolve(__dirname, 'src/shared/layouts'),
      '@apis': path.resolve(__dirname, 'src/shared/apis'),
      '@styles': path.resolve(__dirname, 'src/shared/styles'),
      '@components': path.resolve(__dirname, 'src/shared/components'),
      '@libs': path.resolve(__dirname, 'src/shared/libs'),
      '@constants': path.resolve(__dirname, 'src/shared/constants'),
      '@hooks': path.resolve(__dirname, 'src/shared/hooks'),
      '@routes': path.resolve(__dirname, 'src/shared/routes'),
      '@images': path.resolve(__dirname, 'src/shared/assets/images'),
      '@icons': path.resolve(__dirname, 'src/shared/assets/icons'),
      '@types': path.resolve(__dirname, 'src/shared/types'),
      '@utils': path.resolve(__dirname, 'src/shared/utils'),
      '@mocks': path.resolve(__dirname, 'src/shared/mocks'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
