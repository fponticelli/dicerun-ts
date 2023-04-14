import { type JSX, type Signal, OneOfUnionType, OneOfLiteral, OneOf, ClassName, For } from '@tempots/dom'
import { type DiceBinOp, type DiceReducer, type OneResult, type DiceResultMapped, type DieResult, type DieResultFilter, type RollResult, type LiteralResult, type DiceReduceResult, type BinaryOpResult, type UnaryOpResult, type DiceReduceableResult, type DiceExpressionsResult, type DiceMapeableResult, type DiceFilterableResult } from 'dicerollerts'

export interface RollDetailsViewProps {
  result: Signal<RollResult>
}

export function RollDetailsView ({ result }: RollDetailsViewProps): JSX.DOMNode {
  return (
    <OneOfUnionType
      match={result}
      one-result={((r: Signal<OneResult>) => <DieView die={r.at('die')} />)}
      literal-result={((r: Signal<LiteralResult>) => <LiteralResultView result={r} />)}
      binary-op-result={((r: Signal<BinaryOpResult>) => <BinaryOpResultView op={r} />)}
      dice-result-mapped={((r: Signal<DiceResultMapped>) => <DiceResultMappedView dice={r} />)}
      dice-reduce-result={((r: Signal<DiceReduceResult>) => <DiceReduceResultView value={r} />)}
      unary-op-result={((r: Signal<UnaryOpResult>) => <UnaryOpResultView op={r} />)}
    />
  )
}

export function BinaryOpResultView ({ op }: { op: Signal<BinaryOpResult> }): JSX.DOMNode {
  return (
    <div class="binop">
      <div class="left">
        <RollDetailsView result={op.at('left')} />
      </div>
      <div class="op">
        <OpView op={op.at('op')} />
      </div>
      <div class="right">
        <RollDetailsView result={op.at('right')} />
      </div>
    </div>
  )
}

export function UnaryOpResultView ({ op }: { op: Signal<UnaryOpResult> }): JSX.DOMNode {
  return (
    <div class="unop">
      {/* <UnaryOpView op={op.at('op')} /> */}
      <RollDetailsView result={op.at('expr')} />
    </div>
  )
}

export function DiceReduceResultView ({ value }: { value: Signal<DiceReduceResult> }): JSX.DOMNode {
  console.log(value)
  return (
    <div class="reduce">
      <div class="result">{value.at('result')}</div>
      <DiceReduceableResultView value={value.at('reduceables')} />
      <ReducerView reducer={value.at('reducer')} />
    </div>
  )
}

export function DiceReduceableResultView ({ value }: { value: Signal<DiceReduceableResult> }): JSX.DOMNode {
  return (
    <OneOfUnionType
      match={value}
      dice-expressions-result={((r: Signal<DiceExpressionsResult>) => <DiceRollsView rolls={r.at('rolls')} />)}
      dice-filterable-result={((r: Signal<DiceFilterableResult>) => 'TODO#2')}
      dice-mapeable-result={((r: Signal<DiceMapeableResult>) => 'TODO#3')}
      literal-result={((r: Signal<LiteralResult>) => <LiteralResultView result={r} />)}
      binary-op-result={((r: Signal<BinaryOpResult>) => <BinaryOpResultView op={r} />)}
    />
  )
}

export function DiceRollsView ({ rolls }: { rolls: Signal<RollResult[]> }): JSX.DOMNode {
  return <div class="reduce">
      <div class="dice-set">
        <For of={rolls}>
          {(roll: Signal<RollResult>) => <RollDetailsView result={roll} />}
        </For>
      </div>
    </div>
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
  return <OneOfLiteral
    match={reducer}
    sum={<></>}
    min={<div>min</div>}
    max={<div>max</div>}
    average={<div>average</div>}
    median={<div>median</div>}
  />
}

function randomRoll (): string {
  return `roll${Math.ceil(Math.random() * 5)}`
}

export function DieView ({ die }: { die: Signal<DieResult> }): JSX.DOMNode {
  const r = die.map(randomRoll)
  return <OneOf
    match={die.map((d): { d6: DieResult } | { poliedra: DieResult } | { other: DieResult } => {
      if (d.sides === 6) { return { d6: d } }
      if ([2, 4, 8, 10, 12, 20].includes(d.sides)) { return { poliedra: d } }
      return { other: d }
    })}
    d6={
      (result: Signal<DieResult>) => {
        return <div class="die-container">
          <div class="die-icon roll">
            <ClassName value={r} />
            <i>
              <ClassName value={result.map(d => `df-dot-d6-${d.result}`)} />
            </i>
          </div>
        </div>
      }
    }
    poliedra={
      (result: Signal<DieResult>) => {
        return <div class="die-container">
          <div class="die-icon roll">
            <ClassName value={r} />
            <i>
              <ClassName value={result.map(d => `df-d${d.sides}-${d.result}`)} />
            </i>
          </div>
        </div>
      }
    }
    other={
      (result: Signal<DieResult>) => {
        return <DetailsView result={result.at('result')}>
          <div class="die">
            <div class="d">d</div>
            <div class="X">{result.map(d => d.sides === 100 ? '%' : d.sides)}</div>
          </div>
        </DetailsView>
      }
    }
  />
}

export function OpView ({ op }: { op: Signal<DiceBinOp> }): JSX.DOMNode {
  return op.map(op => {
    switch (op) {
      case 'sum':
        return '+'
      case 'difference':
        return '-'
      case 'multiplication':
        return '×'
      case 'division':
        return '÷'
      default:
        throw new Error('unreachable')
    }
  })
}

export function DetailsView ({ result, children }: { result: Signal<number>, children?: JSX.DOMNode }): JSX.DOMNode {
  return (
    <div class="pair">
      <div class="result">{result}</div>
      <div class="details">{children}</div>
    </div>
  )
}
