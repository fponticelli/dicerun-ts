import IHTMLCollection from './IHTMLCollection';
/**
 * HTML collection.
 */
export default class HTMLCollection<T> extends Array implements IHTMLCollection<T> {
    protected _namedItems: {
        [k: string]: T[];
    };
    /**
     * Returns item by index.
     *
     * @param index Index.
     */
    item(index: number): T | null;
    /**
     * Returns named item.
     *
     * @param name Name.
     * @returns Node.
     */
    namedItem(name: string): T | null;
    /**
     * Appends named item.
     *
     * @param node Node.
     * @param name Name.
     */
    _appendNamedItem(node: T, name: string): void;
    /**
     * Appends named item.
     *
     * @param node Node.
     * @param name Name.
     */
    _removeNamedItem(node: T, name: string): void;
    /**
     * Returns "true" if the property name is valid.
     *
     * @param name Name.
     * @returns True if the property name is valid.
     */
    protected _isValidPropertyName(name: string): boolean;
}
//# sourceMappingURL=HTMLCollection.d.ts.map