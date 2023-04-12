import { type JSX, type Signal } from '@tempots/dom'
import { type Parsed } from '../state'

export interface ProbabilitiesViewProps {
  parsed: Signal<Parsed>
}

export function ProbabilitiesView ({ parsed }: ProbabilitiesViewProps): JSX.DOMNode {
  return <div class="bars">ProbabilitiesView TODO</div>
}
