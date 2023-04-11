import { InnerHTML, Signal, type JSX, Prop } from '@tempots/dom'
import showdown from 'showdown'

const converter = new showdown.Converter()

export function Markdown ({ children }: { children?: Signal<string> }): JSX.DOMNode {
  const html = (children ?? Signal.of('')).map(v => converter.makeHtml(v))
  return <InnerHTML html={html} />
}

export function RemoteMarkdown ({ url }: { url: string }): JSX.DOMNode {
  const html = Prop.of('')
  fetch(url)
    .then(async res => await res.text())
    .then(v => converter.makeHtml(v))
    .then(html.set)
    .catch(console.error)
  return <Markdown>{html}</Markdown>
}
