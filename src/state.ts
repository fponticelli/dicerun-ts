import { type ValidationMessage, type DiceExpression } from 'dicerollerts'
import { type DecodeError } from 'partsing/error'

export interface State {
  expression: Expression
  seed: number
  useSeed: boolean
}

export interface Unparsed {
  type: 'unparsed'
  source: string
}

export interface Parsed {
  type: 'parsed'
  source: string
  normalized: string
  expr: DiceExpression
}

export interface ParsedInvalid {
  type: 'parsed-invalid'
  source: string
  errors: ValidationMessage[] // TODO why is this different from Error?
  expr: DiceExpression
}

export interface Error {
  type: 'error'
  source: string
  err: DecodeError[]
}

export type Expression =
  | Unparsed
  | Parsed
  | ParsedInvalid
  | Error

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Expression = {
  unparsed (source: string): Unparsed {
    return { type: 'unparsed', source }
  },
  parsed (source: string, normalized: string, expr: DiceExpression): Parsed {
    return { type: 'parsed', source, normalized, expr }
  },
  parsedInvalid (
    source: string,
    errors: ValidationMessage[],
    expr: DiceExpression
  ): ParsedInvalid {
    return { type: 'parsed-invalid', source, errors, expr }
  },
  error (source: string, err: DecodeError[]): Error {
    return { type: 'error', source, err }
  }
}
