import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  server: {
    host: true,
    port: 8080,
    strictPort: true,
    watch: {
      usePolling: true,
    },
  },
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || 
                id.includes('react-dom') || 
                id.includes('react-router-dom')) {
              return 'vendor-react'
            }
            if (id.includes('firebase')) {
              return 'vendor-firebase'
            }
            return 'vendor'
          }
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  define: {
    'process.env': process.env,
  },
})
