import { useIsEditor } from "@app/Editor/_actions/hooks";
import { useWidgets } from "@app/Widgets/_actions/hooks";

import useGameWidgets from "./useGameWidgets";

export default () => {
    const { setIsEditor, isEditor } = useIsEditor();
    const { widgets, widgetsDictionary } = useWidgets();
    const { initGameWidgets, removeGameWidgets } = useGameWidgets();

    const playGame = () => {
        // if (isEditor) {
        //     initGameWidgets(widgetsDictionary, widgets);
        // } else {
        //     removeGameWidgets();
        // }
        setIsEditor();
    };

    return { playGame };
};
