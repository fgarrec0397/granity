import { InjectableStore } from "@app/Core/store";
import clone from "lodash/clone";
import { forwardRef, ForwardRefRenderFunction } from "react";

import { WidgetComponent, WidgetModule, WidgetUIModule } from "../widgetsTypes";

let store: InjectableStore;

export const injectStore = (_store: InjectableStore) => {
    store = _store;
};

/**
 * A function helping you creating a widget.
 *
 * For now it only manage if your component is a forwarded one or a normal one, but in the future it could be more.
 */
export default <PropsType, RefType = null>(
    widget: WidgetModule<PropsType, RefType> | WidgetUIModule<PropsType>
) => {
    const widgetModule: WidgetModule<PropsType, RefType> | WidgetUIModule<PropsType> =
        clone(widget);

    if ("hasRef" in widgetModule && widgetModule.hasRef) {
        (widgetModule.component as WidgetComponent<PropsType, RefType>) = forwardRef(
            widget.component as ForwardRefRenderFunction<RefType, PropsType>
        ) as WidgetComponent<PropsType, RefType>;
    }

    if (store) {
        if (widgetModule.reducer) {
            store.injectFeaturesReducer?.(widgetModule.reducer.name, widgetModule.reducer.reducer);
        }
    }
    return widgetModule;
};
