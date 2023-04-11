import Event from '../../event/Event';
import IAttr from '../attr/IAttr';
import HTMLElement from '../html-element/HTMLElement';
import IHTMLFormElement from '../html-form-element/IHTMLFormElement';
import HTMLInputElementSelectionDirectionEnum from '../html-input-element/HTMLInputElementSelectionDirectionEnum';
import HTMLInputElementSelectionModeEnum from '../html-input-element/HTMLInputElementSelectionModeEnum';
import INode from '../node/INode';
import IHTMLTextAreaElement from './IHTMLTextAreaElement';
import INodeList from '../node/INodeList';
import IHTMLLabelElement from '../html-label-element/IHTMLLabelElement';
/**
 * HTML Text Area Element.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement.
 */
export default class HTMLTextAreaElement extends HTMLElement implements IHTMLTextAreaElement {
    readonly type = "textarea";
    readonly validationMessage = "";
    readonly validity: any;
    oninput: (event: Event) => void | null;
    onselectionchange: (event: Event) => void | null;
    _value: any;
    _selectionStart: any;
    _selectionEnd: any;
    _selectionDirection: HTMLInputElementSelectionDirectionEnum;
    _textAreaNode: HTMLTextAreaElement;
    /**
     * Returns the default value.
     *
     * @returns Default value.
     */
    get defaultValue(): string;
    /**
     * Sets the default value.
     *
     * @param defaultValue Default value.
     */
    set defaultValue(defaultValue: string);
    /**
     * Returns minlength.
     *
     * @returns Min length.
     */
    get minLength(): number;
    /**
     * Sets minlength.
     *
     * @param minLength Min length.
     */
    set minLength(minlength: number);
    /**
     * Returns maxlength.
     *
     * @returns Max length.
     */
    get maxLength(): number;
    /**
     * Sets maxlength.
     *
     * @param maxlength Max length.
     */
    set maxLength(maxLength: number);
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
     * Returns placeholder.
     *
     * @returns Placeholder.
     */
    get placeholder(): string;
    /**
     * Sets placeholder.
     *
     * @param placeholder Placeholder.
     */
    set placeholder(placeholder: string);
    /**
     * Returns inputmode.
     *
     * @returns Inputmode.
     */
    get inputmode(): string;
    /**
     * Sets inputmode.
     *
     * @param inputmode Inputmode.
     */
    set inputmode(inputmode: string);
    /**
     * Returns cols.
     *
     * @returns Cols.
     */
    get cols(): string;
    /**
     * Sets cols.
     *
     * @param cols Cols.
     */
    set cols(cols: string);
    /**
     * Returns rows.
     *
     * @returns Rows.
     */
    get rows(): string;
    /**
     * Sets rows.
     *
     * @param rows Rows.
     */
    set rows(rows: string);
    /**
     * Returns autocomplete.
     *
     * @returns Autocomplete.
     */
    get autocomplete(): string;
    /**
     * Sets autocomplete.
     *
     * @param autocomplete Autocomplete.
     */
    set autocomplete(autocomplete: string);
    /**
     * Returns readOnly.
     *
     * @returns ReadOnly.
     */
    get readOnly(): boolean;
    /**
     * Sets readOnly.
     *
     * @param readOnly ReadOnly.
     */
    set readOnly(readOnly: boolean);
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
     * Returns selection start.
     *
     * @returns Selection start.
     */
    get selectionStart(): number;
    /**
     * Sets selection start.
     *
     * @param start Start.
     */
    set selectionStart(start: number);
    /**
     * Returns selection end.
     *
     * @returns Selection end.
     */
    get selectionEnd(): number;
    /**
     * Sets selection end.
     *
     * @param end End.
     */
    set selectionEnd(end: number);
    /**
     * Returns selection direction.
     *
     * @returns Selection direction.
     */
    get selectionDirection(): string;
    /**
     * Sets selection direction.
     *
     * @param direction Direction.
     */
    set selectionDirection(direction: string);
    /**
     * Returns the parent form element.
     *
     * @returns Form.
     */
    get form(): IHTMLFormElement;
    /**
     * Returns text length.
     *
     * @param Text Length.
     */
    get textLength(): number;
    /**
     * Returns the associated label elements.
     *
     * @returns Label elements.
     */
    get labels(): INodeList<IHTMLLabelElement>;
    /**
     * Selects the text.
     */
    select(): void;
    /**
     * Set selection range.
     *
     * @param start Start.
     * @param end End.
     * @param [direction="none"] Direction.
     */
    setSelectionRange(start: number, end: number, direction?: string): void;
    /**
     * Set range text.
     *
     * @param replacement Replacement.
     * @param [start] Start.
     * @param [end] End.
     * @param [direction] Direction.
     * @param selectionMode
     */
    setRangeText(replacement: string, start?: number, end?: number, selectionMode?: HTMLInputElementSelectionModeEnum): void;
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
     * Clones a node.
     *
     * @override
     * @param [deep=false] "true" to clone deep.
     * @returns Cloned node.
     */
    cloneNode(deep?: boolean): IHTMLTextAreaElement;
    /**
     * Resets selection.
     */
    _resetSelection(): void;
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
//# sourceMappingURL=HTMLTextAreaElement.d.ts.map