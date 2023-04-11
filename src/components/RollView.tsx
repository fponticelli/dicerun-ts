import { If, JSX, Prop, Signal, Unless, When } from "@tempots/dom";
import { Parsed, State } from "../state";
import { Action } from "../action";
import { RR, RollResult, Roller } from "dicerollerts";
import { Editable } from "./Editable";

class LehmerSeed {
  private m: number;
  private a: number;
  public seed: number;

  constructor(seed: number, m: number = 2147483647, a: number = 48271) {
    this.m = m;
    this.a = a;
    this.seed = seed;
  }

  // Returns the next pseudorandom number in the sequence
  public next(): number {
    this.seed = (this.a * this.seed) % this.m;
    return this.seed / this.m;
  }
}

export interface RollViewProps {
  dispatch: (action: Action) => void;
  state: Signal<{
    useSeed: boolean;
    seed: number;
    expression: Parsed
  }>;
}

export function RollView({ dispatch, state }: RollViewProps): JSX.DOMNode {
  const updateSeed = (seed: number) => dispatch(Action.updateSeed(seed));
  const toggleSeed = () => dispatch(Action.toggleUseSeed());
  const result = Prop.of(null as RollResult | null)
  const roll = () => {
    const { useSeed, seed, expression } = state.get()
    if (useSeed) {
      const gen = new LehmerSeed(seed);
      const roller = new Roller((sides) => {
        const result = Math.floor(gen.seed * sides) + 1;
        gen.next();
        return result
      })
      const value = roller.roll(expression.expr)
      result.set(value)
    } else {
      const roller = new Roller((sides) => Math.floor(Math.random() * sides) + 1)
      const value = roller.roll(expression.expr)
      result.set(value)
    }
  }
  return (
    <div>
      <div class="roll-box">
        <div class="rolling">
          TOOLTIP HERE TODO msg.clickHere
          <div class="roll-result">
            <a
              onClick={(e) => {
                e.preventDefault()
                roll()
              }}
              href="#"
            >
              {result.map(v => {
                if (v == null) {
                  return "roll"
                } else {
                  return RR.getResult(v)
                }
              })}
            </a>
          </div>
          <SeedControls useSeed={state.at('useSeed')} seed={state.at('seed')} updateSeed={updateSeed} toggleSeed={toggleSeed} />
        </div>
      </div>
      RollView TODO
    </div>
  )
}

export interface SeedControlsProps {
  useSeed: Signal<boolean>;
  seed: Signal<number>;
  updateSeed: (seed: number) => void;
  toggleSeed: () => void;
}

export function SeedControls({ useSeed, seed, updateSeed, toggleSeed }: SeedControlsProps): JSX.DOMNode {
  return (
    <div class="roll-seed">
      <label>
        <input type="checkbox" checked={useSeed} onChange={toggleSeed} />
        <span>use seed</span>
      </label>
      <When is={useSeed}>
        <Editable value={seed.map(String)} onChange={v => updateSeed(Math.trunc(Number(v)))} />
      </When>
    </div>
  )
}
