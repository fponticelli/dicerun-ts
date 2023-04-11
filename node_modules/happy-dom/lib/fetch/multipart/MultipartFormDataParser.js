"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = __importDefault(require("stream"));
const MultipartReader_1 = __importDefault(require("./MultipartReader"));
const DOMException_1 = __importDefault(require("../../exception/DOMException"));
const DOMExceptionNameEnum_1 = __importDefault(require("../../exception/DOMExceptionNameEnum"));
/**
 * Multipart form data factory.
 *
 * Based on:
 * https://github.com/node-fetch/node-fetch/blob/main/src/utils/multipart-parser.js (MIT)
 */
class MultipartFormDataParser {
    /**
     * Returns form data.
     *
     * @param body Body.
     * @param contentType Content type header value.
     * @returns Form data.
     */
    static async streamToFormData(body, contentType) {
        if (!/multipart/i.test(contentType)) {
            throw new DOMException_1.default(`Failed to build FormData object: The "content-type" header isn't of type "multipart/form-data".`, DOMExceptionNameEnum_1.default.invalidStateError);
        }
        const match = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
        if (!match) {
            throw new DOMException_1.default(`Failed to build FormData object: The "content-type" header doesn't contain any multipart boundary.`, DOMExceptionNameEnum_1.default.invalidStateError);
        }
        const reader = new MultipartReader_1.default(match[1] || match[2]);
        for await (const chunk of body) {
            reader.write(chunk);
        }
        return reader.end();
    }
    /**
     * Converts a FormData object to a ReadableStream.
     *
     * @param formData FormData.
     * @returns Stream and type.
     */
    static formDataToStream(formData) {
        const boundary = '----HappyDOMFormDataBoundary' + Math.random().toString(36);
        const chunks = [];
        const prefix = `--${boundary}\r\nContent-Disposition: form-data; name="`;
        for (const [name, value] of formData) {
            if (typeof value === 'string') {
                chunks.push(Buffer.from(`${prefix}${this.escapeName(name)}"\r\n\r\n${value.replace(/\r(?!\n)|(?<!\r)\n/g, '\r\n')}\r\n`));
            }
            else {
                chunks.push(Buffer.from(`${prefix}${this.escapeName(name)}"; filename="${this.escapeName(value.name, true)}"\r\nContent-Type: ${value.type || 'application/octet-stream'}\r\n\r\n`));
                chunks.push(value._buffer);
                chunks.push(Buffer.from('\r\n'));
            }
        }
        const buffer = Buffer.concat(chunks);
        return {
            contentType: `multipart/form-data; boundary=${boundary}`,
            contentLength: buffer.length,
            buffer,
            stream: stream_1.default.Readable.from(buffer)
        };
    }
    /**
     * Escapes a form data entry name.
     *
     * @param name Name.
     * @param filename Whether it is a filename.
     * @returns Escaped name.
     */
    static escapeName(name, filename = false) {
        return (filename ? name : name.replace(/\r?\n|\r/g, '\r\n'))
            .replace(/\n/g, '%0A')
            .replace(/\r/g, '%0D')
            .replace(/"/g, '%22');
    }
}
exports.default = MultipartFormDataParser;
//# sourceMappingURL=MultipartFormDataParser.js.map