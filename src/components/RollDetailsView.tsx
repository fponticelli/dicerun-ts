import { OneOf, type JSX, type Signal } from '@tempots/dom'
import { DiceBinOp, DiceReducer, DiceResultMapped, DieResult, DieResultFilter, RollResult } from 'dicerollerts'

export interface RollDetailsViewProps {
  result: Signal<RollResult>
}

export function RollDetailsView({ result }: RollDetailsViewProps): JSX.DOMNode {
  return <div class="bars">RollDetailsView TODO</div>
}

export function DieResultFilterView({ filter }: { filter: Signal<DieResultFilter> }): JSX.DOMNode {
  return (
    <div
      class={filter.map((f): string => {
        switch (f.type) {
          case 'keep-result': return 'keep'
          case 'discard-result': return 'discard'
          default: throw new Error('unreachable')
        }
      })}
    >
      <RollDetailsView result={filter.at('roll')} />
    </div>)
}

export function DiceResultMappedView({ dice }: { dice: Signal<DiceResultMapped> }): JSX.DOMNode {
  return <div class="dice">DiceResultMappedView TODO</div>
}

export function ReducerView({ reducer }: { reducer: Signal<DiceReducer> }): JSX.DOMNode {
  return <OneOf
    match={reducer.map((r): ['sum', null] | ['min', null] | ['max', null] | ['average', null] | ['median', null] => {
      switch (r) {
        case DiceReducer.Sum:
          return ['sum', null]
        case DiceReducer.Min:
          return ['min', null]
        case DiceReducer.Max:
          return ['max', null]
        case DiceReducer.Average:
          return ['average', null]
        case DiceReducer.Median:
          return ['median', null]
      }
    })}
    sum={() => <></>}
    min={() => <div>min</div>}
    max={() => <div>max</div>}
    average={() => <div>average</div>}
    median={() => <div>median</div>}
  />
}

export function DieView({ die }: { die: Signal<DieResult> }): JSX.DOMNode {
  return <div class="die">DieView TODO</div>
  /*
      var r = 'roll${Math.ceil(Math.random() * 5)}';
      return switch die.sides {
        case 6:
          div(["class" => "die-container"], div(["class" => 'die-icon roll $r'], [i(["class" => 'df-dot-d6-${die.result}'])]));
        case 2, 4, 8, 10, 12, 20:
          div(["class" => "die-container"], div(["class" => 'die-icon roll $r'], [i(["class" => 'df-d${die.sides}-${die.result}'])]));
        case _:
          details(die.result, function() {
            return div(["class" => "die"], [
              div(["class" => "d"], "d"),
              div(["class" => "X"], die.sides == 100 ? "%" : "" + die.sides)
            ]);
          });
      }
      */
}

export function OpView({ op }: { op: Signal<DiceBinOp> }): JSX.DOMNode {
  return op.map(op => {
    switch (op) {
      case DiceBinOp.Sum:
        return '+'
      case DiceBinOp.Difference:
        return '-'
      case DiceBinOp.Multiplication:
        return '×'
      case DiceBinOp.Division:
        return '÷'
    }
  })
}

export function DetailsView({ result, children }: { result: Signal<number>, children: JSX.DOMNode }): JSX.DOMNode {
  return (
    <div class="pair">
      <div class="result">{result}</div>
      <div class="details">{children}</div>
    </div>
  )
}

