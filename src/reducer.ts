import { DiceParser, DE } from 'dicerollerts'
import { type Action } from './action'
import { Expression, type State } from './state'

export function reduce (state: State, action: Action): State {
  switch (action.type) {
    case 'evaluate-expression':
    {
      const result = DiceParser.parse(action.expr)
      if (result.isFailure()) {
        return { ...state, expression: Expression.error(action.expr, result.failures) }
      } else {
        const validated = DE.validate(result.value)
        if (validated == null) {
          return {
            ...state,
            expression: Expression.parsed(action.expr, DE.toString(result.value), result.value)
          }
        } else {
          return {
            ...state,
            expression: Expression.parsedInvalid(action.expr, validated, result.value)
          }
        }
      }
    }
    case 'update-seed':
      return { ...state, seed: action.value }
    case 'toggle-use-seed':
      return { ...state, useSeed: action.value }
    case 'composite':
      return reduce(reduce(state, action.a), action.b)
  }
}
