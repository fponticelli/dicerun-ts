"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HTMLElement_1 = __importDefault(require("../html-element/HTMLElement"));
/**
 * HTML Image Element.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement.
 */
class HTMLImageElement extends HTMLElement_1.default {
    constructor() {
        super(...arguments);
        this.tagName = 'IMG';
        this.complete = false;
        this.naturalHeight = 0;
        this.naturalWidth = 0;
        this.crossOrigin = null;
        this.decoding = 'auto';
        this.loading = 'auto';
        this.x = 0;
        this.y = 0;
    }
    /**
     * Returns alt.
     *
     * @returns Alt.
     */
    get alt() {
        return this.getAttribute('alt') || '';
    }
    /**
     * Sets alt.
     *
     * @param alt Alt.
     */
    set alt(alt) {
        this.setAttribute('alt', alt);
    }
    /**
     * Returns current src.
     *
     * @returns Current src.
     */
    get currentSrc() {
        return this.src;
    }
    /**
     * Returns height.
     *
     * @returns Height.
     */
    get height() {
        const height = this.getAttribute('height');
        return height !== null ? Number(height) : 0;
    }
    /**
     * Sets height.
     *
     * @param height Height.
     */
    set height(height) {
        this.setAttribute('height', String(height));
    }
    /**
     * Returns is map.
     *
     * @returns Is map.
     */
    get isMap() {
        return this.getAttribute('ismap') !== null;
    }
    /**
     * Sets is map.
     *
     * @param ismap Is map.
     */
    set isMap(isMap) {
        if (!isMap) {
            this.removeAttribute('ismap');
        }
        else {
            this.setAttribute('ismap', '');
        }
    }
    /**
     * Returns referrer policy.
     *
     * @returns Referrer policy.
     */
    get referrerPolicy() {
        return this.getAttribute('referrerpolicy') || '';
    }
    /**
     * Sets referrer policy.
     *
     * @param referrerPolicy Referrer policy.
     */
    set referrerPolicy(referrerPolicy) {
        this.setAttribute('referrerpolicy', referrerPolicy);
    }
    /**
     * Returns sizes.
     *
     * @returns Sizes.
     */
    get sizes() {
        return this.getAttribute('sizes') || '';
    }
    /**
     * Sets sizes.
     *
     * @param sizes Sizes.
     */
    set sizes(sizes) {
        this.setAttribute('sizes', sizes);
    }
    /**
     * Returns source.
     *
     * @returns Source.
     */
    get src() {
        return this.getAttribute('src') || '';
    }
    /**
     * Sets source.
     *
     * @param source Source.
     */
    set src(src) {
        this.setAttribute('src', src);
    }
    /**
     * Returns srcset.
     *
     * @returns Source.
     */
    get srcset() {
        return this.getAttribute('srcset') || '';
    }
    /**
     * Sets src set.
     *
     * @param srcset Src set.
     */
    set srcset(srcset) {
        this.setAttribute('srcset', srcset);
    }
    /**
     * Returns use map.
     *
     * @returns Use map.
     */
    get useMap() {
        return this.getAttribute('usemap') || '';
    }
    /**
     * Sets is map.
     *
     * @param useMap Is map.
     */
    set useMap(useMap) {
        this.setAttribute('usemap', useMap);
    }
    /**
     * Returns width.
     *
     * @returns Width.
     */
    get width() {
        const width = this.getAttribute('width');
        return width !== null ? Number(width) : 0;
    }
    /**
     * Sets width.
     *
     * @param width Width.
     */
    set width(width) {
        this.setAttribute('width', String(width));
    }
    /**
     * The decode() method of the HTMLImageElement interface returns a Promise that resolves when the image is decoded and it is safe to append the image to the DOM.
     *
     * @returns Promise.
     */
    decode() {
        return Promise.resolve();
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
exports.default = HTMLImageElement;
//# sourceMappingURL=HTMLImageElement.js.map