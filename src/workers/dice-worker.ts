import { type DiceExpression, DiceParser, DiceStats, Roller } from 'dicerollerts'
import { ProbabilitiesResult } from '../utils/probabilities-result'

const CHUNK_SIZE = 10000
const MAX_TRIALS = 10000000

self.onmessage = (e: MessageEvent): void => {
  const { type, data } = e.data
  switch (type) {
    case 'init':
      initData(data)
      return
    case 'evaluate-expression':
      evaluateExpression(data.expression)
  }
}

const cache = new Map<string, ProbabilitiesResult>()

const initData = (data: Record<string, string>): void => {
  for (const f of Object.keys(data)) {
    try {
      DiceParser.parseOrNull(f)
      const res = data[f]
      cache.set(f, ProbabilitiesResult.fromObject(JSON.parse(res)))
    } catch {
      // ignore things that stopped parsing correctly
    }
  }
  postMessage({ type: 'init-done', data: {} })
}

let cancel = (): void => {}

const evaluateExpression = (expr: string): void => {
  cancel()
  postMessage({
    type: 'probabilities-start',
    data: { expression: expr },
  })

  const cached = cache.get(expr)
  if (cached && cached.count >= MAX_TRIALS) {
    postMessage({
      type: 'probabilities-result',
      data: { data: cached.toObject(), expression: expr },
    })
    return
  }

  // Try exact distribution first
  const parsed = DiceParser.parseOrNull(expr)
  if (!parsed) return

  try {
    const dist = DiceStats.distribution(parsed)
    const pr = distributionToProbabilitiesResult(dist, MAX_TRIALS)
    cache.set(expr, pr)
    postMessage({
      type: 'probabilities-result',
      data: { data: pr.toObject(), expression: expr },
    })
    return
  } catch {
    // exact not supported, fall through to Monte Carlo
  }

  // Monte Carlo with chunked progress
  runMonteCarlo(expr, parsed, cached)
}

function runMonteCarlo(
  expr: string,
  parsed: DiceExpression,
  existing: ProbabilitiesResult | undefined,
): void {
  const pr = existing ?? new ProbabilitiesResult()
  const remaining = MAX_TRIALS - pr.count
  if (remaining <= 0) return

  const roller = new Roller((max) => Math.floor(Math.random() * max) + 1)
  let done = 0

  const runChunk = (): void => {
    const chunkEnd = Math.min(done + CHUNK_SIZE, remaining)
    while (done < chunkEnd) {
      const result = roller.roll(parsed)
      pr.add(resultValue(result))
      done++
    }
    cache.set(expr, pr)
    postMessage({
      type: 'probabilities-result',
      data: { data: pr.toObject(), expression: expr },
    })
    if (done < remaining) {
      const cancelId = setTimeout(runChunk, 0)
      cancel = () => clearTimeout(cancelId)
    }
  }

  runChunk()
}

function resultValue(result: import('dicerollerts').RollResult): number {
  if (result.type === 'one-result') {
    return result.die.result
  }
  return (result as { result: number }).result
}

function distributionToProbabilitiesResult(
  dist: Map<number, number>,
  sampleSize: number,
): ProbabilitiesResult {
  const pr = new ProbabilitiesResult()
  for (const [value, prob] of dist) {
    const count = Math.round(prob * sampleSize)
    if (count > 0) {
      pr.addQt(value, count)
    }
  }
  return pr
}
