import { type JSX, type Signal, When } from '@tempots/dom'
import { type State } from '../state'
import { Action } from '../action'
import { RR } from 'dicerollerts'
import { Editable } from './Editable'

export interface RollViewProps {
  dispatch: (action: Action) => void
  state: Signal<State>
}

export function RollView ({ dispatch, state }: RollViewProps): JSX.DOMNode {
  const updateSeed = (seed: number): void => { dispatch(Action.updateSeed(seed)) }
  const toggleSeed = (): void => { dispatch(Action.toggleUseSeed()) }
  const roll = (): void => { dispatch(Action.roll()) }
  return (
    <div class="roll-box">
      <div class="rolling">
        <div class="roll-result">
          <a
            onClick={(e) => {
              e.preventDefault()
              roll()
            }}
            href="#"
          >
            {state.at('roll').map(v => {
              if (v == null) {
                return 'roll'
              } else {
                return RR.getResult(v)
              }
            })}
          </a>
        </div>
        <SeedControls useSeed={state.at('useSeed')} seed={state.at('seed')} updateSeed={updateSeed} toggleSeed={toggleSeed} />
      </div>
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
        <Editable value={seed.map(String)} onChange={v => { updateSeed(Math.trunc(Number(v))) }} />
      </When>
    </div>
  )
}
