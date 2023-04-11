"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DOMException_1 = __importDefault(require("../../exception/DOMException"));
const DOMExceptionNameEnum_1 = __importDefault(require("../../exception/DOMExceptionNameEnum"));
const VALID_REFERRER_POLICIES = [
    '',
    'no-referrer',
    'no-referrer-when-downgrade',
    'same-origin',
    'origin',
    'strict-origin',
    'origin-when-cross-origin',
    'strict-origin-when-cross-origin',
    'unsafe-url'
];
const VALID_REDIRECTS = ['error', 'manual', 'follow'];
/**
 * Fetch request validation utility.
 */
class FetchRequestValidationUtility {
    /**
     * Validates request body.
     *
     * @throws DOMException
     * @param request Request.
     */
    static validateBody(request) {
        if (request.body && (request.method === 'GET' || request.method === 'HEAD')) {
            throw new DOMException_1.default(`Request with GET/HEAD method cannot have body.`, DOMExceptionNameEnum_1.default.invalidStateError);
        }
    }
    /**
     * Validates request URL.
     *
     * @throws DOMException
     * @param url URL.
     */
    static validateURL(url) {
        if (url.username !== '' || url.password !== '') {
            throw new DOMException_1.default(`${url} is an url with embedded credentials.`, DOMExceptionNameEnum_1.default.notSupportedError);
        }
    }
    /**
     * Validates request referrer policy.
     *
     * @throws DOMException
     * @param referrerPolicy Referrer policy.
     */
    static validateReferrerPolicy(referrerPolicy) {
        if (!VALID_REFERRER_POLICIES.includes(referrerPolicy)) {
            throw new DOMException_1.default(`Invalid referrer policy "${referrerPolicy}".`, DOMExceptionNameEnum_1.default.syntaxError);
        }
    }
    /**
     * Validates request redirect.
     *
     * @throws DOMException
     * @param redirect Redirect.
     */
    static validateRedirect(redirect) {
        if (!VALID_REDIRECTS.includes(redirect)) {
            throw new DOMException_1.default(`Invalid redirect "${redirect}".`, DOMExceptionNameEnum_1.default.syntaxError);
        }
    }
}
exports.default = FetchRequestValidationUtility;
//# sourceMappingURL=FetchRequestValidationUtility.js.map