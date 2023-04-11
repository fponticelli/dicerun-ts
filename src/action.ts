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
  value: boolean
}

export interface Composite {
  type: 'composite'
  a: Action
  b: Action
}

export type Action =
  | EvaluateExpression
  | UpdateSeed
  | ToggleUseSeed
  | Composite

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Action = {
  evaluateExpression (expr: string): EvaluateExpression {
    return { type: 'evaluate-expression', expr }
  },
  updateSeed (value: number): UpdateSeed {
    return { type: 'update-seed', value }
  },
  toggleUseSeed (value: boolean): ToggleUseSeed {
    return { type: 'toggle-use-seed', value }
  }
}
