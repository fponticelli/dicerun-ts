import { OneOf, type JSX, type Signal } from '@tempots/dom'
import { DiceBinOp, DiceReducer, type OneResult, type DiceResultMapped, type DieResult, type DieResultFilter, type RollResult, type LiteralResult, type UnaryOp, type DiceReduceResult } from 'dicerollerts'

export interface RollDetailsViewProps {
  result: Signal<RollResult>
}

export function RollDetailsView ({ result }: RollDetailsViewProps): JSX.DOMNode {
  return (
    <OneOf
      match={result.map((r) => [r.type, r])}
      one-result={((r: Signal<OneResult>) => <DieView die={r.map(v => v.die)} />) as any}
      literal-result={((r: Signal<LiteralResult>) => <LiteralResultView result={r} />) as any}
      binary-op-result={((r: Signal<DiceBinOp>) => <DiceBinOpView op={r} />) as any}
      dice-result-mapped={((r: Signal<DiceResultMapped>) => <DiceResultMappedView dice={r} />) as any}
      dice-reduce-result={((r: Signal<DiceReduceResult>) => <DiceReduceResultView reduce={r} />) as any}
      unary-op-result={((r: Signal<UnaryOp>) => <UnaryOpView op={r} />) as any}
    />
  )
}

export function DiceReduceResultView ({ reduce }: { reduce: Signal<DiceReduceResult> }): JSX.DOMNode {
  return (
    <div class="dice-reduce-result">
      DiceReduceResult
    </div>
  )
}

export function UnaryOpView ({ op }: { op: Signal<UnaryOp> }): JSX.DOMNode {
  return (
    <div class="unary-op">
      UnaryOp
    </div>
  )
}

export function DiceBinOpView ({ op }: { op: Signal<DiceBinOp> }): JSX.DOMNode {
  return (
    <div class="dice-bin-op">
      DiceBinOp
    </div>
  )
}

export function LiteralResultView ({ result }: { result: Signal<LiteralResult> }): JSX.DOMNode {
  return <div class="literal">{result.at('value')}</div>
}

export function DieResultFilterView ({ filter }: { filter: Signal<DieResultFilter> }): JSX.DOMNode {
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

export function DiceResultMappedView ({ dice }: { dice: Signal<DiceResultMapped> }): JSX.DOMNode {
  return <div class="dice">DiceResultMappedView TODO</div>
}

export function ReducerView ({ reducer }: { reducer: Signal<DiceReducer> }): JSX.DOMNode {
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
        default:
          throw new Error(`unreachable: ${JSON.stringify(r)}`)
      }
    })}
    sum={() => <></>}
    min={() => <div>min</div>}
    max={() => <div>max</div>}
    average={() => <div>average</div>}
    median={() => <div>median</div>}
  />
}

export function DieView ({ die }: { die: Signal<DieResult> }): JSX.DOMNode {
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

export function OpView ({ op }: { op: Signal<DiceBinOp> }): JSX.DOMNode {
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
      default:
        throw new Error('unreachable')
    }
  })
}

export function DetailsView ({ result, children }: { result: Signal<number>, children: JSX.DOMNode }): JSX.DOMNode {
  return (
    <div class="pair">
      <div class="result">{result}</div>
      <div class="details">{children}</div>
    </div>
  )
}
