import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Relative base so the build works both standalone (equippedassessment.netlify.app)
  // and when proxied under weareequipped.com/assessment/
  base: './',
  plugins: [react()],
})
