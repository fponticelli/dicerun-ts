import HTMLCollection from '../element/HTMLCollection';
import IHTMLSelectElement from './IHTMLSelectElement';
import IHTMLOptionElement from '../html-option-element/IHTMLOptionElement';
import IHTMLOptionsCollection from './IHTMLOptionsCollection';
/**
 * HTML Options Collection.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLOptionsCollection.
 */
export default class HTMLOptionsCollection extends HTMLCollection<IHTMLOptionElement> implements IHTMLOptionsCollection {
    private _selectElement;
    /**
     *
     * @param selectElement
     */
    constructor(selectElement: IHTMLSelectElement);
    /**
     * Returns selectedIndex.
     *
     * @returns SelectedIndex.
     */
    get selectedIndex(): number;
    /**
     * Sets selectedIndex.
     *
     * @param selectedIndex SelectedIndex.
     */
    set selectedIndex(selectedIndex: number);
    /**
     * Returns item by index.
     *
     * @param index Index.
     */
    item(index: number): IHTMLOptionElement;
    /**
     *
     * @param element
     * @param before
     */
    add(element: IHTMLOptionElement, before?: number | IHTMLOptionElement): void;
    /**
     * Removes indexed element from collection.
     *
     * @param index Index.
     */
    remove(index: number): void;
}
//# sourceMappingURL=HTMLOptionsCollection.d.ts.map