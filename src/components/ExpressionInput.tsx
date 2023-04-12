import { type JSX, OneOf, type Signal } from '@tempots/dom'
import { type Expression, type ParseError, type ParsedInvalid } from '../state'
import { Action } from '../action'
import { Editable } from './Editable'

export interface ExpressionInputProps {
  dispatch: (action: Action) => void
  expr: Signal<Expression>
}

export function ExpressionInput ({ dispatch, expr }: ExpressionInputProps): JSX.DOMNode {
  return (
    <div>
      <div class="expression-input">
        <Editable
          value={expr.at('source')}
          onChange={v => { dispatch(Action.evaluateExpression(v)) }}
          autofocus
        />
      </div>
      <OneOf
        match={expr.map(e => [e.type, e as any])}
        parse-error={(e: Signal<ParseError>) => (<ParseErrorView />)}
        parsed={() => <></>}
        unparsed={() => <></>}
        parsed-invalid={(e: Signal<ParsedInvalid>) => <ValidationErrors />}
      />
    </div>
  )
}

export interface ParseErrorProps { }

export function ParseErrorView (props: ParseErrorProps): JSX.DOMNode {
  return (
    <div class="error">
      <span class="label">msg.expectedOneOf TODO</span>
      <br />
      <span class="expected">
        expected errors separated by comma TODO
      </span>
      <br />
      <span class="label">msg.found TODO</span>
      if err.positionToString is null TODO
      <span class="eof">msg.endOfFile TODO</span>
      else
      <br />
      <span class="got">content TODO</span>
    </div>
  )
}

export interface ValidationErrorsProps { }

export function ValidationErrors (props: ValidationErrorsProps): JSX.DOMNode {
  return (
    <div class="error">
      <div>
        <div class="validation-prefix">
          msg.validationPrefix.sampleOne() TODO
        </div>
        <div class="validation-messages">
          TODO render validation errors ForEach with ValidationMessage
        </div>
      </div>
    </div>
  )
}
