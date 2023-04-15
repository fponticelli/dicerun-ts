import { ProbabilitiesResult } from './probabilities-result'

const STORAGE_PREFIX = 'dice.run-expression:'

export interface CallbackData {
  expr: string
  probabilities: ProbabilitiesResult
}

export function getWorker (callback: (data: CallbackData) => void): Worker {
  const worker = new Worker('../workers/dice-worker.ts')
  const storage = localStorage
  worker.onmessage = function (e) {
    const expr = e.data.expression
    const probabilities = ProbabilitiesResult.fromObject(e.data.results)
    storage.setItem('$STORAGE_PREFIX$expr', JSON.stringify(e.data.results))
    // eslint-disable-next-line n/no-callback-literal
    callback({ expr, probabilities })
  }
  const collect = {}
  for (let i = 0; i < storage.length; i++) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const key = storage.key(i)!
    if (!key.startsWith(STORAGE_PREFIX)) continue
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const ob = JSON.parse(storage.getItem(key)!)
    const k = key.substring(STORAGE_PREFIX.length)
    Reflect.set(collect, k, ob)
  }
  worker.postMessage({ init: collect })
  return worker
}

export function getFromLocalStorage (expr: string): ProbabilitiesResult | null {
  const storage = localStorage
  const item = storage.getItem(STORAGE_PREFIX + expr)
  if (item == null) return null
  const ob = JSON.parse(item)
  return ProbabilitiesResult.fromObject(ob)
}
