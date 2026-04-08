import { type JSX, type Signal, OneOfUnionType, For, conjuctions, When, Prop } from '@tempots/dom'
import { type Expression, type ParseError, type ParsedInvalid } from '../state'
import { Action } from '../action'
import { Editable } from './Editable'
import { type ValidationMessage } from 'dicerollerts'
import type { ParseError as DiceParseError } from 'dicerollerts'
import { Tooltip } from './Tooltip'

export interface ExpressionInputProps {
  dispatch: (action: Action) => void
  expr: Signal<Expression>
}

export function ExpressionInput ({ dispatch, expr }: ExpressionInputProps): JSX.DOMNode {
  const displayTooltip = Prop.ofLocalStorage('dice.run-tooltip-expression-input', true)
  return (
    <div>
      <div class="expression-input">
        <Editable
          value={expr.at('source')}
          onChange={v => {
            displayTooltip.set(false)
            dispatch(Action.evaluateExpression(v))
          }}
          />
        <When is={displayTooltip}>
          { () => <Tooltip>type a dice expression here</Tooltip> }
        </When>
      </div>
      <OneOfUnionType
        match={expr}
        parse-error={(e: Signal<ParseError>) => (<ParseErrorView errors={e.at('err')} />)}
        parsed={() => <></>}
        unparsed={() => <></>}
        parsed-invalid={(e: Signal<ParsedInvalid>) => <ValidationErrors errors={e.at('errors')} />}
      />
    </div>
  )
}

export interface ParseErrorProps {
  errors: Signal<DiceParseError[]>
}

export function ParseErrorView ({ errors }: ParseErrorProps): JSX.DOMNode {
  return (
    <div class="error">
      <For of={errors} separator={() => <br />}>
        {(err: Signal<DiceParseError>) => (
          <div>
            <span class="label">{err.at('message')}</span>
            <When is={err.at('suggestion').map(s => s != null)}>
              {() => <span class="suggestion"> {err.at('suggestion')}</span>}
            </When>
          </div>
        )}
      </For>
    </div>
  )
}

export interface ValidationErrorsProps {
  errors: Signal<ValidationMessage[]>
}

export function ValidationErrors ({ errors }: ValidationErrorsProps): JSX.DOMNode {
  return (
    <div class="error">
      <div>
        <div class="validation-prefix">
          Validation error
        </div>
        <div class="validation-messages">
          <For of={errors.map(v => Array.from(new Set(v)))} separator={conjuctions(', ')}>
            {(err: Signal<ValidationMessage>) =>
              <OneOfUnionType
                match={err}
                drop-or-keep-should-be-positive={() => <span>Drop or Keep should be a positive number</span>}
                empty-set={() => <span>Empty set</span>}
                infinite-reroll={() => <span>Infinite rerolls</span>}
                too-many-drops={() => <span>Too many drops</span>}
                too-many-keeps={() => <span>Too many keeps</span>}
                insufficient-sides={() => <span>Insufficient sides</span>}
                empty-faces={() => <span>Custom die must have at least one face</span>}
              />
            }
          </For>
        </div>
      </div>
    </div>
  )
}
