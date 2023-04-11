"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Blob_1 = __importDefault(require("../file/Blob"));
const File_1 = __importDefault(require("../file/File"));
const RadioNodeList_1 = __importDefault(require("../nodes/html-form-element/RadioNodeList"));
const SUBMITTABLE_ELEMENTS = ['BUTTON', 'INPUT', 'OBJECT', 'SELECT', 'TEXTAREA'];
/**
 * FormData.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/FormData
 */
class FormData {
    /**
     * Constructor.
     *
     * @param [form] Form.
     */
    constructor(form) {
        this._entries = [];
        if (form) {
            for (const name of Object.keys(form.elements._namedItems)) {
                let radioNodeList = form.elements._namedItems[name];
                if (radioNodeList[0].tagName === 'INPUT' &&
                    (radioNodeList[0].type === 'checkbox' || radioNodeList[0].type === 'radio')) {
                    const newRadioNodeList = new RadioNodeList_1.default();
                    for (const node of radioNodeList) {
                        if (node.checked) {
                            newRadioNodeList.push(node);
                            break;
                        }
                    }
                    radioNodeList = newRadioNodeList;
                }
                for (const node of radioNodeList) {
                    if (node.name && SUBMITTABLE_ELEMENTS.includes(node.tagName)) {
                        if (node.tagName === 'INPUT' && node.type === 'file') {
                            if (node.files.length === 0) {
                                this.append(node.name, new File_1.default([], '', { type: 'application/octet-stream' }));
                            }
                            else {
                                for (const file of node.files) {
                                    this.append(node.name, file);
                                }
                            }
                        }
                        else {
                            this.append(node.name, node.value);
                        }
                    }
                }
            }
        }
    }
    /**
     * For each.
     *
     * @param callback Callback.
     */
    forEach(callback) {
        for (const entry of this._entries) {
            callback.call(this, entry.name, entry.value, this);
        }
    }
    /**
     * Appends a new value onto an existing key.
     *
     * @param name Name.
     * @param value Value.
     * @param [filename] Filename.
     */
    append(name, value, filename) {
        this._entries.push({
            name,
            value: this._parseValue(value, filename)
        });
    }
    /**
     * Removes a value.
     *
     * @param name Name.
     */
    delete(name) {
        const newEntries = [];
        for (const entry of this._entries) {
            if (entry.name !== name) {
                newEntries.push(entry);
            }
        }
        this._entries = newEntries;
    }
    /**
     * Returns value.
     *
     * @param name Name.
     * @returns Value.
     */
    get(name) {
        for (const entry of this._entries) {
            if (entry.name === name) {
                return entry.value;
            }
        }
        return null;
    }
    /**
     * Returns all values associated with the given name.
     *
     * @param name Name.
     * @returns Values.
     */
    getAll(name) {
        const values = [];
        for (const entry of this._entries) {
            if (entry.name === name) {
                values.push(entry.value);
            }
        }
        return values;
    }
    /**
     * Returns whether a FormData object contains a certain key.
     *
     * @param name Name.
     * @returns "true" if the FormData object contains the key.
     */
    has(name) {
        for (const entry of this._entries) {
            if (entry.name === name) {
                return true;
            }
        }
        return false;
    }
    /**
     * Sets a new value for an existing key inside a FormData object, or adds the key/value if it does not already exist.
     *
     * @param name Name.
     * @param value Value.
     * @param [filename] Filename.
     */
    set(name, value, filename) {
        for (const entry of this._entries) {
            if (entry.name === name) {
                entry.value = this._parseValue(value, filename);
                return;
            }
        }
        this.append(name, value);
    }
    /**
     * Returns an iterator, allowing you to go through all keys of the key/value pairs contained in this object.
     *
     * @returns Iterator.
     */
    *keys() {
        for (const entry of this._entries) {
            yield entry.name;
        }
    }
    /**
     * Returns an iterator, allowing you to go through all values of the key/value pairs contained in this object.
     *
     * @returns Iterator.
     */
    *values() {
        for (const entry of this._entries) {
            yield entry.value;
        }
    }
    /**
     * Returns an iterator, allowing you to go through all key/value pairs contained in this object.
     *
     * @returns Iterator.
     */
    *entries() {
        for (const entry of this._entries) {
            yield [entry.name, entry.value];
        }
    }
    /**
     * Iterator.
     *
     * @returns Iterator.
     */
    *[Symbol.iterator]() {
        for (const entry of this._entries) {
            yield [entry.name, entry.value];
        }
    }
    /**
     * Parses a value.
     *
     * @param value Value.
     * @param [filename] Filename.
     * @returns Parsed value.
     */
    _parseValue(value, filename) {
        if (value instanceof Blob_1.default && !(value instanceof File_1.default)) {
            const file = new File_1.default([], 'blob', { type: value.type });
            file._buffer = value._buffer;
            return file;
        }
        if (value instanceof File_1.default) {
            if (filename) {
                const file = new File_1.default([], filename, { type: value.type, lastModified: value.lastModified });
                file._buffer = value._buffer;
                return file;
            }
            return value;
        }
        return String(value);
    }
}
exports.default = FormData;
//# sourceMappingURL=FormData.js.map