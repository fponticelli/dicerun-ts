/// <reference types="node" />
/// <reference types="node" />
import Stream from 'stream';
import IRequestBody from '../types/IRequestBody';
import IResponseBody from '../types/IResponseBody';
import Request from '../Request';
/**
 * Fetch body utility.
 */
export default class FetchBodyUtility {
    /**
     * Parses body and returns stream and type.
     *
     * Based on:
     * https://github.com/node-fetch/node-fetch/blob/main/src/body.js (MIT)
     *
     * @param body Body.
     * @returns Stream and type.
     */
    static getBodyStream(body: IRequestBody | IResponseBody): {
        contentType: string;
        contentLength: number | null;
        stream: Stream.Readable;
        buffer: Buffer | null;
    };
    /**
     * Clones a request body stream.
     *
     * @param request Request.
     * @returns Stream.
     */
    static cloneRequestBodyStream(request: Request): Stream.Readable;
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
    static consumeBodyStream(body: Stream.Readable | null): Promise<Buffer>;
}
//# sourceMappingURL=FetchBodyUtility.d.ts.map