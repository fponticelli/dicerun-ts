import { JSX, Signal } from "@tempots/dom";

export interface EditableProps {
  value: Signal<string>
  onChange: (value: string) => void
  autofocus?: boolean
}

export function Editable({ value, onChange, autofocus }: EditableProps): JSX.DOMNode {
  return <input class="text-editor" type="text" value={value} onInput={e => onChange((e.target as HTMLInputElement).value)} autofocus={autofocus} />
}
