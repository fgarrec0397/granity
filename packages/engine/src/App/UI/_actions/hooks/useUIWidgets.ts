import { useWidgets } from "@engine/api";
import { useCallback } from "react";

import useUIService from "../_data/hooks/useUIService";
import { UIWidgetDictionaryItem } from "../uiTypes";

export default () => {
    const { selectedWidgetProperties } = useUIService();
    const { addWidget } = useWidgets();

    const addUIWidget = useCallback(
        (uiWidget: UIWidgetDictionaryItem) => {
            addWidget(uiWidget);
        },
        [addWidget]
    );

    return {
        addUIWidget,
        selectedWidgetProperties,
    };
};
