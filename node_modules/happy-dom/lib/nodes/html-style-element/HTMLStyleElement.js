"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CSSStyleSheet_1 = __importDefault(require("../../css/CSSStyleSheet"));
const HTMLElement_1 = __importDefault(require("../html-element/HTMLElement"));
/**
 * HTML Style Element.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLStyleElement.
 */
class HTMLStyleElement extends HTMLElement_1.default {
    constructor() {
        super(...arguments);
        this._styleSheet = null;
    }
    /**
     * Returns CSS style sheet.
     *
     * @returns CSS style sheet.
     */
    get sheet() {
        if (!this.isConnected) {
            return null;
        }
        if (!this._styleSheet) {
            this._styleSheet = new CSSStyleSheet_1.default();
        }
        this._styleSheet.replaceSync(this.textContent);
        return this._styleSheet;
    }
    /**
     * Returns media.
     *
     * @returns Media.
     */
    get media() {
        return this.getAttribute('media') || '';
    }
    /**
     * Sets media.
     *
     * @param media Media.
     */
    set media(media) {
        this.setAttribute('media', media);
    }
    /**
     * Returns type.
     *
     * @returns Type.
     */
    get type() {
        return this.getAttribute('type') || '';
    }
    /**
     * Sets type.
     *
     * @param type Type.
     */
    set type(type) {
        this.setAttribute('type', type);
    }
    /**
     * Returns disabled.
     *
     * @returns Disabled.
     */
    get disabled() {
        return this.getAttribute('disabled') !== null;
    }
    /**
     * Sets disabled.
     *
     * @param disabled Disabled.
     */
    set disabled(disabled) {
        if (!disabled) {
            this.removeAttribute('disabled');
        }
        else {
            this.setAttribute('disabled', '');
        }
    }
}
exports.default = HTMLStyleElement;
//# sourceMappingURL=HTMLStyleElement.js.map