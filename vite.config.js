import { comlink } from 'vite-plugin-comlink'

export default {
  base: '/dicerun-ts/',
  plugins: [
    comlink()
  ],
  worker: {
    plugins: () => [
      comlink()
    ]
  }
}
