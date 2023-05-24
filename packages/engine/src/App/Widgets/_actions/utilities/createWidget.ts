import { InjectableStore } from "@engine/App/Core/_actions/_data/state/store";
import { clone } from "@granity/helpers";
import { forwardRef, ForwardRefRenderFunction } from "react";

import { WidgetComponent, WidgetModule } from "../widgetsTypes";

let store: InjectableStore;

export const injectStore = (_store: InjectableStore) => {
    store = _store;
};

/**
 * A function helping you creating a widget.
 *
 */
export default <WidgetModuleType extends WidgetModule, PropsType, RefType = null>(
    widget: WidgetModuleType
) => {
    const widgetModule: WidgetModuleType = clone(widget);

    if ("hasRef" in widgetModule && widgetModule.hasRef) {
        (widgetModule.component as WidgetComponent<PropsType, RefType>) = forwardRef(
            widget.component as ForwardRefRenderFunction<RefType, PropsType>
        ) as WidgetComponent<PropsType, RefType>;
    }

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
