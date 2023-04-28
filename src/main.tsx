import { render } from '@tempots/dom'
import { App } from './App'
import ReactGA from 'react-ga4'

ReactGA.initialize('G-8J3G5ED054')

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const main = document.getElementById('main')!
main.innerHTML = ''
render(<App />, main)
