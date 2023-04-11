import { JSX } from "@tempots/dom";

export interface JumpersRibbonProps { }

export function JumpersRibbon(props: JumpersRibbonProps): JSX.DOMNode {
  return (
    <div class="ribbon">
      <a href="https://jumpersideas.com/#!dice-roller">
        <span class="prefix">as confabulated on</span>
        <br />
        <span class="domain">jumpersideas.com</span>
      </a>
    </div>
  )
}
