import { type ProbabilitiesResult } from './utils/probabilities-result'

export interface EvaluateExpression {
  type: 'evaluate-expression'
  expr: string
}

export interface UpdateSeed {
  type: 'update-seed'
  value: number
}

export interface ToggleUseSeed {
  type: 'toggle-use-seed'
}

export interface Roll {
  type: 'roll'
}

export interface SetProbabilities {
  type: 'set-probabilities'
  probabilities: ProbabilitiesResult | null
}

export type Action =
  | EvaluateExpression
  | UpdateSeed
  | ToggleUseSeed
  | Roll
  | SetProbabilities

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Action = {
  evaluateExpression (expr: string): EvaluateExpression {
    return { type: 'evaluate-expression', expr }
  },
  updateSeed (value: number): UpdateSeed {
    return { type: 'update-seed', value }
  },
  toggleUseSeed (): ToggleUseSeed {
    return { type: 'toggle-use-seed' }
  },
  roll (): Roll {
    return { type: 'roll' }
  },
  setProbabilities (probabilities: ProbabilitiesResult): SetProbabilities {
    return { type: 'set-probabilities', probabilities }
  }
}
