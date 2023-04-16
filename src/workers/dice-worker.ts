import { type DiceExpression, DiceParser, RR, Roller } from 'dicerollerts'
import { ProbabilitiesResult } from '../utils/probabilities-result'

const RUNTIME = 100
const MAXRUNS = 10000000

self.onmessage = (e: MessageEvent): void => {
  const { type, data } = e.data
  switch (type) {
    case 'init':
    { initData(data); return }
    case 'evaluate-expression':
    { evaluateExpression(data.expression) }
  }
}

const cache = new Map<string, DiceWorkerData>()
export const initData = (data: Record<string, string>): void => {
  for (const f of Object.keys(data)) {
    try {
      const dwd = DiceWorkerData.create(f)
      const res = data[f]
      dwd.results = ProbabilitiesResult.fromObject(JSON.parse(res))
      cache.set(f, dwd)
    } catch (e: any) {
      // just ignore things that stopped to parse correctly
    }
  }
  postMessage({ type: 'init-done', data: {} })
}

let canceled = false
let currentExpr = ''
export const evaluateExpression = (expr: string): void => {
  postMessage({ type: 'probabilities-start', data: { expression: expr } })
  canceled = currentExpr !== expr
  currentExpr = expr
  let worker = cache.get(expr)
  if (worker == null) {
    worker = DiceWorkerData.create(expr)
    cache.set(worker.exprString, worker)
  }
  postMessage({ type: 'probabilities-progress', data: { expression: expr, count: worker.results.count, max: MAXRUNS } })
  if (worker.results.count >= MAXRUNS) {
    postMessage({ type: 'probabilities-result', data: { data: worker.results.toObject(), expression: expr } })
    canceled = false
  } else {
    run(expr, worker)
    canceled = false
  }
}

function run (expr: string, worker: DiceWorkerData): void {
  const now = performance.now()
  const endOn = now + RUNTIME
  postMessage({ type: 'run', data: { now, endOn, canceled } })
  while (true) {
    worker.roll()
    if (worker.results.count === MAXRUNS) break
    if (performance.now() >= endOn) break
    // if (canceled) return
  }
  postMessage({ type: 'probabilities-result', data: { data: worker.results.toObject(), expression: expr } })
  if (worker.results.count < MAXRUNS) {
    run(expr, worker)
    // setTimeout((): void => { run(expr, worker) }, 0)
  }
}

class DiceWorkerData {
  public results: ProbabilitiesResult
  public exprString: string
  private readonly expr: DiceExpression
  private readonly roller: Roller
  static create (exprString: string): DiceWorkerData {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return new DiceWorkerData(exprString, DiceParser.parseOrNull(exprString)!)
  }

  constructor (exprString: string, parsed: DiceExpression) {
    this.exprString = exprString
    this.expr = parsed
    this.roller = new Roller(function (sides) {
      return 1 + Math.floor(Math.random() * sides)
    })
    this.results = new ProbabilitiesResult()
  }

  public roll (): void {
    this.results.add(RR.getResult(this.roller.roll(this.expr)))
  }
}
