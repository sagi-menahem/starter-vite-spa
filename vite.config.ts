import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isAnalyze = mode === 'analyze';

  return {
    plugins: [
      react(),
      tailwindcss(),
      // Bundle analyzer - only in analyze mode
      isAnalyze &&
        (visualizer({
          filename: 'dist/stats.html',
          open: true,
          gzipSize: true,
          brotliSize: true,
          template: 'treemap', // 'treemap' | 'sunburst' | 'network'
        }) as PluginOption),
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3000,
    },
    build: {
      target: 'esnext',
      minify: 'esbuild',
      // Rollup options for production optimizations
      rollupOptions: {
        output: {
          manualChunks: {
            // Split vendor chunks for better caching
            'react-vendor': ['react', 'react-dom'],
            'router': ['react-router-dom'],
            'ui-vendor': ['framer-motion', 'lucide-react'],
          },
        },
      },
    },
    esbuild: {
      // Drop console.log and debugger statements in production
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },
  };
});
