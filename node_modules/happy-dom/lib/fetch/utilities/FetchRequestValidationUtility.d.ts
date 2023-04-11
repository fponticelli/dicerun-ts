/// <reference types="node" />
import IRequestReferrerPolicy from '../types/IRequestReferrerPolicy';
import IRequestRedirect from '../types/IRequestRedirect';
import { URL } from 'url';
import IRequest from '../types/IRequest';
/**
 * Fetch request validation utility.
 */
export default class FetchRequestValidationUtility {
    /**
     * Validates request body.
     *
     * @throws DOMException
     * @param request Request.
     */
    static validateBody(request: IRequest): void;
    /**
     * Validates request URL.
     *
     * @throws DOMException
     * @param url URL.
     */
    static validateURL(url: URL): void;
    /**
     * Validates request referrer policy.
     *
     * @throws DOMException
     * @param referrerPolicy Referrer policy.
     */
    static validateReferrerPolicy(referrerPolicy: IRequestReferrerPolicy): void;
    /**
     * Validates request redirect.
     *
     * @throws DOMException
     * @param redirect Redirect.
     */
    static validateRedirect(redirect: IRequestRedirect): void;
}
//# sourceMappingURL=FetchRequestValidationUtility.d.ts.map