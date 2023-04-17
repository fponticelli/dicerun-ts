import { type JSX, type Signal, OneOfUnionType, OneOfLiteral, OneOf, ClassName, For, conjuctions, type PositionProps } from '@tempots/dom'
import { type DiceBinOp, type DiceReducer, type OneResult, type DiceResultMapped, type DieResult, type DieResultFilter, type RollResult, type LiteralResult, type DiceReduceResult, type BinaryOpResult, type UnaryOpResult, type DiceReduceableResult, type DiceExpressionsResult, type DiceMapeableResult, type DiceFilterableResult, type DiceFilter, type Drop, type Keep, type DiceUnOp, type DiceFunctor, type Explode, type Reroll, type Range, type Times, type Rerolled, type Exploded, type Normal, type Between, type Exact, type Composite, type ValueOrLess, type ValueOrMore, type Always, type UpTo } from 'dicerollerts'

export interface RollDetailsViewProps {
  result: Signal<RollResult>
}

export function RollDetailsView ({ result }: RollDetailsViewProps): JSX.DOMNode {
  return (
    <OneOfUnionType
      match={result}
      one-result={((r: Signal<OneResult>) => <DieResultView die={r.at('die')} />)}
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

export function UnaryOpView ({ op }: { op: Signal<DiceUnOp> }): JSX.DOMNode {
  return (
    <OneOfLiteral
      match={op}
      negate={<span class="unop">-</span>}
    />
  )
}

export function UnaryOpResultView ({ op }: { op: Signal<UnaryOpResult> }): JSX.DOMNode {
  return (
    <div class="unop">
      <UnaryOpView op={op.at('op')} />
      <RollDetailsView result={op.at('expr')} />
    </div>
  )
}

export function DiceReduceResultView ({ value }: { value: Signal<DiceReduceResult> }): JSX.DOMNode {
  return (
    <div class="reduce">
      <div class="result">{value.at('result')}</div>
      <div class="dice-set">
        <ReducerView reducer={value.at('reducer')} />
        <DiceReduceableResultView value={value.at('reduceables')} />
      </div>
    </div>
  )
}

export function DiceReduceableResultView ({ value }: { value: Signal<DiceReduceableResult> }): JSX.DOMNode {
  return (
    <OneOfUnionType
      match={value}
      dice-expressions-result={((r: Signal<DiceExpressionsResult>) => <DiceRollsView rolls={r.at('rolls')} separator={<div class="comma">+</div>} node={(roll: Signal<RollResult>) => <RollDetailsView result={roll} />} />)}
      dice-filterable-result={((r: Signal<DiceFilterableResult>) => <DiceFilterableResultView value={r} />)}
      dice-mapeable-result={((r: Signal<DiceMapeableResult>) => <DiceMapeableResultView value={r} />)}
      literal-result={((r: Signal<LiteralResult>) => <LiteralResultView result={r} />)}
      binary-op-result={((r: Signal<BinaryOpResult>) => <BinaryOpResultView op={r} />)}
    />
  )
}

export function BetweenView ({ between }: { between: Signal<Between> }): JSX.DOMNode {
  return (
    <div class="between">
      between {between.at('minInclusive')} and {between.at('maxInclusive')}
    </div>
  )
}

export function ExactView ({ exact }: { exact: Signal<Exact> }): JSX.DOMNode {
  return (
    <div class="exact">
      when matches {exact.at('value')}
    </div>
  )
}

export function CompositeView ({ composite }: { composite: Signal<Composite> }): JSX.DOMNode {
  return (
    <div class="composite">
      <For of={composite.at('ranges')} separator={conjuctions(', ', 'or')}>
        {(range: Signal<Range>) => <RangeView range={range} />}
      </For>
    </div>
  )
}

export function ValueOrLessView ({ 'value-or-less': valueOrLess }: { 'value-or-less': Signal<ValueOrLess> }): JSX.DOMNode {
  return (
    <div class="value-or-less">
      when {valueOrLess.at('value')} or less
    </div>
  )
}

export function ValueOrMoreView ({ 'value-or-more': valueOrMore }: { 'value-or-more': Signal<ValueOrMore> }): JSX.DOMNode {
  return (
    <div class="value-or-more">
      when {valueOrMore.at('value')} or more
    </div>
  )
}

export function RangeView ({ range }: { range: Signal<Range> }): JSX.DOMNode {
  return (
    <OneOfUnionType
      match={range}
      between={((r: Signal<Between>) => <BetweenView between={r} />)}
      exact={((r: Signal<Exact>) => <ExactView exact={r} />)}
      composite={((r: Signal<Composite>) => <CompositeView composite={r} />)}
      value-or-less={((r: Signal<ValueOrLess>) => <ValueOrLessView value-or-less={r} />)}
      value-or-more={((r: Signal<ValueOrMore>) => <ValueOrMoreView value-or-more={r} />)}
    />
  )
}

export function AlwaysView ({ always }: { always: Signal<Always> }): JSX.DOMNode {
  return (
    <div class="always">
      always
    </div>
  )
}

export function UpToView ({ upTo: atMost }: { upTo: Signal<UpTo> }): JSX.DOMNode {
  return (
    <div class="up-to">
      up to {atMost.at('value')} times
    </div>
  )
}

export function TimesView ({ times }: { times: Signal<Times> }): JSX.DOMNode {
  return (
    <OneOfUnionType
      match={times}
      always={((r: Signal<Always>) => <AlwaysView always={r} />)}
      up-to={((r: Signal<UpTo>) => <UpToView upTo={r} />)}
    />
  )
}

export function ExplodeView ({ explode }: { explode: Signal<Explode> }): JSX.DOMNode {
  return (
    <div class="explode">
      <div class="op">explode</div>
      <TimesView times={explode.at('times')} />
      <RangeView range={explode.at('range')} />
    </div>
  )
}

export function RerollView ({ reroll }: { reroll: Signal<Reroll> }): JSX.DOMNode {
  return (
    <div class="reroll">
      <div class="op">reroll</div>
      <TimesView times={reroll.at('times')} />
      <RangeView range={reroll.at('range')} />
    </div>
  )
}

export function DiceFunctorView ({ functor }: { functor: Signal<DiceFunctor> }): JSX.DOMNode {
  return (
    <OneOfUnionType
      match={functor}
      explode={((v: Signal<Explode>) => <ExplodeView explode={v} />)}
      reroll={((v: Signal<Reroll>) => <RerollView reroll={v} />)}
    />
  )
}

export function DiceMapeableResultView ({ value }: { value: Signal<DiceMapeableResult> }): JSX.DOMNode {
  return (
    <div class="map">
      <DiceFunctorView functor={value.at('functor')} />
      <DiceRollsView rolls={value.at('rolls')} separator={<div class="comma">+</div>} node={(roll: Signal<DiceResultMapped>) => <DiceResultMappedView dice={roll} />} />
    </div>
  )
}

export function DiceFilterableResultView ({ value }: { value: Signal<DiceFilterableResult> }): JSX.DOMNode {
  return (
    <div class="split">
      <DiceRollsView rolls={value.at('rolls')} separator={<div></div>} node={r => <DieResultFilterView filter={r} />} />
      <DiceFilterView filter={value.at('filter')} />
    </div>
  )
}

function directionToString (dir: 'high' | 'low'): string {
  switch (dir) {
    case 'high': return 'highest'
    case 'low': return 'lowest'
    default: throw new Error('unreachable')
  }
}

export function DiceFilterView ({ filter }: { filter: Signal<DiceFilter> }): JSX.DOMNode {
  return (
    <div style="white-space: nowrap">
      <OneOfUnionType
        match={filter}
        drop={((v: Signal<Drop>) => <div class="drop">drop {v.at('dir').map(directionToString)} {v.at('value')}</div>)}
        keep={((v: Signal<Keep>) => <div class="keep">keep {v.at('dir').map(directionToString)} {v.at('value')}</div>)}
      />
    </div>
  )
}

export function DiceRollsView<T> ({ rolls, separator, node }: { rolls: Signal<T[]>, separator: JSX.DOMNode, node: (signal: Signal<T>) => JSX.DOMNode }): JSX.DOMNode {
  return <div class="reduce">
      <div class="dice-set">
        <For of={rolls} separator={() => separator}>
          {node}
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
  return <OneOfUnionType
    match={dice}
    rerolled={(v: Signal<Rerolled>) => (
      <div class="rerolled">
        <For of={v.at('rerolls').map(v => {
          const copy = v.slice()
          copy.reverse()
          return copy
        })}>
          {(r: Signal<DieResult>, index: Signal<PositionProps>) => (
            <div class={index.at('first').map((v: boolean): string => v ? 'keep' : 'discard')}>
              <DieResultView die={r} />
            </div>
          )}
        </For>
      </div>
    )}
    exploded={(v: Signal<Exploded>) => (
      <div class="exploded">
        <For of={v.at('explosions')}>
          {(r: Signal<DieResult>) => (
            <div class="keep">
              <DieResultView die={r} />
            </div>)}
        </For>
      </div>
    )}
    normal={(v: Signal<Normal>) => (
      <div class="normal">
        <DieResultView die={v.at('roll')} />
      </div>
    )}
  />
}

export function ReducerView ({ reducer }: { reducer: Signal<DiceReducer> }): JSX.DOMNode {
  return <OneOfLiteral
    match={reducer}
    sum={<></>}
    min={<div>take lowest</div>}
    max={<div>take highest</div>}
    average={<div>average</div>}
    median={<div>median</div>}
  />
}

function randomRoll (): string {
  return `roll roll${Math.ceil(Math.random() * 10)}`
}

export function DieResultView ({ die }: { die: Signal<DieResult> }): JSX.DOMNode {
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
          <div class="die-icon">
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
          <div class="die-icon">
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
  return (<div>
    {op.map(op => {
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
    })}
  </div>
  )
}

export function DetailsView ({ result, children }: { result: Signal<number>, children?: JSX.DOMNode }): JSX.DOMNode {
  return (
    <div class="pair">
      <div class="result">{result}</div>
      <div class="details">{children}</div>
    </div>
  )
}
