import { createWidget, WidgetType } from "@engine/api";
// import { DefaultWidgetProps } from "@engine/App/Game/_actions/Types";
import { clone, SetOptionalPropertyFrom } from "@granity/helpers";
import { forwardRef, ForwardRefRenderFunction } from "react";

import { GameWidgetComponent, GameWidgetModule, WidgetOptions } from "../gameTypes";

/**
 * A function helping you creating a Game widget.
 *
 */
export default <Props, Ref = null, Options = WidgetOptions>(
    widget: SetOptionalPropertyFrom<GameWidgetModule<Props, Ref, Options>, "type">
) => {
    const clonedWidget = clone(widget);
    const widgetModule: GameWidgetModule<Props, Ref, Options> = {
        ...clonedWidget,
        type: WidgetType.GameObject,
    };

    if ("hasRef" in widgetModule && widgetModule.hasRef) {
        (widgetModule.component as GameWidgetComponent<Props, Ref>) = forwardRef(
            widget.component as ForwardRefRenderFunction<Ref, Props>
        ) as GameWidgetComponent<Props, Ref>;
    }

    return createWidget<GameWidgetModule<Props, Ref, Options>>(widgetModule);
};
