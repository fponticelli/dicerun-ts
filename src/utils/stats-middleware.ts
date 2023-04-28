import { Action } from '../action'
import { type Expression } from '../state'
import { getSerializedProbabilitiesFromLocalStorage, setProbabilitiesInLocalStorage } from '../utils/expression-storage'
import { ProbabilitiesResult } from './probabilities-result'
import ReactGA from 'react-ga4'

const worker = new Worker(new URL('../workers/dice-worker.ts', import.meta.url), { type: 'module' })

function updateUrl (source: string): void {
  const hash = `/d/${source.replaceAll(' ', '_')}`
  if (location.hash === hash) return
  location.hash = hash
  updateGoogleAnalytics(hash)
}

function updateGoogleAnalytics (s: string): void {
  ReactGA.set({ page: s })
  ReactGA.send({ hitType: 'pageview' })
}

export const statsMiddleware = (dispatch: (action: Action) => void): (expression: Expression) => void => {
  let currentExpression = ''
  worker.onmessage = (e) => {
    const { type, data } = e.data
    switch (type) {
      case 'probabilities-result':
      {
        const obj = data.data
        const probabilities = ProbabilitiesResult.fromObject(obj)
        setProbabilitiesInLocalStorage(data.expression, obj)
        if (currentExpression === data.expression) {
          dispatch(Action.setProbabilities(probabilities))
        }
      }
    }
  }
  worker.onerror = (e) => {
    console.error('WORKER ERROR', e)
  }
  worker.postMessage({
    type: 'init',
    data: getSerializedProbabilitiesFromLocalStorage()
  })

  return (expression: Expression): void => {
    if (expression.type !== 'parsed') {
      return
    }

    const { normalized, source } = expression
    currentExpression = normalized
    updateUrl(source)
    worker.postMessage({
      type: 'evaluate-expression',
      data: {
        expression: normalized
      }
    })
  }
}
