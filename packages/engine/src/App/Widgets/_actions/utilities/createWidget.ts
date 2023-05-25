import { InjectableStore } from "@engine/App/Core/_actions/_data/state/store";
import { clone } from "@granity/helpers";

import { WidgetModule } from "../widgetsTypes";

let store: InjectableStore;

export const injectStore = (_store: InjectableStore) => {
    store = _store;
};

/**
 * A function helping you creating a widget.
 *
 */
export default <WidgetModuleType extends WidgetModule<any, any, any>>(widget: WidgetModuleType) => {
    const widgetModule: WidgetModuleType = clone(widget);

    if (store) {
        if (widgetModule.reducer) {
            store.reducerManager?.addIn?.(
                "features",
                widgetModule.reducer.name,
                widgetModule.reducer
            );
        }
    }

    return widgetModule;
};
