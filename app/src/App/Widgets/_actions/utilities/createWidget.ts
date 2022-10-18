import clone from "lodash/clone";
import { forwardRef, ForwardRefRenderFunction } from "react";

import { WidgetType } from "../widgetsConstants";
import { WidgetComponent, WidgetModule } from "../widgetsTypes";

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
    const widgetModule: WidgetModule<PropsType, RefType, ReducerType> = clone(widget);

    if (widgetModule.hasRef) {
        (widgetModule.component as WidgetComponent<PropsType, RefType>) = forwardRef(
            widget.component as ForwardRefRenderFunction<RefType, PropsType>
        ) as WidgetComponent<PropsType, RefType>;
    }

    return widgetModule;
};
