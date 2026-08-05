import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

function copyAssetsPlugin() {
  return {
    name: 'copy-assets',
    closeBundle() {
      const src = path.resolve(__dirname, 'src/assets');
      const dest = path.resolve(__dirname, 'dist/src/assets');
      if (fs.existsSync(src)) {
        fs.cpSync(src, dest, { recursive: true });
      }
    }
  }
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), copyAssetsPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
