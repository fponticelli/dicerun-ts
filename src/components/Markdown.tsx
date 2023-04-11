import { InnerHTML, Signal, type JSX, Prop } from '@tempots/dom'
import nmd from 'nano-markdown'

export function Markdown({ children }: { children?: Signal<string> }): JSX.DOMNode {
  const html = (children ?? Signal.of('')).map(v => nmd(v))
  return <InnerHTML html={html} />
}

export function RemoteMarkdown({ url }: { url: string }): JSX.DOMNode {
  const html = Prop.of('')
  fetch(url)
    .then(async res => await res.text())
    .then(nmd)
    .then(html.set)
    .catch(console.error)
  return <Markdown>{html}</Markdown>
}
