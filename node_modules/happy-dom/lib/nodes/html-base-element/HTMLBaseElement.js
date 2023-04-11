"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HTMLElement_1 = __importDefault(require("../html-element/HTMLElement"));
/**
 * HTML Base Element.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base.
 */
class HTMLBaseElement extends HTMLElement_1.default {
    /**
     * Returns href.
     *
     * @returns Href.
     */
    get href() {
        const href = this.getAttribute('href');
        if (href !== null) {
            return href;
        }
        return this.ownerDocument.location.href;
    }
    /**
     * Sets href.
     *
     * @param href Href.
     */
    set href(href) {
        this.setAttribute('href', href);
    }
    /**
     * Returns target.
     *
     * @returns Target.
     */
    get target() {
        return this.getAttribute('target') || '';
    }
    /**
     * Sets target.
     *
     * @param target Target.
     */
    set target(target) {
        this.setAttribute('target', target);
    }
    /**
     * Clones a node.
     *
     * @override
     * @param [deep=false] "true" to clone deep.
     * @returns Cloned node.
     */
    cloneNode(deep = false) {
        return super.cloneNode(deep);
    }
}
exports.default = HTMLBaseElement;
//# sourceMappingURL=HTMLBaseElement.js.map