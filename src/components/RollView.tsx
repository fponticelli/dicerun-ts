import { type JSX, type Signal, When, Prop, OneOf } from '@tempots/dom'
import { type State } from '../state'
import { Action } from '../action'
import { DE, RR } from 'dicerollerts'
import { Editable } from './Editable'
import { RollDetailsView } from './RollDetailsView'
import { Tooltip } from './Tooltip'

export interface RollViewProps {
  dispatch: (action: Action) => void
  state: Signal<State>
}

const DISPLAY_ROLLS_THRESHOLD = 50

export function lerpi (a: number, b: number, t: number): number {
  return Math.round(a + (b - a) * t)
}

export function easeOutCubic (t: number): number {
  return (--t) * t * t + 1
}

export function RollView ({ dispatch, state }: RollViewProps): JSX.DOMNode {
  const updateSeed = (seed: number): void => { dispatch(Action.updateSeed(seed)) }
  const toggleSeed = (): void => { dispatch(Action.toggleUseSeed()) }
  const displayTooltip = Prop.ofLocalStorage('dice.run-tooltip-roll', true)
  const roll = (): void => { dispatch(Action.roll()) }
  const result = state.at('roll').map(v => {
    if (v == null) {
      return 0
    } else {
      return RR.getResult(v)
    }
  }).animate(1000, lerpi, undefined, easeOutCubic)
  return (
    <div class="roll-box">
      <div class="rolling">
        <div class="roll-result">
          <a
            onClick={(e) => {
              e.preventDefault()
              displayTooltip.set(false)
              roll()
            }}
            href="#"
          >
            {result}
          </a>
          <When is={displayTooltip}>
            <Tooltip>click here to roll again</Tooltip>
          </When>
        </div>
        <SeedControls useSeed={state.at('useSeed')} seed={state.at('seed')} updateSeed={updateSeed} toggleSeed={toggleSeed} />
      </div>
      <OneOf
        match={state.at('expression').map((expr) => {
          if (expr.type === 'parsed') {
            const r = DE.calculateBasicRolls(expr.expr)
            if (r > DISPLAY_ROLLS_THRESHOLD) {
              return { many: null }
            } else {
              return { details: null }
            }
          } else {
            return { empty: null }
          }
        })}
        many={() => <div class="roll-details">Too many dice to display</div>}
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        details={() => <RollDetailsView result={state.at('roll').map(v => v!)} />}
        empty={() => <div class="roll-details">Enter an expression to roll</div>}
      />
    </div>
  )
}

export interface SeedControlsProps {
  useSeed: Signal<boolean>
  seed: Signal<number>
  updateSeed: (seed: number) => void
  toggleSeed: () => void
}

export function SeedControls ({ useSeed, seed, updateSeed, toggleSeed }: SeedControlsProps): JSX.DOMNode {
  return (
    <div class="roll-seed">
      <label>
        <input type="checkbox" checked={useSeed} onChange={toggleSeed} />
        <span>use seed</span>
      </label>
      <When is={useSeed}>
        <Editable
          value={seed.map(String)}
          onChange={v => { updateSeed(Number(v)) }}
        />
      </When>
    </div>
  )
}
