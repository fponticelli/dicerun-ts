import { Prop, type JSX, OneOf, type Signal } from '@tempots/dom'
import { RemoteMarkdown } from './components/Markdown'
import { ExpressionInput } from './components/ExpressionInput'
import { RollView } from './components/RollView'
import { ProbabilitiesView } from './components/ProbabilitiesView'
import { JumpersRibbon } from './components/JumpersRibbon'
import { Expression, type Parsed, type State } from './state'
import { reduce } from './reducer'
import { Action } from './action'
import { type ProbabilitiesResult } from './utils/probabilities-result'
import { prettify, trimCharsLeft } from './utils/strings'
import { statsMiddleware } from './utils/stats-middleware'

function makeDispatchHash (dispatch: (action: Action) => void): () => void {
  return () => {
    const h = trimCharsLeft(window.location.hash, '#/')
    if (h.startsWith('d/')) {
      dispatch(Action.evaluateExpression(prettify(h.substring(2))))
    } else if (h === '') {
      dispatch(Action.evaluateExpression('3d6'))
    }
  }
}

export const App = (): JSX.DOMNode => {
  return <Content />
}

export const Content = (): JSX.DOMNode => {
  const state = Prop.of<State>({
    expression: Expression.unparsed(''),
    seed: 1234567890,
    useSeed: false,
    roll: null,
    probabilities: null
  })
  const dispatch = state.reducer(reduce)
  state.at('expression').subscribe(statsMiddleware(dispatch))
  const dispatchHash = makeDispatchHash(dispatch)
  window.onhashchange = dispatchHash
  dispatchHash()

  return (
    <div class="content">
      <div class="header">
        <JumpersRibbon />
        <ExpressionInput dispatch={dispatch} expr={state.at('expression')} />
        <OneOf
          match={state.at('expression').map((v: Expression) => {
            switch (v.type) {
              case 'parsed':
                return { parsed: v }
              default:
                return { otherwise: null }
            }
          })}
          parsed={((v: Signal<Parsed>) => <RollView dispatch={dispatch} state={state} />) as any}
          otherwise={() => <></>}
        />
      </div>
      <div class="body">
        <OneOf
          match={state.at('probabilities').map(p => {
            if (p === null) {
              return { empty: null }
            }
            return { probabilities: p }
          })}
          empty={() => <>Nothing</>}
          probabilities={(p: Signal<ProbabilitiesResult>) => <ProbabilitiesView probabilities={p} />}
          />
        <div class="description text-content">
          <RemoteMarkdown url="data/description.md" />
        </div>
        {/* <div class="banner">
          <div id="amzn-assoc-ad-04f038ac-fa7c-4a9f-8608-593f2980953c"></div><script async src="//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US&adInstanceId=04f038ac-fa7c-4a9f-8608-593f2980953c"></script>
        </div> */}
        <div class="footer text-content">
          <RemoteMarkdown url="data/footer.md" />
        </div>
      </div>
    </div>
  )
}
