"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HTMLElement_1 = __importDefault(require("../html-element/HTMLElement"));
/**
 * HTML Label Element.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement.
 */
class HTMLLabelElement extends HTMLElement_1.default {
    /**
     * Returns a string containing the ID of the labeled control. This reflects the "for" attribute.
     *
     * @returns ID of the labeled control.
     */
    get htmlFor() {
        const htmlFor = this.getAttribute('for');
        if (htmlFor !== null) {
            return htmlFor;
        }
        return htmlFor !== null ? htmlFor : '';
    }
    /**
     * Sets a string containing the ID of the labeled control. This reflects the "for" attribute.
     *
     * @param htmlFor ID of the labeled control.
     */
    set htmlFor(htmlFor) {
        this.setAttribute('for', htmlFor);
    }
    /**
     * Returns an HTML element representing the control with which the label is associated.
     *
     * @returns Control element.
     */
    get control() {
        const htmlFor = this.htmlFor;
        if (htmlFor) {
            return this.ownerDocument.getElementById(htmlFor);
        }
        for (const child of this.children) {
            if (child.tagName === 'INPUT') {
                return child;
            }
        }
        return null;
    }
    /**
     * Returns the parent form element.
     *
     * @returns Form.
     */
    get form() {
        return this._formNode;
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
exports.default = HTMLLabelElement;
//# sourceMappingURL=HTMLLabelElement.js.map