import { useCallback } from "react";

import populateGameWidgetProps from "../utilities/populateGameWidgetProps";
import useGameWidgets from "./useGameWidgets";

export default () => {
    const { gameWidgetsInfo } = useGameWidgets();

    const getGameWidgetProps = useCallback(
        (id: string) => {
            return {
                ...populateGameWidgetProps(id, gameWidgetsInfo),
            };
        },
        [gameWidgetsInfo]
    );

    return { getGameWidgetProps };
};
