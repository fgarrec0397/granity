import { useIsEditor } from "@app/Editor/_actions/hooks";

export default () => {
    const { setIsEditor } = useIsEditor();

    const playGame = () => {
        setIsEditor();
        // SceneWidgetsContext
        // Widgets Reducer (with WidgetsDictionary)
    };

    return { playGame };
};
