import EventTarget from '../event/EventTarget';
import Event from '../event/Event';
/**
 * AbortSignal.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal
 */
export default class AbortSignal extends EventTarget {
    readonly aborted: boolean;
    readonly reason: string | null;
    onabort: ((this: AbortSignal, event: Event) => void) | null;
    /**
     * Aborts the signal.
     *
     * @param [reason] Reason.
     */
    _abort(reason?: string): void;
    /**
     * Returns an AbortSignal instance that has been set as aborted.
     *
     * @param [reason] Reason.
     * @returns AbortSignal instance.
     */
    static abort(reason?: string): AbortSignal;
}
//# sourceMappingURL=AbortSignal.d.ts.map