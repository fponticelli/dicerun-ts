"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbortSignal_1 = __importDefault(require("./AbortSignal"));
/**
 * AbortController.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/AbortController
 */
class AbortController {
    /**
     * Constructor.
     */
    constructor() {
        this.signal = new AbortSignal_1.default();
        this.signal = new AbortSignal_1.default();
    }
    /**
     * Aborts the signal.
     *
     * @param [reason] Reason.
     */
    abort(reason) {
        this.signal._abort(reason);
    }
}
exports.default = AbortController;
//# sourceMappingURL=AbortController.js.map