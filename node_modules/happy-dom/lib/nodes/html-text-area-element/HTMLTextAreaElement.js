"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(require("../../event/Event"));
const DOMException_1 = __importDefault(require("../../exception/DOMException"));
const DOMExceptionNameEnum_1 = __importDefault(require("../../exception/DOMExceptionNameEnum"));
const HTMLElement_1 = __importDefault(require("../html-element/HTMLElement"));
const HTMLInputElementSelectionDirectionEnum_1 = __importDefault(require("../html-input-element/HTMLInputElementSelectionDirectionEnum"));
const HTMLInputElementSelectionModeEnum_1 = __importDefault(require("../html-input-element/HTMLInputElementSelectionModeEnum"));
const ValidityState_1 = __importDefault(require("../../validity-state/ValidityState"));
const NodeList_1 = __importDefault(require("../node/NodeList"));
/**
 * HTML Text Area Element.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement.
 */
class HTMLTextAreaElement extends HTMLElement_1.default {
    constructor() {
        super(...arguments);
        this.type = 'textarea';
        this.validationMessage = '';
        this.validity = new ValidityState_1.default(this);
        // Events
        this.oninput = null;
        this.onselectionchange = null;
        this._value = null;
        this._selectionStart = null;
        this._selectionEnd = null;
        this._selectionDirection = HTMLInputElementSelectionDirectionEnum_1.default.none;
        this._textAreaNode = this;
    }
    /**
     * Returns the default value.
     *
     * @returns Default value.
     */
    get defaultValue() {
        return this.textContent;
    }
    /**
     * Sets the default value.
     *
     * @param defaultValue Default value.
     */
    set defaultValue(defaultValue) {
        this.textContent = defaultValue;
    }
    /**
     * Returns minlength.
     *
     * @returns Min length.
     */
    get minLength() {
        const minLength = this.getAttribute('minlength');
        if (minLength !== null) {
            return parseInt(minLength);
        }
        return -1;
    }
    /**
     * Sets minlength.
     *
     * @param minLength Min length.
     */
    set minLength(minlength) {
        this.setAttribute('minlength', String(minlength));
    }
    /**
     * Returns maxlength.
     *
     * @returns Max length.
     */
    get maxLength() {
        const maxLength = this.getAttribute('maxlength');
        if (maxLength !== null) {
            return parseInt(maxLength);
        }
        return -1;
    }
    /**
     * Sets maxlength.
     *
     * @param maxlength Max length.
     */
    set maxLength(maxLength) {
        this.setAttribute('maxlength', String(maxLength));
    }
    /**
     * Returns name.
     *
     * @returns Name.
     */
    get name() {
        return this.getAttribute('name') || '';
    }
    /**
     * Sets name.
     *
     * @param name Name.
     */
    set name(name) {
        this.setAttribute('name', name);
    }
    /**
     * Returns placeholder.
     *
     * @returns Placeholder.
     */
    get placeholder() {
        return this.getAttribute('placeholder') || '';
    }
    /**
     * Sets placeholder.
     *
     * @param placeholder Placeholder.
     */
    set placeholder(placeholder) {
        this.setAttribute('placeholder', placeholder);
    }
    /**
     * Returns inputmode.
     *
     * @returns Inputmode.
     */
    get inputmode() {
        return this.getAttribute('inputmode') || '';
    }
    /**
     * Sets inputmode.
     *
     * @param inputmode Inputmode.
     */
    set inputmode(inputmode) {
        this.setAttribute('inputmode', inputmode);
    }
    /**
     * Returns cols.
     *
     * @returns Cols.
     */
    get cols() {
        return this.getAttribute('cols') || '';
    }
    /**
     * Sets cols.
     *
     * @param cols Cols.
     */
    set cols(cols) {
        this.setAttribute('cols', cols);
    }
    /**
     * Returns rows.
     *
     * @returns Rows.
     */
    get rows() {
        return this.getAttribute('rows') || '';
    }
    /**
     * Sets rows.
     *
     * @param rows Rows.
     */
    set rows(rows) {
        this.setAttribute('rows', rows);
    }
    /**
     * Returns autocomplete.
     *
     * @returns Autocomplete.
     */
    get autocomplete() {
        return this.getAttribute('autocomplete') || '';
    }
    /**
     * Sets autocomplete.
     *
     * @param autocomplete Autocomplete.
     */
    set autocomplete(autocomplete) {
        this.setAttribute('autocomplete', autocomplete);
    }
    /**
     * Returns readOnly.
     *
     * @returns ReadOnly.
     */
    get readOnly() {
        return this.getAttribute('readonly') !== null;
    }
    /**
     * Sets readOnly.
     *
     * @param readOnly ReadOnly.
     */
    set readOnly(readOnly) {
        if (!readOnly) {
            this.removeAttribute('readonly');
        }
        else {
            this.setAttribute('readonly', '');
        }
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
    /**
     * Returns autofocus.
     *
     * @returns Autofocus.
     */
    get autofocus() {
        return this.getAttribute('autofocus') !== null;
    }
    /**
     * Sets autofocus.
     *
     * @param autofocus Autofocus.
     */
    set autofocus(autofocus) {
        if (!autofocus) {
            this.removeAttribute('autofocus');
        }
        else {
            this.setAttribute('autofocus', '');
        }
    }
    /**
     * Returns required.
     *
     * @returns Required.
     */
    get required() {
        return this.getAttribute('required') !== null;
    }
    /**
     * Sets required.
     *
     * @param required Required.
     */
    set required(required) {
        if (!required) {
            this.removeAttribute('required');
        }
        else {
            this.setAttribute('required', '');
        }
    }
    /**
     * Returns value.
     *
     * @returns Value.
     */
    get value() {
        if (this._value === null) {
            return this.textContent;
        }
        return this._value;
    }
    /**
     * Sets value.
     *
     * @param value Value.
     */
    set value(value) {
        const oldValue = this._value;
        this._value = value;
        if (oldValue !== this._value) {
            this._selectionStart = this._value.length;
            this._selectionEnd = this._value.length;
            this._selectionDirection = HTMLInputElementSelectionDirectionEnum_1.default.none;
        }
    }
    /**
     * Returns selection start.
     *
     * @returns Selection start.
     */
    get selectionStart() {
        if (this._selectionStart === null) {
            return this.value.length;
        }
        return this._selectionStart;
    }
    /**
     * Sets selection start.
     *
     * @param start Start.
     */
    set selectionStart(start) {
        this.setSelectionRange(start, Math.max(start, this.selectionEnd), this._selectionDirection);
    }
    /**
     * Returns selection end.
     *
     * @returns Selection end.
     */
    get selectionEnd() {
        if (this._selectionEnd === null) {
            return this.value.length;
        }
        return this._selectionEnd;
    }
    /**
     * Sets selection end.
     *
     * @param end End.
     */
    set selectionEnd(end) {
        this.setSelectionRange(this.selectionStart, end, this._selectionDirection);
    }
    /**
     * Returns selection direction.
     *
     * @returns Selection direction.
     */
    get selectionDirection() {
        return this._selectionDirection;
    }
    /**
     * Sets selection direction.
     *
     * @param direction Direction.
     */
    set selectionDirection(direction) {
        this.setSelectionRange(this.selectionStart, this.selectionEnd, direction);
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
     * Returns text length.
     *
     * @param Text Length.
     */
    get textLength() {
        return this.value.length;
    }
    /**
     * Returns the associated label elements.
     *
     * @returns Label elements.
     */
    get labels() {
        const id = this.id;
        if (id) {
            const rootNode = this.getRootNode();
            const labels = rootNode.querySelectorAll(`label[for="${id}"]`);
            let parent = this.parentNode;
            while (parent) {
                if (parent['tagName'] === 'LABEL') {
                    labels.push(parent);
                    break;
                }
                parent = parent.parentNode;
            }
            return labels;
        }
        return new NodeList_1.default();
    }
    /**
     * Selects the text.
     */
    select() {
        this._selectionStart = 0;
        this._selectionEnd = this.value.length;
        this._selectionDirection = HTMLInputElementSelectionDirectionEnum_1.default.none;
        this.dispatchEvent(new Event_1.default('select', { bubbles: true, cancelable: true }));
    }
    /**
     * Set selection range.
     *
     * @param start Start.
     * @param end End.
     * @param [direction="none"] Direction.
     */
    setSelectionRange(start, end, direction = 'none') {
        this._selectionEnd = Math.min(end, this.value.length);
        this._selectionStart = Math.min(start, this.selectionEnd);
        this._selectionDirection =
            direction === HTMLInputElementSelectionDirectionEnum_1.default.forward ||
                direction === HTMLInputElementSelectionDirectionEnum_1.default.backward
                ? direction
                : HTMLInputElementSelectionDirectionEnum_1.default.none;
        this.dispatchEvent(new Event_1.default('select', { bubbles: true, cancelable: true }));
    }
    /**
     * Set range text.
     *
     * @param replacement Replacement.
     * @param [start] Start.
     * @param [end] End.
     * @param [direction] Direction.
     * @param selectionMode
     */
    setRangeText(replacement, start = null, end = null, selectionMode = HTMLInputElementSelectionModeEnum_1.default.preserve) {
        if (start === null) {
            start = this._selectionStart;
        }
        if (end === null) {
            end = this._selectionEnd;
        }
        if (start > end) {
            throw new DOMException_1.default('The index is not in the allowed range.', DOMExceptionNameEnum_1.default.invalidStateError);
        }
        start = Math.min(start, this.value.length);
        end = Math.min(end, this.value.length);
        const val = this.value;
        let selectionStart = this._selectionStart;
        let selectionEnd = this._selectionEnd;
        this.value = val.slice(0, start) + replacement + val.slice(end);
        const newEnd = start + this.value.length;
        switch (selectionMode) {
            case HTMLInputElementSelectionModeEnum_1.default.select:
                this.setSelectionRange(start, newEnd);
                break;
            case HTMLInputElementSelectionModeEnum_1.default.start:
                this.setSelectionRange(start, start);
                break;
            case HTMLInputElementSelectionModeEnum_1.default.end:
                this.setSelectionRange(newEnd, newEnd);
                break;
            default:
                const delta = replacement.length - (end - start);
                if (selectionStart > end) {
                    selectionStart += delta;
                }
                else if (selectionStart > start) {
                    selectionStart = start;
                }
                if (selectionEnd > end) {
                    selectionEnd += delta;
                }
                else if (selectionEnd > start) {
                    selectionEnd = newEnd;
                }
                this.setSelectionRange(selectionStart, selectionEnd);
                break;
        }
    }
    /**
     * Sets validation message.
     *
     * @param message Message.
     */
    setCustomValidity(message) {
        this.validationMessage = String(message);
    }
    /**
     * Checks validity.
     *
     * @returns "true" if the field is valid.
     */
    checkValidity() {
        const valid = this.disabled || this.readOnly || this.validity.valid;
        if (!valid) {
            this.dispatchEvent(new Event_1.default('invalid', { bubbles: true, cancelable: true }));
        }
        return valid;
    }
    /**
     * Reports validity.
     *
     * @returns "true" if the field is valid.
     */
    reportValidity() {
        return this.checkValidity();
    }
    /**
     * Clones a node.
     *
     * @override
     * @param [deep=false] "true" to clone deep.
     * @returns Cloned node.
     */
    cloneNode(deep = false) {
        const clone = super.cloneNode(deep);
        clone._value = this._value;
        clone._selectionStart = this._selectionStart;
        clone._selectionEnd = this._selectionEnd;
        clone._selectionDirection = this._selectionDirection;
        return clone;
    }
    /**
     * Resets selection.
     */
    _resetSelection() {
        if (this._value === null) {
            this._selectionStart = null;
            this._selectionEnd = null;
            this._selectionDirection = HTMLInputElementSelectionDirectionEnum_1.default.none;
        }
    }
    /**
     * @override
     */
    setAttributeNode(attribute) {
        const replacedAttribute = super.setAttributeNode(attribute);
        const oldValue = replacedAttribute ? replacedAttribute.value : null;
        if ((attribute.name === 'id' || attribute.name === 'name') && this._formNode) {
            if (oldValue) {
                this._formNode._removeFormControlItem(this, oldValue);
            }
            if (attribute.value) {
                this._formNode._appendFormControlItem(this, attribute.value);
            }
        }
        return replacedAttribute;
    }
    /**
     * @override
     */
    removeAttributeNode(attribute) {
        super.removeAttributeNode(attribute);
        if ((attribute.name === 'id' || attribute.name === 'name') && this._formNode) {
            this._formNode._removeFormControlItem(this, attribute.value);
        }
        return attribute;
    }
    /**
     * @override
     */
    _connectToNode(parentNode = null) {
        const oldFormNode = this._formNode;
        super._connectToNode(parentNode);
        if (oldFormNode !== this._formNode) {
            if (oldFormNode) {
                oldFormNode._removeFormControlItem(this, this.name);
                oldFormNode._removeFormControlItem(this, this.id);
            }
            if (this._formNode) {
                this._formNode._appendFormControlItem(this, this.name);
                this._formNode._appendFormControlItem(this, this.id);
            }
        }
    }
}
exports.default = HTMLTextAreaElement;
//# sourceMappingURL=HTMLTextAreaElement.js.map