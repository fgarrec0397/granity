import useWidgets from "@engine/App/Widgets/_actions/hooks/useWidgets";
import { useCallback } from "react";

export default () => {
    const { removeWidgetSelection } = useWidgets();

    const onEditorPointerMissed = useCallback(
        (event: MouseEvent) => {
            event.stopPropagation();
            removeWidgetSelection();
        },
        [removeWidgetSelection]
    );

    return {
        onEditorPointerMissed,
    };
};
