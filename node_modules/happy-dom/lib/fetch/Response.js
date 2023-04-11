"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Headers_1 = __importDefault(require("./Headers"));
const url_1 = require("url");
const Blob_1 = __importDefault(require("../file/Blob"));
const FormData_1 = __importDefault(require("../form-data/FormData"));
const FetchBodyUtility_1 = __importDefault(require("./utilities/FetchBodyUtility"));
const DOMException_1 = __importDefault(require("../exception/DOMException"));
const DOMExceptionNameEnum_1 = __importDefault(require("../exception/DOMExceptionNameEnum"));
const util_1 = require("util");
const MultipartFormDataParser_1 = __importDefault(require("./multipart/MultipartFormDataParser"));
const REDIRECT_STATUS_CODES = [301, 302, 303, 307, 308];
/**
 * Fetch response.
 *
 * Based on:
 * https://github.com/node-fetch/node-fetch/blob/main/src/response.js (MIT)
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Response/Response
 */
class Response {
    /**
     * Constructor.
     *
     * @param input Input.
     * @param body
     * @param [init] Init.
     */
    constructor(body, init) {
        this._ownerDocument = null;
        // Public properties
        this.body = null;
        this.bodyUsed = false;
        this.redirected = false;
        this.type = 'basic';
        this.url = '';
        this._ownerDocument = this.constructor._ownerDocument;
        this.status = init?.status !== undefined ? init.status : 200;
        this.statusText = init?.statusText || '';
        this.ok = this.status >= 200 && this.status < 300;
        this.headers = new Headers_1.default(init?.headers);
        if (body) {
            const { stream, contentType } = FetchBodyUtility_1.default.getBodyStream(body);
            this.body = stream;
            if (contentType && !this.headers.has('Content-Type')) {
                this.headers.set('Content-Type', contentType);
            }
        }
    }
    /**
     * Returns string tag.
     *
     * @returns String tag.
     */
    get [Symbol.toStringTag]() {
        return 'Response';
    }
    /**
     * Returns array buffer.
     *
     * @returns Array buffer.
     */
    async arrayBuffer() {
        if (this.bodyUsed) {
            throw new DOMException_1.default(`Body has already been used for "${this.url}".`, DOMExceptionNameEnum_1.default.invalidStateError);
        }
        this.bodyUsed = true;
        const taskManager = this._ownerDocument.defaultView.happyDOM.asyncTaskManager;
        const taskID = taskManager.startTask();
        let buffer;
        try {
            buffer = await FetchBodyUtility_1.default.consumeBodyStream(this.body);
        }
        catch (error) {
            taskManager.endTask(taskID);
            throw error;
        }
        taskManager.endTask(taskID);
        return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
    }
    /**
     * Returns blob.
     *
     * @returns Blob.
     */
    async blob() {
        const type = this.headers.get('content-type') || '';
        const buffer = await this.arrayBuffer();
        return new Blob_1.default([buffer], { type });
    }
    /**
     * Returns buffer.
     *
     * @returns Buffer.
     */
    async buffer() {
        if (this.bodyUsed) {
            throw new DOMException_1.default(`Body has already been used for "${this.url}".`, DOMExceptionNameEnum_1.default.invalidStateError);
        }
        this.bodyUsed = true;
        const taskManager = this._ownerDocument.defaultView.happyDOM.asyncTaskManager;
        const taskID = taskManager.startTask();
        let buffer;
        try {
            buffer = await FetchBodyUtility_1.default.consumeBodyStream(this.body);
        }
        catch (error) {
            taskManager.endTask(taskID);
            throw error;
        }
        taskManager.endTask(taskID);
        return buffer;
    }
    /**
     * Returns text.
     *
     * @returns Text.
     */
    async text() {
        if (this.bodyUsed) {
            throw new DOMException_1.default(`Body has already been used for "${this.url}".`, DOMExceptionNameEnum_1.default.invalidStateError);
        }
        this.bodyUsed = true;
        const taskManager = this._ownerDocument.defaultView.happyDOM.asyncTaskManager;
        const taskID = taskManager.startTask();
        let buffer;
        try {
            buffer = await FetchBodyUtility_1.default.consumeBodyStream(this.body);
        }
        catch (error) {
            taskManager.endTask(taskID);
            throw error;
        }
        taskManager.endTask(taskID);
        return new util_1.TextDecoder().decode(buffer);
    }
    /**
     * Returns json.
     *
     * @returns JSON.
     */
    async json() {
        const text = await this.text();
        return JSON.parse(text);
    }
    /**
     * Returns form data.
     *
     * @returns Form data.
     */
    async formData() {
        const contentType = this.headers.get('content-type');
        const taskManager = this._ownerDocument.defaultView.happyDOM.asyncTaskManager;
        const taskID = taskManager.startTask();
        if (contentType.startsWith('application/x-www-form-urlencoded')) {
            const formData = new FormData_1.default();
            let text;
            try {
                text = await this.text();
            }
            catch (error) {
                taskManager.endTask(taskID);
                throw error;
            }
            const parameters = new url_1.URLSearchParams(text);
            for (const [name, value] of parameters) {
                formData.append(name, value);
            }
            taskManager.endTask(taskID);
            return formData;
        }
        let formData;
        try {
            formData = await MultipartFormDataParser_1.default.streamToFormData(this.body, contentType);
        }
        catch (error) {
            taskManager.endTask(taskID);
            throw error;
        }
        taskManager.endTask(taskID);
        return formData;
    }
    /**
     * Clones request.
     *
     * @returns Clone.
     */
    clone() {
        const response = new Response();
        response.status = this.status;
        response.statusText = this.statusText;
        response.ok = this.ok;
        response.headers = new Headers_1.default(this.headers);
        response.body = this.body;
        response.bodyUsed = this.bodyUsed;
        response.redirected = this.redirected;
        response.type = this.type;
        response.url = this.url;
        return response;
    }
    /**
     * Returns a redirect response.
     *
     * @param url URL.
     * @param status Status code.
     * @returns Response.
     */
    static redirect(url, status = 302) {
        if (!REDIRECT_STATUS_CODES.includes(status)) {
            throw new DOMException_1.default('Failed to create redirect response: Invalid redirect status code.', DOMExceptionNameEnum_1.default.invalidStateError);
        }
        return new Response(null, {
            headers: {
                location: new url_1.URL(url).toString()
            },
            status
        });
    }
    /**
     * Returns an error response.
     *
     * @param url URL.
     * @param status Status code.
     * @returns Response.
     */
    static error() {
        const response = new Response(null, { status: 0, statusText: '' });
        response.type = 'error';
        return response;
    }
    /**
     * Returns an JSON response.
     *
     * @param data Data.
     * @param [init] Init.
     * @returns Response.
     */
    static json(data, init) {
        const body = JSON.stringify(data);
        if (body === undefined) {
            throw new TypeError('data is not JSON serializable');
        }
        const headers = new Headers_1.default(init && init.headers);
        if (!headers.has('content-type')) {
            headers.set('content-type', 'application/json');
        }
        return new Response(body, {
            status: 200,
            ...init,
            headers
        });
    }
}
exports.default = Response;
// Owner document is set by a sub-class in the Window constructor
Response._ownerDocument = null;
//# sourceMappingURL=Response.js.map