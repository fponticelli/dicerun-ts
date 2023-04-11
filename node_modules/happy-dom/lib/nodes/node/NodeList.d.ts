import INodeList from './INodeList';
/**
 * Class list.
 */
export default class NodeList<T> extends Array implements INodeList<T> {
    /**
     * Returns `Symbol.toStringTag`.
     *
     * @returns `Symbol.toStringTag`.
     */
    get [Symbol.toStringTag](): string;
    /**
     * Returns item by index.
     *
     * @param index Index.
     */
    item(index: number): T;
}
//# sourceMappingURL=NodeList.d.ts.map