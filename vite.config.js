import { comlink } from 'vite-plugin-comlink'

export default {
  base: '/',
  plugins: [
    comlink()
  ],
  worker: {
    plugins: () => [
      comlink()
    ]
  }
}
