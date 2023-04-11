"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DOMException_1 = __importDefault(require("../exception/DOMException"));
const url_1 = require("url");
/**
 * Helper class for performing fetch of resources.
 */
class ResourceFetch {
    /**
     * Returns resource data asynchronously.
     *
     * @param document Document.
     * @param url URL.
     * @returns Response.
     */
    static async fetch(document, url) {
        const response = await document.defaultView.fetch(url);
        if (!response.ok) {
            throw new DOMException_1.default(`Failed to perform request to "${url}". Status code: ${response.status}`);
        }
        return await response.text();
    }
    /**
     * Returns resource data synchronously.
     *
     * @param document Document.
     * @param url URL.
     * @returns Response.
     */
    static fetchSync(document, url) {
        // We want to only load SyncRequest when it is needed to improve performance and not have direct dependencies to server side packages.
        const absoluteURL = new url_1.URL(url, document.defaultView.location).href;
        const xhr = new document.defaultView.XMLHttpRequest();
        xhr.open('GET', absoluteURL, false);
        xhr.send();
        if (xhr.status !== 200) {
            throw new DOMException_1.default(`Failed to perform request to "${absoluteURL}". Status code: ${xhr.status}`);
        }
        return xhr.responseText;
    }
}
exports.default = ResourceFetch;
//# sourceMappingURL=ResourceFetch.js.map