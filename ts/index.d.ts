import { ShouldUpdateScroll as BaseShouldUpdateScroll } from 'scroll-behavior';
import { Api, Middleware, LocationEntry, FluxStandardRoutingAction, Request, ScrollRestorer, ScrollRestorerCreator } from '@respond-framework/types';
export { ScrollPosition } from 'scroll-behavior';
export declare type ShouldUpdateScroll<Action extends FluxStandardRoutingAction> = BaseShouldUpdateScroll<Request<Action>, undefined>;
export declare type RestoreScrollOptions<Action extends FluxStandardRoutingAction> = {
    shouldUpdateScroll?: ShouldUpdateScroll<Action>;
};
export declare class RudyScrollRestorer<Action extends FluxStandardRoutingAction> implements ScrollRestorer<Action> {
    private options;
    private behavior;
    private lastRequest?;
    private api;
    private transitionHooks;
    private nextHookIndex;
    private makeStorageKey;
    private saveScrollPosition;
    readScrollPosition: (entry: LocationEntry<Action>, key: string | null) => [number, number] | null;
    constructor(api: Api<Action>, options?: RestoreScrollOptions<Action>);
    private getCurrentLocation;
    saveScroll: Middleware<Action>;
    restoreScroll: Middleware<Action>;
    updateScroll: () => void;
}
declare const _default: <Action extends FluxStandardRoutingAction>(options?: RestoreScrollOptions<Action> | undefined) => ScrollRestorerCreator<Action>;
export default _default;
//# sourceMappingURL=index.d.ts.map