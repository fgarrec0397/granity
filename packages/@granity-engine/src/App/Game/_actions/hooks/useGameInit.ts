import useEditor from "@granity-engine/App/Editor/_actions/hooks/useEditor";
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
    const { isEditor } = useEditor();

    useEffect(() => {
        let returnedValue: T;

        if (!isEditor || ignoreEditor) {
            returnedValue = onMountCallback();
        }

        return () => {
            if (!isEditor) {
                onUnMountCallback?.(returnedValue);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEditor]);
};
