import HTMLElement from '../html-element/HTMLElement';
import IHTMLFormElement from '../html-form-element/IHTMLFormElement';
import IHTMLLabelElement from '../html-label-element/IHTMLLabelElement';
import INodeList from '../node/INodeList';
import IHTMLSelectElement from './IHTMLSelectElement';
import Event from '../../event/Event';
import IHTMLOptionElement from '../html-option-element/IHTMLOptionElement';
import IHTMLOptionsCollection from './IHTMLOptionsCollection';
import INode from '../node/INode';
import IAttr from '../attr/IAttr';
/**
 * HTML Select Element.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement.
 */
export default class HTMLSelectElement extends HTMLElement implements IHTMLSelectElement {
    readonly length = 0;
    readonly options: IHTMLOptionsCollection;
    readonly validationMessage = "";
    readonly validity: any;
    _selectNode: INode;
    onchange: (event: Event) => void | null;
    oninput: (event: Event) => void | null;
    /**
     * Returns name.
     *
     * @returns Name.
     */
    get name(): string;
    /**
     * Sets name.
     *
     * @param name Name.
     */
    set name(name: string);
    /**
     * Returns disabled.
     *
     * @returns Disabled.
     */
    get disabled(): boolean;
    /**
     * Sets disabled.
     *
     * @param disabled Disabled.
     */
    set disabled(disabled: boolean);
    /**
     * Returns multiple.
     *
     * @returns Multiple.
     */
    get multiple(): boolean;
    /**
     * Sets multiple.
     *
     * @param multiple Multiple.
     */
    set multiple(multiple: boolean);
    /**
     * Returns autofocus.
     *
     * @returns Autofocus.
     */
    get autofocus(): boolean;
    /**
     * Sets autofocus.
     *
     * @param autofocus Autofocus.
     */
    set autofocus(autofocus: boolean);
    /**
     * Returns required.
     *
     * @returns Required.
     */
    get required(): boolean;
    /**
     * Sets required.
     *
     * @param required Required.
     */
    set required(required: boolean);
    /**
     * Returns type.
     *
     * @returns type.
     */
    get type(): string;
    /**
     * Returns value.
     *
     * @returns Value.
     */
    get value(): string;
    /**
     * Sets value.
     *
     * @param value Value.
     */
    set value(value: string);
    /**
     * Returns value.
     *
     * @returns Value.
     */
    get selectedIndex(): number;
    /**
     * Sets value.
     *
     * @param selectedIndex Selected index.
     */
    set selectedIndex(selectedIndex: number);
    /**
     * Returns the associated label elements.
     *
     * @returns Label elements.
     */
    get labels(): INodeList<IHTMLLabelElement>;
    /**
     * Returns the parent form element.
     *
     * @returns Form.
     */
    get form(): IHTMLFormElement;
    /**
     * Returns "true" if it will validate.
     *
     * @returns "true" if it will validate.
     */
    get willValidate(): boolean;
    /**
     * Returns item from options collection by index.
     *
     * @param index Index.
     */
    item(index: number): IHTMLOptionElement;
    /**
     * Adds new option to options collection.
     *
     * @param element HTMLOptionElement to add.
     * @param before HTMLOptionElement or index number.
     */
    add(element: IHTMLOptionElement, before?: number | IHTMLOptionElement): void;
    /**
     * Removes indexed element from collection or the select element.
     *
     * @param [index] Index.
     */
    remove(index?: number): void;
    /**
     * Sets validation message.
     *
     * @param message Message.
     */
    setCustomValidity(message: string): void;
    /**
     * Checks validity.
     *
     * @returns "true" if the field is valid.
     */
    checkValidity(): boolean;
    /**
     * Reports validity.
     *
     * @returns "true" if the field is valid.
     */
    reportValidity(): boolean;
    /**
     * Updates option item.
     *
     * Based on:
     * https://github.com/jsdom/jsdom/blob/master/lib/jsdom/living/nodes/HTMLSelectElement-impl.js
     *
     * @see https://html.spec.whatwg.org/multipage/form-elements.html#selectedness-setting-algorithm
     * @param [selectedOption] Selected option.
     */
    _updateOptionItems(selectedOption?: IHTMLOptionElement): void;
    /**
     * @override
     */
    setAttributeNode(attribute: IAttr): IAttr;
    /**
     * @override
     */
    removeAttributeNode(attribute: IAttr): IAttr;
    /**
     * @override
     */
    _connectToNode(parentNode?: INode): void;
    /**
     * Returns display size.
     *
     * @returns Display size.
     */
    protected _getDisplaySize(): number;
}
//# sourceMappingURL=HTMLSelectElement.d.ts.map