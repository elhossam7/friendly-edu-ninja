import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      external: ['fs', 'stream', 'zlib']
    },
    // Optional: silence large bundle warnings
    chunkSizeWarningLimit: 1500
  },
  define: {
    'process.env': {}
  },
  plugins: [
    {
      name: 'remove-use-client',
      enforce: 'pre',
      transform(code, id) {
        if (id.includes('node_modules')) {
          // Strip all "use client" directives
          return code.replace(/["']use client["'];?/g, '')
        }
        return code
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})