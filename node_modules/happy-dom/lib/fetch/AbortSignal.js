"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EventTarget_1 = __importDefault(require("../event/EventTarget"));
const Event_1 = __importDefault(require("../event/Event"));
/**
 * AbortSignal.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal
 */
class AbortSignal extends EventTarget_1.default {
    constructor() {
        super(...arguments);
        this.aborted = false;
        this.reason = null;
        this.onabort = null;
    }
    /**
     * Aborts the signal.
     *
     * @param [reason] Reason.
     */
    _abort(reason) {
        if (this.aborted) {
            return;
        }
        if (reason) {
            this.reason = reason;
        }
        this.aborted = true;
        this.dispatchEvent(new Event_1.default('abort'));
    }
    /**
     * Returns an AbortSignal instance that has been set as aborted.
     *
     * @param [reason] Reason.
     * @returns AbortSignal instance.
     */
    static abort(reason) {
        const signal = new AbortSignal();
        if (reason) {
            signal.reason = reason;
        }
        signal.aborted = true;
        return signal;
    }
}
exports.default = AbortSignal;
//# sourceMappingURL=AbortSignal.js.map