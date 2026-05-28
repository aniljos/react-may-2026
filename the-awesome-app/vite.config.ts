import { defineConfig } from 'vitest/config'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    //babel({ presets: [] })
    babel({ presets: [reactCompilerPreset()] })
  ],
  test: {
    globals: true,        // use describe/it/expect without importing them
    environment: 'jsdom', // simulate the DOM
    setupFiles: './setupTests.js',
  }
})
