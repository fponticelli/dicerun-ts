"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MultipartFormDataParser_1 = __importDefault(require("../multipart/MultipartFormDataParser"));
const stream_1 = __importDefault(require("stream"));
const url_1 = require("url");
const FormData_1 = __importDefault(require("../../form-data/FormData"));
const Blob_1 = __importDefault(require("../../file/Blob"));
const DOMException_1 = __importDefault(require("../../exception/DOMException"));
const DOMExceptionNameEnum_1 = __importDefault(require("../../exception/DOMExceptionNameEnum"));
/**
 * Fetch body utility.
 */
class FetchBodyUtility {
    /**
     * Parses body and returns stream and type.
     *
     * Based on:
     * https://github.com/node-fetch/node-fetch/blob/main/src/body.js (MIT)
     *
     * @param body Body.
     * @returns Stream and type.
     */
    static getBodyStream(body) {
        if (body === null || body === undefined) {
            return { stream: null, buffer: null, contentType: null, contentLength: null };
        }
        else if (body instanceof url_1.URLSearchParams) {
            const buffer = Buffer.from(body.toString());
            return {
                buffer,
                stream: stream_1.default.Readable.from(Buffer.from(buffer)),
                contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
                contentLength: buffer.length
            };
        }
        else if (body instanceof Blob_1.default) {
            const buffer = body._buffer;
            return {
                buffer,
                stream: stream_1.default.Readable.from(buffer),
                contentType: body.type,
                contentLength: body.size
            };
        }
        else if (Buffer.isBuffer(body)) {
            return {
                buffer: body,
                stream: stream_1.default.Readable.from(body),
                contentType: null,
                contentLength: body.length
            };
        }
        else if (body instanceof ArrayBuffer) {
            const buffer = Buffer.from(body);
            return {
                buffer,
                stream: stream_1.default.Readable.from(buffer),
                contentType: null,
                contentLength: body.byteLength
            };
        }
        else if (ArrayBuffer.isView(body)) {
            const buffer = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
            return {
                buffer,
                stream: stream_1.default.Readable.from(buffer),
                contentType: null,
                contentLength: body.byteLength
            };
        }
        else if (body instanceof stream_1.default.Stream) {
            return {
                buffer: null,
                stream: body,
                contentType: null,
                contentLength: null
            };
        }
        else if (body instanceof FormData_1.default) {
            return MultipartFormDataParser_1.default.formDataToStream(body);
        }
        const buffer = Buffer.from(String(body));
        return {
            buffer,
            stream: stream_1.default.Readable.from(buffer),
            contentType: 'text/plain;charset=UTF-8',
            contentLength: buffer.length
        };
    }
    /**
     * Clones a request body stream.
     *
     * @param request Request.
     * @returns Stream.
     */
    static cloneRequestBodyStream(request) {
        if (request.bodyUsed) {
            throw new DOMException_1.default(`Failed to clone body stream of request: Request body is already used.`, DOMExceptionNameEnum_1.default.invalidStateError);
        }
        const p1 = new stream_1.default.PassThrough();
        const p2 = new stream_1.default.PassThrough();
        request.body.pipe(p1);
        request.body.pipe(p2);
        // Sets the body of the cloned request to the first pass through stream.
        request.body = p1;
        // Returns the clone.
        return p2;
    }
    /**
     * Consume and convert an entire Body to a Buffer.
     *
     * Based on:
     * https://github.com/node-fetch/node-fetch/blob/main/src/body.js (MIT)
     *
     * @see https://fetch.spec.whatwg.org/#concept-body-consume-body
     * @param body Body stream.
     * @returns Promise.
     */
    static async consumeBodyStream(body) {
        if (body === null || !(body instanceof stream_1.default.Stream)) {
            return Buffer.alloc(0);
        }
        const chunks = [];
        let bytes = 0;
        try {
            for await (const chunk of body) {
                bytes += chunk.length;
                chunks.push(chunk);
            }
        }
        catch (error) {
            if (error instanceof DOMException_1.default) {
                throw error;
            }
            throw new DOMException_1.default(`Failed to read response body. Error: ${error.message}.`, DOMExceptionNameEnum_1.default.encodingError);
        }
        if (body.readableEnded === false ||
            body['_readableState']?.ended === false) {
            throw new DOMException_1.default(`Premature close of server response.`, DOMExceptionNameEnum_1.default.invalidStateError);
        }
        try {
            if (typeof chunks[0] === 'string') {
                return Buffer.from(chunks.join(''));
            }
            return Buffer.concat(chunks, bytes);
        }
        catch (error) {
            throw new DOMException_1.default(`Could not create Buffer from response body. Error: ${error.message}.`, DOMExceptionNameEnum_1.default.invalidStateError);
        }
    }
}
exports.default = FetchBodyUtility;
//# sourceMappingURL=FetchBodyUtility.js.map