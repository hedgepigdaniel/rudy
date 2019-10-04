/**
 * This package is for types that are shared between the various packages
 * and the outside world.
 */
/**
 * Standard interface for redux actions which map to URLs/routes
 */
export interface FluxStandardRoutingAction {
    type: string;
    params?: {};
    query?: {};
    state?: {};
    hash?: string;
    basename?: string;
}
export declare type LocationEntry<Action extends FluxStandardRoutingAction> = Required<Action> & {
    location: {
        key: string;
        scene: string;
        url: string;
        pathname: string;
        search: string;
    };
};
export declare type Kind = 'load' | 'push' | 'replace' | 'back' | 'next' | 'jump' | 'set' | 'reset';
export declare type Direction = 'forward' | 'backward';
export declare type DispatchedLocation<Action extends FluxStandardRoutingAction> = Required<Action> & {
    prev: LocationEntry<Action> | undefined;
    entries: LocationEntry<Action>[];
    index: number;
    length: number;
    kind: Kind;
    direction: Direction;
    n: number;
    url: string;
    pathname: string;
    search: string;
    key: string;
    scene: string;
    pop: boolean;
    status: number;
};
/**
 * A routing action as it is between transformAction and the reducers
 */
export declare type LocationAction<Action extends FluxStandardRoutingAction> = Required<Action> & {
    location: DispatchedLocation<Action>;
};
/**
 * The shape of the Rudy location reducer state
 */
export declare type Location<Action extends FluxStandardRoutingAction> = LocationAction<Action> & DispatchedLocation<Action>;
/**
 * An instance of the Rudy API
 */
export interface Api<Action extends FluxStandardRoutingAction, ScrollRestorer extends BaseScrollRestorer<Action> = BaseScrollRestorer<Action>> {
    getLocation: () => Location<Action>;
    scrollRestorer?: ScrollRestorer;
    options: Options<Action, ScrollRestorer>;
}
/**
 * A Rudy request, associated with the dispatch of an FSRA
 */
export declare type Request<Action extends FluxStandardRoutingAction, ScrollRestorer extends BaseScrollRestorer<Action> = BaseScrollRestorer<Action>> = Api<Action, ScrollRestorer> & {
    /**
     * The redux action corresponding to the request. Before the
     * transformAction middleware, the action is an `Action`, whereas
     * after that it is a `LocationAction` if the corresponding
     * route has a `path`
     */
    action: Action | LocationAction<Action>;
};
/**
 * Rudy middleware which wraps and optionally changes the behaviour of
 * a request
 */
export declare type Middleware<Action extends FluxStandardRoutingAction, ScrollRestorer extends BaseScrollRestorer<Action> = BaseScrollRestorer<Action>> = (api: Api<Action, ScrollRestorer>) => (request: Request<Action, ScrollRestorer>, next: () => Promise<any>) => Promise<any>;
export declare type BaseScrollRestorer<Action extends FluxStandardRoutingAction> = {
    saveScroll: Middleware<Action, BaseScrollRestorer<Action>>;
    restoreScroll: Middleware<Action, BaseScrollRestorer<Action>>;
    updateScroll: () => void;
};
export declare type ScrollRestorerCreator<Action extends FluxStandardRoutingAction, ScrollRestorer extends BaseScrollRestorer<Action> = BaseScrollRestorer<Action>> = (api: Api<Action, ScrollRestorer>) => ScrollRestorer;
/**
 * Options for a route, corresponding to FSRAs with a specific Redux action type
 */
export declare type Route = {};
/**
 * Global Rudy options
 */
export declare type Options<Action extends FluxStandardRoutingAction, ScrollRestorer extends BaseScrollRestorer<Action> = BaseScrollRestorer<Action>> = {
    makeRestoreScroll?: ScrollRestorer;
};
//# sourceMappingURL=index.d.ts.map