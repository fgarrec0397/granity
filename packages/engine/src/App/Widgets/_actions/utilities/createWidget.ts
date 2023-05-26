import { InjectableStore } from "@engine/App/Core/_actions/_data/state/store";

import { Widget } from "../widgetsTypes";

let store: InjectableStore;

export const injectStore = (_store: InjectableStore) => {
    store = _store;
};

/**
 * A function helping you creating a widget.
 *
 */
export default <WidgetModuleType extends Widget>(widget: WidgetModuleType): WidgetModuleType => {
    if (store) {
        if (widget.reducer) {
            store.reducerManager?.addIn?.("features", widget.reducer.name, widget.reducer);
        }
    }

    return widget;
};
