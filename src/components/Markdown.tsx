import { InnerHTML, Signal, type JSX, Prop } from '@tempots/dom'
import { marked } from 'marked'

export function Markdown ({ children }: { children?: Signal<string> }): JSX.DOMNode {
  const html = (children ?? Signal.of('')).map(v => marked.parse(v))
  return <InnerHTML html={html} />
}

export function RemoteMarkdown ({ url }: { url: string }): JSX.DOMNode {
  const html = Prop.of('')
  fetch(url)
    .then(async res => await res.text())
    .then(v => marked.parse(v))
    .then(html.set)
    .catch(console.error)
  return <Markdown>{html}</Markdown>
}
