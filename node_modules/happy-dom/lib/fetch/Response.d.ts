/// <reference types="node" />
/// <reference types="node" />
import IResponse from './types/IResponse';
import IBlob from '../file/IBlob';
import IDocument from '../nodes/document/IDocument';
import IResponseInit from './types/IResponseInit';
import IResponseBody from './types/IResponseBody';
import IHeaders from './types/IHeaders';
import Stream from 'stream';
import FormData from '../form-data/FormData';
/**
 * Fetch response.
 *
 * Based on:
 * https://github.com/node-fetch/node-fetch/blob/main/src/response.js (MIT)
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Response/Response
 */
export default class Response implements IResponse {
    static _ownerDocument: IDocument;
    readonly _ownerDocument: IDocument;
    readonly body: Stream.Readable | null;
    readonly bodyUsed = false;
    readonly redirected = false;
    readonly type: 'basic' | 'cors' | 'default' | 'error' | 'opaque' | 'opaqueredirect';
    readonly url: string;
    readonly status: number;
    readonly statusText: string;
    readonly ok: boolean;
    readonly headers: IHeaders;
    /**
     * Constructor.
     *
     * @param input Input.
     * @param body
     * @param [init] Init.
     */
    constructor(body?: IResponseBody, init?: IResponseInit);
    /**
     * Returns string tag.
     *
     * @returns String tag.
     */
    get [Symbol.toStringTag](): string;
    /**
     * Returns array buffer.
     *
     * @returns Array buffer.
     */
    arrayBuffer(): Promise<ArrayBuffer>;
    /**
     * Returns blob.
     *
     * @returns Blob.
     */
    blob(): Promise<IBlob>;
    /**
     * Returns buffer.
     *
     * @returns Buffer.
     */
    buffer(): Promise<Buffer>;
    /**
     * Returns text.
     *
     * @returns Text.
     */
    text(): Promise<string>;
    /**
     * Returns json.
     *
     * @returns JSON.
     */
    json(): Promise<string>;
    /**
     * Returns form data.
     *
     * @returns Form data.
     */
    formData(): Promise<FormData>;
    /**
     * Clones request.
     *
     * @returns Clone.
     */
    clone(): IResponse;
    /**
     * Returns a redirect response.
     *
     * @param url URL.
     * @param status Status code.
     * @returns Response.
     */
    static redirect(url: string, status?: number): IResponse;
    /**
     * Returns an error response.
     *
     * @param url URL.
     * @param status Status code.
     * @returns Response.
     */
    static error(): IResponse;
    /**
     * Returns an JSON response.
     *
     * @param data Data.
     * @param [init] Init.
     * @returns Response.
     */
    static json(data: object, init?: IResponseInit): IResponse;
}
//# sourceMappingURL=Response.d.ts.map