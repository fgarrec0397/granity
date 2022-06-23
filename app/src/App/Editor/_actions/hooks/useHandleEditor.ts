import { notification } from "antd";
import { useEffect } from "react";
import useIsEditor from "./useIsEditor";

export default () => {
    const { isEditor, setIsEditor } = useIsEditor();

    useEffect(() => {
        const handleKeyUp = (event: KeyboardEvent): void => {
            if (event.code === "KeyE") {
                setIsEditor();
            }
        };
        document.addEventListener("keyup", handleKeyUp);

        return () => {
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, [setIsEditor]);

    useEffect(() => {
        if (isEditor) {
            document.exitPointerLock();
            notification.open({
                message: "Edit mode",
                description: "You entered in edit mode",
            });
        } else {
            notification.open({
                message: "Normal mode",
                description: "You entered in normal mode",
            });
        }
    }, [isEditor]);
};
