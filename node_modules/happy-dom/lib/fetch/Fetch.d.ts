import IRequestInit from './types/IRequestInit';
import IDocument from '../nodes/document/IDocument';
import IResponse from './types/IResponse';
import IRequestInfo from './types/IRequestInfo';
/**
 * Handles fetch requests.
 *
 * Based on:
 * https://github.com/node-fetch/node-fetch/blob/main/src/index.js
 *
 * @see https://fetch.spec.whatwg.org/#http-network-fetch
 */
export default class Fetch {
    private reject;
    private resolve;
    private listeners;
    private isChunkedTransfer;
    private isProperLastChunkReceived;
    private previousChunk;
    private nodeRequest;
    private response;
    private ownerDocument;
    private request;
    private redirectCount;
    /**
     * Constructor.
     *
     * @param options Options.
     * @param options.document
     * @param options.url URL.
     * @param [options.init] Init.
     * @param [options.ownerDocument] Owner document.
     * @param [options.redirectCount] Redirect count.
     * @param [options.contentType] Content Type.
     */
    constructor(options: {
        ownerDocument: IDocument;
        url: IRequestInfo;
        init?: IRequestInit;
        redirectCount?: number;
        contentType?: string;
    });
    /**
     * Sends request.
     *
     * @returns Response.
     */
    send(): Promise<IResponse>;
    /**
     * Event listener for "socket" event.
     *
     * @param socket Socket.
     */
    private onSocket;
    /**
     * Event listener for signal "abort" event.
     */
    private onSignalAbort;
    /**
     * Event listener for request "error" event.
     *
     * @param error Error.
     */
    private onError;
    /**
     * Event listener for request "response" event.
     *
     * @param nodeResponse Node response.
     */
    private onResponse;
    /**
     * Handles redirect response.
     *
     * @param nodeResponse Node response.
     * @param responseHeaders Headers.
     * @returns True if redirect response was handled, false otherwise.
     */
    private handleRedirectResponse;
    /**
     * Prepares the request before being sent.
     */
    private prepareRequest;
    /**
     * Validates the request.
     *
     * @throws {Error} Throws an error if the request is invalid.
     */
    private validateRequest;
    /**
     * Returns request headers.
     *
     * @returns Headers.
     */
    private getRequestHeaders;
    /**
     * Returns "true" if redirect.
     *
     * @param statusCode Status code.
     * @returns "true" if redirect.
     */
    private isRedirect;
    /**
     * Appends headers to response.
     *
     * @param nodeResponse HTTP request.
     * @returns Headers.
     */
    private getResponseHeaders;
    /**
     * Finalizes the request.
     */
    private finalizeRequest;
    /**
     * Aborts the request.
     */
    private abort;
}
//# sourceMappingURL=Fetch.d.ts.map