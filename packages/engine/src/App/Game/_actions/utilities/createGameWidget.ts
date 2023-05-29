import { createWidget } from "@engine/api";
import { clone, SetOptionalPropertyFrom } from "@granity/helpers";
import { forwardRef, ForwardRefRenderFunction } from "react";

import {
    DefaultGameWidgetProps,
    GameWidgetComponent,
    GameWidgetModule,
    WidgetOptions,
} from "../gameTypes";
import gameWidgetMapper from "../mappers/gameWidgetMapper";

/**
 * A function helping you creating a Game widget.
 *
 */
export default <Props = DefaultGameWidgetProps, Ref = null, Options = WidgetOptions>(
    widget: SetOptionalPropertyFrom<GameWidgetModule<Props, Ref, Options>, "type">
) => {
    const clonedWidget = clone(widget);
    const widgetModule = gameWidgetMapper<Props, Ref, Options>(clonedWidget);

    if ("hasRef" in widgetModule && widgetModule.hasRef) {
        (widgetModule.component as GameWidgetComponent<Props, Ref>) = forwardRef(
            widget.component as ForwardRefRenderFunction<Ref, Props>
        ) as GameWidgetComponent<Props, Ref>;
    }

    return createWidget<GameWidgetModule<Props, Ref, Options>>(widgetModule);
};
