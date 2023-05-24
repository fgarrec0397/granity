import { uidGenerator } from "@granity/helpers";
import { useCallback } from "react";

import useUIService from "../_data/hooks/useUIService";
import useUIWidgetsService from "../_data/hooks/useUIWidgetsService";
import { UIWidgetDictionaryItem } from "../uiTypes";

export default () => {
    const { selectedWidgetProperties } = useUIService();
    const { add } = useUIWidgetsService();

    const addUIWidget = useCallback(
        (uiWidget: UIWidgetDictionaryItem) => {
            const newUIWidget: UIWidgetDictionaryItem = { ...uiWidget };

            newUIWidget.id = uidGenerator(); // assign id on initialisation

            add(newUIWidget);
        },
        [add]
    );

    return {
        addUIWidget,
        selectedWidgetProperties,
    };
};
