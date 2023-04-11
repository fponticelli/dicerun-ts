"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HTMLElement_1 = __importDefault(require("../html-element/HTMLElement"));
const ValidityState_1 = __importDefault(require("../../validity-state/ValidityState"));
const HTMLOptionsCollection_1 = __importDefault(require("./HTMLOptionsCollection"));
const Event_1 = __importDefault(require("../../event/Event"));
const NodeTypeEnum_1 = __importDefault(require("../node/NodeTypeEnum"));
const NodeList_1 = __importDefault(require("../node/NodeList"));
/**
 * HTML Select Element.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement.
 */
class HTMLSelectElement extends HTMLElement_1.default {
    constructor() {
        super(...arguments);
        // Public properties.
        this.length = 0;
        this.options = new HTMLOptionsCollection_1.default(this);
        this.validationMessage = '';
        this.validity = new ValidityState_1.default(this);
        // Private properties
        this._selectNode = this;
        // Events
        this.onchange = null;
        this.oninput = null;
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
     * Returns multiple.
     *
     * @returns Multiple.
     */
    get multiple() {
        return this.getAttribute('multiple') !== null;
    }
    /**
     * Sets multiple.
     *
     * @param multiple Multiple.
     */
    set multiple(multiple) {
        if (!multiple) {
            this.removeAttribute('multiple');
        }
        else {
            this.setAttribute('multiple', '');
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
     * Returns type.
     *
     * @returns type.
     */
    get type() {
        return this.hasAttributeNS(null, 'multiple') ? 'select-multiple' : 'select-one';
    }
    /**
     * Returns value.
     *
     * @returns Value.
     */
    get value() {
        for (let i = 0, max = this.options.length; i < max; i++) {
            const option = this.options[i];
            if (option._selectedness) {
                return option.value;
            }
        }
        return '';
    }
    /**
     * Sets value.
     *
     * @param value Value.
     */
    set value(value) {
        for (let i = 0, max = this.options.length; i < max; i++) {
            const option = this.options[i];
            if (option.value === value) {
                option._selectedness = true;
                option._dirtyness = true;
            }
            else {
                option._selectedness = false;
            }
        }
    }
    /**
     * Returns value.
     *
     * @returns Value.
     */
    get selectedIndex() {
        for (let i = 0, max = this.options.length; i < max; i++) {
            if (this.options[i]._selectedness) {
                return i;
            }
        }
        return -1;
    }
    /**
     * Sets value.
     *
     * @param selectedIndex Selected index.
     */
    set selectedIndex(selectedIndex) {
        if (typeof selectedIndex === 'number' && !isNaN(selectedIndex)) {
            for (let i = 0, max = this.options.length; i < max; i++) {
                this.options[i]._selectedness = false;
            }
            const selectedOption = this.options[selectedIndex];
            if (selectedOption) {
                selectedOption._selectedness = true;
                selectedOption._dirtyness = true;
            }
        }
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
     * Returns the parent form element.
     *
     * @returns Form.
     */
    get form() {
        return this._formNode;
    }
    /**
     * Returns "true" if it will validate.
     *
     * @returns "true" if it will validate.
     */
    get willValidate() {
        return (this.type !== 'hidden' &&
            this.type !== 'reset' &&
            this.type !== 'button' &&
            !this.disabled &&
            !this['readOnly']);
    }
    /**
     * Returns item from options collection by index.
     *
     * @param index Index.
     */
    item(index) {
        return this.options.item(index);
    }
    /**
     * Adds new option to options collection.
     *
     * @param element HTMLOptionElement to add.
     * @param before HTMLOptionElement or index number.
     */
    add(element, before) {
        this.options.add(element, before);
    }
    /**
     * Removes indexed element from collection or the select element.
     *
     * @param [index] Index.
     */
    remove(index) {
        if (typeof index === 'number') {
            this.options.remove(index);
        }
        else {
            super.remove();
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
        const valid = this.disabled || this.validity.valid;
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
     * Updates option item.
     *
     * Based on:
     * https://github.com/jsdom/jsdom/blob/master/lib/jsdom/living/nodes/HTMLSelectElement-impl.js
     *
     * @see https://html.spec.whatwg.org/multipage/form-elements.html#selectedness-setting-algorithm
     * @param [selectedOption] Selected option.
     */
    _updateOptionItems(selectedOption) {
        const optionElements = this.getElementsByTagName('option');
        if (optionElements.length < this.options.length) {
            this.options.splice(this.options.length - 1, this.options.length - optionElements.length);
            for (let i = optionElements.length - 1, max = this.length; i < max; i++) {
                delete this[i];
            }
        }
        const isMultiple = this.hasAttributeNS(null, 'multiple');
        const selected = [];
        for (let i = 0; i < optionElements.length; i++) {
            this.options[i] = optionElements[i];
            this[i] = optionElements[i];
            if (!isMultiple) {
                if (selectedOption) {
                    optionElements[i]._selectedness =
                        optionElements[i] === selectedOption;
                }
                if (optionElements[i]._selectedness) {
                    selected.push(optionElements[i]);
                }
            }
        }
        this.length = optionElements.length;
        const size = this._getDisplaySize();
        if (size === 1 && !selected.length) {
            for (let i = 0, max = optionElements.length; i < max; i++) {
                const option = optionElements[i];
                let disabled = option.hasAttributeNS(null, 'disabled');
                const parentNode = option.parentNode;
                if (parentNode &&
                    parentNode.nodeType === NodeTypeEnum_1.default.elementNode &&
                    parentNode.tagName === 'OPTGROUP' &&
                    parentNode.hasAttributeNS(null, 'disabled')) {
                    disabled = true;
                }
                if (!disabled) {
                    option._selectedness = true;
                    break;
                }
            }
        }
        else if (selected.length >= 2) {
            for (let i = 0, max = optionElements.length; i < max; i++) {
                optionElements[i]._selectedness = i === selected.length - 1;
            }
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
    /**
     * Returns display size.
     *
     * @returns Display size.
     */
    _getDisplaySize() {
        if (this.hasAttributeNS(null, 'size')) {
            const size = parseInt(this.getAttribute('size'));
            if (!isNaN(size) && size >= 0) {
                return size;
            }
        }
        return this.hasAttributeNS(null, 'multiple') ? 4 : 1;
    }
}
exports.default = HTMLSelectElement;
//# sourceMappingURL=HTMLSelectElement.js.map