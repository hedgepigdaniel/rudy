import { ShouldUpdateScroll } from 'scroll-behavior';
import { Api, Middleware, LocationEntry, FluxStandardRoutingAction, Request, ScrollRestorerCreator } from '@respond-framework/types';
export declare type RestoreScrollOptions<Action extends FluxStandardRoutingAction> = {
    shouldUpdateScroll?: ShouldUpdateScroll<Request<Action>, undefined>;
};
export declare class ScrollRestorer<Action extends FluxStandardRoutingAction> {
    private options;
    private behavior;
    private lastRequest?;
    private api;
    private transitionHooks;
    private nextHookIndex;
    private makeStorageKey;
    private saveScrollPosition;
    readScrollPosition: (entry: LocationEntry<Action>, key: string | null) => [number, number] | null;
    constructor(api: Api<Action, ScrollRestorer<Action>>, options?: RestoreScrollOptions<Action>);
    private getCurrentLocation;
    saveScroll: Middleware<Action>;
    restoreScroll: Middleware<Action>;
    updateScroll: () => void;
}
declare const _default: <Action extends FluxStandardRoutingAction>(options?: RestoreScrollOptions<Action> | undefined) => ScrollRestorerCreator<Action, ScrollRestorer<Action>>;
export default _default;
//# sourceMappingURL=index.d.ts.map