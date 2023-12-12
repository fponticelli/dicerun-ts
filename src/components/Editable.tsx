import { type Signal, type JSX, Autofocus } from '@tempots/dom'

export interface EditableProps {
  value: Signal<string>
  onChange: (value: string) => void
}

export function Editable ({ value, onChange }: EditableProps): JSX.DOMNode {
  return <input
    class="text-editor"
    type="text"
    value={value}
    onInput={e => { onChange((e.target as HTMLInputElement).value) }}
  >
    <Autofocus />
  </input>
}
