/// <reference types="node" />
import { URL } from 'url';
import IRequest from '../types/IRequest';
import IDocument from '../../nodes/document/IDocument';
import Headers from '../Headers';
import IRequestReferrerPolicy from '../types/IRequestReferrerPolicy';
/**
 * Fetch referrer utility.
 */
export default class FetchRequestReferrerUtility {
    /**
     * Returns the request referrer to be used as the value for the "Referer" header.
     *
     * Based on:
     * https://github.com/node-fetch/node-fetch/blob/main/src/utils/referrer.js (MIT)
     *
     * @see https://w3c.github.io/webappsec-referrer-policy/#determine-requests-referrer
     * @param document Document.
     * @param request Request.
     * @returns Request referrer.
     */
    static getSentReferrer(document: IDocument, request: IRequest): '' | 'no-referrer' | 'client' | URL;
    /**
     * Returns initial referrer.
     *
     * @param document Document.
     * @param referrer Referrer.
     * @returns Initial referrer.
     */
    static getInitialReferrer(document: IDocument, referrer: '' | 'no-referrer' | 'client' | string | URL): '' | 'no-referrer' | 'client' | URL;
    /**
     * Returns referrer policy from header.
     *
     * @see https://w3c.github.io/webappsec-referrer-policy/#parse-referrer-policy-from-header
     * @param headers Response headers
     * @returns Policy.
     */
    static getReferrerPolicyFromHeader(headers: Headers): IRequestReferrerPolicy;
    /**
     * Returns "true" if the request's referrer is potentially trustworthy.
     *
     * @see https://w3c.github.io/webappsec-secure-contexts/#is-origin-trustworthy
     * @param url URL.
     * @returns "true" if the request's referrer is potentially trustworthy.
     */
    private static isURLPotentiallyTrustWorthy;
    /**
     * Returns "true" if the request's referrer origin is potentially trustworthy.
     *
     * @see https://w3c.github.io/webappsec-secure-contexts/#is-origin-trustworthy
     * @param url URL.
     * @returns "true" if the request's referrer origin is potentially trustworthy.
     */
    private static isOriginPotentiallyTrustWorthy;
}
//# sourceMappingURL=FetchRequestReferrerUtility.d.ts.map