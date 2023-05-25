import { DefaultWidgetProps, WidgetOptions, WidgetType } from "@engine/api";

import { GameWidget, GameWidgetModule } from "../gameTypes";

export default <Props = DefaultWidgetProps, Options = WidgetOptions>(
    widget: GameWidget<Props, Options>
): GameWidgetModule<Props, Options> => {
    return {
        ...widget,
        type: WidgetType.GameObject,
    };
};
