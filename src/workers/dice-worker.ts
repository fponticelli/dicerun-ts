import { type DiceExpression, DiceParser, RR, Roller } from 'dicerollerts'
import { ProbabilitiesResult } from '../utils/probabilities-result'

const RUNTIME = 100
const RUNDELAY = 100
const MAXRUNS = 10000000
let cache = new Map<string, DiceWorkerData>()

let cancel = (): void => {}

export function onMessage (e: any): void {
  if (e.data.expression != null) {
    evaluate(e.data.expression)
  } else if (e.data.init != null) {
    init(e.data.init)
  }
}

function init (data: any): void {
  const map = new Map()
  for (const k of Reflect.ownKeys(data)) {
    const f = k as string
    try {
      const dwd = DiceWorkerData.create(f)
      const res = Reflect.get(data, f)
      dwd.results = ProbabilitiesResult.fromObject(res)
      map.set(f, dwd)
    } catch (e: any) {
      // just ignore things that stopped to parse correctly
    }
  }
  cache = map
}

function evaluate (expr: string): void {
  cancel()
  let worker = cache.get(expr)
  if (worker == null) {
    worker = DiceWorkerData.create(expr)
    cache.set(worker.exprString, worker)
  }
  if (worker.results.count >= MAXRUNS) {
    send(worker)
  } else {
    run(worker)
  }
}

function run (worker: DiceWorkerData): void {
  const endOn = performance.now() + RUNTIME
  while (true) {
    worker.roll()
    if (worker.results.count === MAXRUNS) break
    if (performance.now() >= endOn) break
  }
  send(worker)
  if (worker.results.count < MAXRUNS) {
    const cancelId = setTimeout(run.bind(worker), RUNDELAY)
    cancel = () => {
      clearTimeout(cancelId)
    }
  }
}

function send (worker: DiceWorkerData): void {
  postMessage({ expression: worker.exprString, results: worker.results.toObject() })
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
