import IWindow from '../window/IWindow';
import Event from './Event';
import IUIEventInit from './IUIEventInit';
/**
 *
 */
export default class UIEvent extends Event {
    static NONE: number;
    static CAPTURING_PHASE: number;
    static AT_TARGET: number;
    static BUBBLING_PHASE: number;
    readonly detail: number;
    readonly layerX: number;
    readonly layerY: number;
    readonly pageX: number;
    readonly pageY: number;
    readonly view: IWindow;
    /**
     * Constructor.
     *
     * @param type Event type.
     * @param [eventInit] Event init.
     */
    constructor(type: string, eventInit?: IUIEventInit);
}
//# sourceMappingURL=UIEvent.d.ts.map