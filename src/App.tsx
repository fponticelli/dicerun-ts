import { Prop, type JSX, OneOf, Signal } from '@tempots/dom'
import { StyleProvider } from '@tempots/ui'
import { RemoteMarkdown } from './components/Markdown'
import { ExpressionInput } from './components/ExpressionInput'
import { RollView } from './components/RollView'
import { ProbabilitiesView } from './components/ProbabilitiesView'
import { JumpersRibbon } from './components/JumpersRibbon'
import { Expression, Parsed, State } from './state'
import { reduce } from './reducer'
import { Action } from './action'

function prettify(s: String) {
  return s.replace("_", " ");
}

function trimCharsLeft(s: string, chars: string): string {
  var i = 0;
  while (i < s.length && chars.indexOf(s.charAt(i)) >= 0) {
    i++;
  }
  return s.substring(i);
}

function makeDispatchHash(dispatch: (action: Action) => void): () => void {
  return () => {
    var h = trimCharsLeft(window.location.hash, "#/");
    if (h.startsWith("d/")) {
      dispatch(Action.evaluateExpression(prettify(h.substring(2))));
    } else if (h == "") {
      dispatch(Action.evaluateExpression("3d6"));
    }
  }
}

export const App = (): JSX.DOMNode => {
  return <StyleProvider><Content /></StyleProvider>
}

export const Content = (): JSX.DOMNode => {
  const state = Prop.of<State>({
    expression: Expression.unparsed(''),
    seed: 1234567890,
    useSeed: false
  })
  const dispatch = state.reducer(reduce)
  const dispatchHash = makeDispatchHash(dispatch);
  window.onhashchange = dispatchHash;
  dispatchHash();

  return (
    <div class="content">
      <div class="header">
        <JumpersRibbon />
        <ExpressionInput dispatch={dispatch} expr={state.at('expression')} />
        <OneOf
          match={state.at('expression').map((v: Expression) => {
            switch (v.type) {
              case 'parsed':
                return ['parsed', v] as ['parsed', Parsed]
              default:
                return ['otherwise', null] as ['otherwise', null]
            }
          })}
          parsed={((v: Signal<Parsed>) => <RollView dispatch={dispatch} state={
            state.combine(v, (state: State, parsed) => {
              return { useSeed: state.useSeed, seed: state.seed, expression: parsed }
            })
          } />) as any}
          otherwise={() => <></>}
        />
      </div>
      <div class="body">
        <OneOf
          match={state.at('expression').map((v: Expression) => {
            switch (v.type) {
              case 'parsed':
                return ['parsed', v] as ['parsed', Parsed]
              default:
                return ['otherwise', null] as ['otherwise', null]
            }
          })}
          parsed={((v: Signal<Parsed>) => <ProbabilitiesView parsed={v} />) as any}
          otherwise={() => <></>}
        />
        <div class="description text-content">
          <RemoteMarkdown url="data/description.md" />
        </div>
        <div class="footer text-content">
          <RemoteMarkdown url="data/footer.md" />
        </div>
      </div>
    </div>
  )
}
