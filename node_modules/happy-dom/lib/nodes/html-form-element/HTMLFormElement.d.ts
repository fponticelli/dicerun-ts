import HTMLElement from '../html-element/HTMLElement';
import IHTMLFormElement from './IHTMLFormElement';
import Event from '../../event/Event';
import IHTMLFormControlsCollection from './IHTMLFormControlsCollection';
import INode from '../node/INode';
import IHTMLInputElement from '../html-input-element/IHTMLInputElement';
import IHTMLTextAreaElement from '../html-text-area-element/IHTMLTextAreaElement';
import IHTMLSelectElement from '../html-select-element/IHTMLSelectElement';
import IHTMLButtonElement from '../html-button-element/IHTMLButtonElement';
/**
 * HTML Form Element.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement.
 */
export default class HTMLFormElement extends HTMLElement implements IHTMLFormElement {
    readonly elements: IHTMLFormControlsCollection;
    readonly length = 0;
    onformdata: (event: Event) => void | null;
    onreset: (event: Event) => void | null;
    onsubmit: (event: Event) => void | null;
    _formNode: INode;
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
     * Returns method.
     *
     * @returns Method.
     */
    get method(): string;
    /**
     * Sets method.
     *
     * @param method Method.
     */
    set method(method: string);
    /**
     * Returns target.
     *
     * @returns Target.
     */
    get target(): string;
    /**
     * Sets target.
     *
     * @param target Target.
     */
    set target(target: string);
    /**
     * Returns action.
     *
     * @returns Action.
     */
    get action(): string;
    /**
     * Sets action.
     *
     * @param action Action.
     */
    set action(action: string);
    /**
     * Returns encoding.
     *
     * @returns Encoding.
     */
    get encoding(): string;
    /**
     * Sets encoding.
     *
     * @param encoding Encoding.
     */
    set encoding(encoding: string);
    /**
     * Returns enctype.
     *
     * @returns Enctype.
     */
    get enctype(): string;
    /**
     * Sets enctype.
     *
     * @param enctype Enctype.
     */
    set enctype(enctype: string);
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
     * Returns accept charset.
     *
     * @returns Accept charset.
     */
    get acceptCharset(): string;
    /**
     * Sets accept charset.
     *
     * @param acceptCharset Accept charset.
     */
    set acceptCharset(acceptCharset: string);
    /**
     * Returns no validate.
     *
     * @returns No validate.
     */
    get noValidate(): boolean;
    /**
     * Sets no validate.
     *
     * @param noValidate No validate.
     */
    set noValidate(noValidate: boolean);
    /**
     * Submits form. No submit event is raised. In particular, the form's "submit" event handler is not run.
     *
     * In Happy DOM this means that nothing happens.
     */
    submit(): void;
    /**
     * Submits form, reports validity and raises submit event.
     *
     * @param [submitter] Submitter.
     */
    requestSubmit(submitter?: IHTMLInputElement | IHTMLButtonElement): void;
    /**
     * Resets form.
     */
    reset(): void;
    /**
     * Checks validity.
     *
     * @returns "true" if validation does'nt fail.
     */
    checkValidity(): boolean;
    /**
     * Reports validity.
     *
     * @returns "true" if validation does'nt fail.
     */
    reportValidity(): boolean;
    /**
     * Clones a node.
     *
     * @override
     * @param [deep=false] "true" to clone deep.
     * @returns Cloned node.
     */
    cloneNode(deep?: boolean): IHTMLFormElement;
    /**
     * Appends a form control item.
     *
     * @param node Node.
     * @param name Name
     */
    _appendFormControlItem(node: IHTMLInputElement | IHTMLTextAreaElement | IHTMLSelectElement | IHTMLButtonElement, name: string): void;
    /**
     * Remove a form control item.
     *
     * @param node Node.
     * @param name Name.
     */
    _removeFormControlItem(node: IHTMLInputElement | IHTMLTextAreaElement | IHTMLSelectElement | IHTMLButtonElement, name: string): void;
}
//# sourceMappingURL=HTMLFormElement.d.ts.map