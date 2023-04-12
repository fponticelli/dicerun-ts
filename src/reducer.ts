import { DiceParser, DE, Roller, type RollResult } from 'dicerollerts'
import { type Action } from './action'
import { Expression, type State } from './state'
import { LehmerSeed } from './utils/lehmer-seed'

function randomRoller (sides: number): number {
  return Math.floor(Math.random() * sides) + 1
}

function makeLemherRoller (seed: number): (sides: number) => number {
  return (sides) => Math.floor(new LehmerSeed(seed).float() * sides) + 1
}

function roll (state: State): [RollResult | null, number | null] {
  if (state.expression.type !== 'parsed') {
    return [null, null]
  }
  const roller = (() => {
    if (state.useSeed) {
      return new Roller(makeLemherRoller(state.seed))
    } else {
      return new Roller(randomRoller)
    }
  })()
  const result = roller.roll(state.expression.expr)
  const nextSeed = state.useSeed ? new LehmerSeed(state.seed).next().seed : null
  return [result, nextSeed]
}

export function reduce (state: State, action: Action): State {
  switch (action.type) {
    case 'evaluate-expression':
    {
      const result = DiceParser.parse(action.expr)
      if (result.isFailure()) {
        return {
          ...state,
          roll: null,
          expression: Expression.parseError(action.expr, result.failures)
        }
      } else {
        const validated = DE.validate(result.value)
        if (validated == null) {
          const expression = Expression.parsed(action.expr, DE.toString(result.value), result.value)
          const [rollResult, nextSeed] = roll({ ...state, expression })
          return {
            ...state,
            roll: rollResult,
            seed: nextSeed ?? state.seed,
            expression
          }
        } else {
          return {
            ...state,
            roll: null,
            expression: Expression.parsedInvalid(action.expr, validated, result.value)
          }
        }
      }
    }
    case 'update-seed':
    {
      const [rollResult] = roll({ ...state, seed: action.value })
      return { ...state, seed: action.value, roll: rollResult }
    }
    case 'toggle-use-seed':
    {
      const [rollResult, nextSeed] = roll({ ...state, useSeed: !state.useSeed })
      return { ...state, useSeed: !state.useSeed, roll: rollResult, seed: nextSeed ?? state.seed }
    }
    case 'roll':
    {
      const [rollResult, nextSeed] = roll(state)
      return { ...state, roll: rollResult, seed: nextSeed ?? state.seed }
    }
  }
}
