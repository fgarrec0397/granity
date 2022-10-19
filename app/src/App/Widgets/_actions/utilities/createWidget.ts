// import { store } from "@app/Core/store";
import clone from "lodash/clone";
import { forwardRef, ForwardRefRenderFunction } from "react";

import { addWidgetModule } from "../_data/state/widgetsModuleReducer";
import { WidgetType } from "../widgetsConstants";
import { WidgetComponent, WidgetModule } from "../widgetsTypes";

let store: any;

export const injectStore = (_store: any) => {
    store = _store;
};

/**
 * A function helping you creating a widget.
 *
 * For now it only manage if your component is a forwarded one or a normal one, but in the future it could be more.
 */
export default <PropsType, RefType = null, ReducerType = null>(
    widget: WidgetModule<PropsType, RefType, ReducerType>
) => {
    // if (widget.type === WidgetType.UI) {
    // }
    console.log(store, "store");

    console.log(widget.widgetDefinition.name);

    const widgetModule: WidgetModule<PropsType, RefType, ReducerType> = clone(widget);

    if (widgetModule.hasRef) {
        (widgetModule.component as WidgetComponent<PropsType, RefType>) = forwardRef(
            widget.component as ForwardRefRenderFunction<RefType, PropsType>
        ) as WidgetComponent<PropsType, RefType>;
    }

    if (store) {
        if (widgetModule.reducer) {
            console.log(widgetModule.reducer, "widgetModule.reducer");

            store.injectReducer(widgetModule.reducer);
        }
        store.dispatch(addWidgetModule(widgetModule as any));
    }
    return widgetModule;
};
