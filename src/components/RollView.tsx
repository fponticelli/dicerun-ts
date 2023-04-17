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

function lerpf (a: number, b: number, t: number): number {
  return a + (b - a) * t
}

function animateSignal<T> (
  signal: Signal<T>,
  interpolate: (start: T, end: T, t: number) => T,
  initial: T | undefined = undefined,
  duration: number = 200
): Signal<T> {
  const prop = Prop.of(initial ?? signal.get())
  signal.subscribe(v => {
    const start = prop.get()
    const end = v
    const startAt = Date.now()
    const endAt = startAt + duration
    const step = (): void => {
      const now = Date.now()
      if (now >= endAt) {
        prop.set(end)
      } else {
        prop.set(interpolate(start, end, (now - startAt) / duration))
        requestAnimationFrame(step)
      }
    }
    requestAnimationFrame(step)
  })
  return prop
}

// function animateNumberSignal (signal: Signal<number>, initial: number | undefined = undefined, duration: number = 200): Signal<number> {
//   return animateSignal(signal, lerpf, initial, duration)
// }

function animateIntSignal (signal: Signal<number>, initial: number | undefined = undefined, duration: number = 200): Signal<number> {
  return animateSignal(signal, (a, b, t) => Math.round(lerpf(a, b, t)), initial, duration)
}

export function RollView ({ dispatch, state }: RollViewProps): JSX.DOMNode {
  const updateSeed = (seed: number): void => { dispatch(Action.updateSeed(seed)) }
  const toggleSeed = (): void => { dispatch(Action.toggleUseSeed()) }
  const displayTooltip = Prop.ofLocalStorage('dice.run-tooltip-roll', true)
  const roll = (): void => { dispatch(Action.roll()) }
  const result = animateIntSignal(state.at('roll').map(v => {
    if (v == null) {
      return 0
    } else {
      return RR.getResult(v)
    }
  }))
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
        <Editable value={seed.map(String)} onChange={v => { updateSeed(Math.trunc(Number(v))) }} />
      </When>
    </div>
  )
}
