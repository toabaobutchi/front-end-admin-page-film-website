import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: '/src'},
      { find: '@comps', replacement: '/src/components' },
      { find: '@utils', replacement: '/src/utils' }
    ]
  }
})
