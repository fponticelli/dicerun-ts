import AbortSignal from './AbortSignal';
/**
 * AbortController.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/AbortController
 */
export default class AbortController {
    readonly signal: AbortSignal;
    /**
     * Constructor.
     */
    constructor();
    /**
     * Aborts the signal.
     *
     * @param [reason] Reason.
     */
    abort(reason?: string): void;
}
//# sourceMappingURL=AbortController.d.ts.map