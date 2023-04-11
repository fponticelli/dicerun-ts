import Event from '../../event/Event';
import IAttr from '../attr/IAttr';
import HTMLElement from '../html-element/HTMLElement';
import IHTMLFormElement from '../html-form-element/IHTMLFormElement';
import IHTMLLabelElement from '../html-label-element/IHTMLLabelElement';
import INode from '../node/INode';
import INodeList from '../node/INodeList';
import IHTMLButtonElement from './IHTMLButtonElement';
/**
 * HTML Button Element.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement.
 */
export default class HTMLButtonElement extends HTMLElement implements IHTMLButtonElement {
    readonly validationMessage = "";
    readonly validity: any;
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
     * Returns type
     *
     * @returns Type
     */
    get type(): string;
    /**
     * Sets type
     *
     * @param v Type
     */
    set type(v: string);
    /**
     * Returns no validate.
     *
     * @returns No validate.
     */
    get formNoValidate(): boolean;
    /**
     * Sets no validate.
     *
     * @param formNoValidate No validate.
     */
    set formNoValidate(formNoValidate: boolean);
    /**
     * Returns the parent form element.
     *
     * @returns Form.
     */
    get form(): IHTMLFormElement;
    /**
     * Returns the associated label elements.
     *
     * @returns Label elements.
     */
    get labels(): INodeList<IHTMLLabelElement>;
    /**
     * Checks validity.
     *
     * @returns "true" if the field is valid.
     */
    checkValidity(): boolean;
    /**
     * Reports validity.
     *
     * @returns Validity.
     */
    reportValidity(): boolean;
    /**
     * Sets validation message.
     *
     * @param message Message.
     */
    setCustomValidity(message: string): void;
    /**
     * Sanitizes type.
     *
     * TODO: We can improve performance a bit if we make the types as a constant.
     *
     * @param type Type.
     * @returns Type sanitized.
     */
    protected _sanitizeType(type: string): string;
    /**
     * @override
     */
    dispatchEvent(event: Event): boolean;
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
}
//# sourceMappingURL=HTMLButtonElement.d.ts.map