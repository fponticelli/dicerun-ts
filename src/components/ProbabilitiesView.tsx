import { Signal, type JSX, ClassName, For, Prop } from '@tempots/dom'
import { type Sample, type ProbabilitiesResult } from '../utils/probabilities-result'

const PROBABILITIES_STATS_WITH_BUCKET = 'values between $minValue and $maxValue (bucket size: $bucketSize), samples: $count'
const BAR_HEIGHT = 100.0

export interface ProbabilitiesViewProps {
  probabilities: Signal<ProbabilitiesResult>
}

export function StatsView ({ message }: { message: Signal<string> }): JSX.DOMNode {
  return (<div class="stats">{message}</div>)
}

function formatValue (bucketSize: number, value: number): string {
  if (bucketSize === 1) {
    return `${value}`
  } else {
    const m = (value - 1) * bucketSize
    return `${m}-${m + bucketSize - 1}`
  }
}

export function ChartView ({
  probabilities,
  calcHeight,
  calcPercent
}: {
  probabilities: Signal<ProbabilitiesResult>
  calcHeight: (sample: Sample) => number
  calcPercent: (sample: Sample) => number
}): JSX.DOMNode {
  const bucketSize = probabilities.map(p => {
    const { minValue, maxValue } = p.stats()
    const range = maxValue - minValue
    return findBucketSize(range)
  })
  return (
    <For of={probabilities.map(p => {
      return p.stats().getSamples()
    })}>
      {(s: Signal<Sample>) => {
        const selected = Prop.of(false)
        return (
          <div class="bar-container"
            onMouseEnter={() => { selected.set(true) }}
            onMouseLeave={() => { selected.set(false) }}
          >
            <ClassName value={selected.map((v): string => v ? 'selected' : '')} />
            <div class="label">
              <div class="text">{s.combine(bucketSize, (p, bs) => {
                return formatValue(bs, p.value)
              })}</div>
            </div>
            <div class="bar" style={(s.map(v => `height: ${calcHeight(v) * BAR_HEIGHT}px`))}>
            </div>
            <div class="percent">
              <div class="text">{s.map(s => calcPercent(s).toLocaleString(undefined, { style: 'percent' }))}</div>
            </div>
          </div>
        )
      }}
    </For>
  )
}

export function ChartsView ({ probabilities }: { probabilities: Signal<ProbabilitiesResult> }): JSX.DOMNode {
  return (
    <div class="probabilities-container">
      <div class="probabilities">
        <div class="barchart">
          <ChartView
            probabilities={probabilities}
            calcHeight={v => v.getRevPercent()}
            calcPercent={v => v.getRevPercent()}
          />
        </div>
        <div class="barchart">
          <ChartView
            probabilities={probabilities}
            calcHeight={v => v.getMaxPercent()}
            calcPercent={v => v.getPercent()}
          />
        </div>
        <div class="barchart">
          <ChartView
            probabilities={probabilities}
            calcHeight={v => v.getAccPercent()}
            calcPercent={v => v.getAccPercent()}
          />
        </div>
      </div>
    </div>
  )
}

export function LabelView ({ label }: { label: Signal<string> }): JSX.DOMNode {
  return (
    <div class="label">
      {label}
    </div>
  )
}

export function LabelsView (): JSX.DOMNode {
  return (
    <div class="probabilities-labels">
      <LabelView label={Signal.of('at least')}/>
      <LabelView label={Signal.of('probabilities')}/>
      <LabelView label={Signal.of('at most')}/>
    </div>
  )
}

function findBucketSize (range: number): number {
  const threshold = 100
  if (range <= threshold) return 1
  const sizes = [2, 5, 10, 20, 25, 50, 100]
  const multiplier = 100
  let curMultiplier = 1
  while (true) {
    for (const v of sizes) {
      const vm = curMultiplier * v
      if (range / vm <= threshold) return vm
    }
    curMultiplier *= multiplier
  }
}

export function ProbabilitiesView ({ probabilities }: ProbabilitiesViewProps): JSX.DOMNode {
  const message = probabilities.map((p) => {
    const stats = p.stats()
    const range = stats.maxValue - stats.minValue
    const bucketSize = findBucketSize(range)
    return PROBABILITIES_STATS_WITH_BUCKET
      .replace('$minValue', stats.minValue.toLocaleString())
      .replace('$maxValue', stats.maxValue.toLocaleString())
      .replace('$bucketSize', bucketSize.toLocaleString())
      .replace('$count', stats.count.toLocaleString())
  })
  return (
    <div class="bars">
      <StatsView message={message}/>
      <ChartsView probabilities={probabilities}/>
      <LabelsView />
    </div>
  )
}
