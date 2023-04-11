import { JSX, Signal } from "@tempots/dom";
import { Parsed } from "../state";

export interface ProbabilitiesViewProps {
  parsed: Signal<Parsed>
}

export function ProbabilitiesView({ parsed }: ProbabilitiesViewProps): JSX.DOMNode {
  return <div>ProbabilitiesView TODO</div>
}
