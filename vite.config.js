import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: '/src'},
      { find: '@comps', replacement: '/src/components' },
      { find: '@utils', replacement: '/src/utils' },
      { find: '@pages', replacement: '/src/pages' },
    ]
  }
})
