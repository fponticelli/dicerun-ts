import { type JSX } from '@tempots/dom'

export interface TooltipProps {
  children?: JSX.DOMNode
}

export function Tooltip ({ children }: TooltipProps): JSX.DOMNode {
  return (
    <div class="tooltip-container">
      <div class="tooltip">
        {children}
      </div>
    </div>
  )
}
