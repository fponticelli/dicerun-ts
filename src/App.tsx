import { type JSX } from '@tempots/dom'
import { StyleProvider } from '@tempots/ui'
import { RemoteMarkdown } from './components/Markdown'

export const App = (): JSX.DOMNode => {
  return <StyleProvider><Content /></StyleProvider>
}

export const Content = (): JSX.DOMNode => {
  return (
    <div class="content">
      <div class="header">
        <div class="ribbon">
          <a href="https://jumpersideas.com/#!dice-roller">
            <span class="prefix">as confabulated on</span>
            <br />
            <span class="domain">jumpersideas.com</span>
          </a>
        </div>
        <div>ExpressionInput TODO</div>
        <div>RollView TODO</div>
      </div>
      <div class="body">
        <div>ProbabilitiesView TODO</div>
        <div class="description text-content">
          <RemoteMarkdown url="description.md" />
        </div>
        <div class="footer text-content">
          <RemoteMarkdown url="footer.md" />
        </div>
      </div>
    </div>
  )
}
