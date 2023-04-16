import { Action } from '../action'
import { type Expression } from '../state'
import { getSerializedProbabilitiesFromLocalStorage, setProbabilitiesInLocalStorage } from '../utils/expression-storage'
import { ProbabilitiesResult } from './probabilities-result'

const worker = new Worker(new URL('../workers/dice-worker.ts', import.meta.url), { type: 'module' })

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
    currentExpression = expression.normalized
    const { normalized } = expression
    worker.postMessage({
      type: 'evaluate-expression',
      data: {
        expression: normalized
      }
    })
  }
}
