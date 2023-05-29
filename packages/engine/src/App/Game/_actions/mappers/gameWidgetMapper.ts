import { WidgetOptions, WidgetType } from "@engine/api";

import { DefaultGameWidgetProps, GameWidget, GameWidgetModule } from "../gameTypes";

export default <Props = DefaultGameWidgetProps, Ref = null, Options = WidgetOptions>(
    widget: GameWidget<Props, Ref, Options>
): GameWidgetModule<Props, Ref, Options> => {
    return {
        ...widget,
        type: WidgetType.GameObject,
    };
};
