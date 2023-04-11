import IDocument from '../nodes/document/IDocument';
/**
 * Helper class for performing fetch of resources.
 */
export default class ResourceFetch {
    /**
     * Returns resource data asynchronously.
     *
     * @param document Document.
     * @param url URL.
     * @returns Response.
     */
    static fetch(document: IDocument, url: string): Promise<string>;
    /**
     * Returns resource data synchronously.
     *
     * @param document Document.
     * @param url URL.
     * @returns Response.
     */
    static fetchSync(document: IDocument, url: string): string;
}
//# sourceMappingURL=ResourceFetch.d.ts.map