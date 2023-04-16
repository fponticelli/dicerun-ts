import { type ProbabilitiesResult } from './probabilities-result'

const STORAGE_PREFIX = 'dice.run-expression:'

export function getSerializedProbabilitiesFromLocalStorage (): Record<string, string> {
  const storage = localStorage
  const result: Record<string, string> = {}
  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i)
    if (key == null) continue
    if (!key.startsWith(STORAGE_PREFIX)) continue
    const expr = key.substring(STORAGE_PREFIX.length)
    const item = storage.getItem(key)
    if (item == null) continue
    result[expr] = item
  }
  return result
}

export function setProbabilitiesInLocalStorage (expr: string, probabilities: ProbabilitiesResult): void {
  const storage = localStorage
  const key = STORAGE_PREFIX + expr
  const value = JSON.stringify(probabilities)
  storage.setItem(key, value)
}
