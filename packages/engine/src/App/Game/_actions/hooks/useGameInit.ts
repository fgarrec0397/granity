import useEditor from "@engine/App/Editor/_actions/hooks/useEditor";
import { useEffect } from "react";

/**
 * This hook is executed once when it arrives on the scene.
 *
 * It uses useEffect behind the scene, so the first callback is executed on mount and the second callback for the clean up function.
 *
 * If you want to share some data from the mount callback to the unmount callback, just return the value you want to share from the mount callback and get it through the parameter of the unmount callback.
 *
 * @param onMountCallback Callback that is executed when the game init.
 * @param onUnMountCallback Callback that is executed when the component unmount.
 * @param ignoreEditor A flag to execute the code even in the editor
 */
export default <T>(
    onMountCallback: () => T,
    onUnMountCallback?: (data: T) => void,
    ignoreEditor?: boolean
) => {
    const { isGame, isGamePreview, isPreview } = useEditor();

    const shouldInitGame = isGame || isGamePreview || isPreview;

    useEffect(() => {
        let returnedValue: T;

        if (shouldInitGame || ignoreEditor) {
            returnedValue = onMountCallback();
        }

        return () => {
            if (shouldInitGame) {
                onUnMountCallback?.(returnedValue);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldInitGame]);
};
