import { render } from '@tempots/dom'
import { App } from './App'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const main = document.getElementById('main')!
main.innerHTML = ''
render(<App />, main)
