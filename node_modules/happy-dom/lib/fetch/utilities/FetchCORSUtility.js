"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Fetch CORS utility.
 */
class FetchCORSUtility {
    /**
     * Validates request headers.
     *
     * @param originURL Origin URL.
     * @param targetURL Target URL.
     */
    static isCORS(originURL, targetURL) {
        return ((originURL.hostname !== targetURL.hostname &&
            !originURL.hostname.endsWith(targetURL.hostname)) ||
            originURL.protocol !== targetURL.protocol);
    }
}
exports.default = FetchCORSUtility;
//# sourceMappingURL=FetchCORSUtility.js.map