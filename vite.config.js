// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/REACT-DEVOPS_PROJECT/', // 👈 this must match your GitHub repo name , Yes it matches , HOPE IT RUNS!!
})
