import keyboardMappings from "@app/Core/configs/keyboardMappings";
import { KeyboardMappingHandler, KeyboardMappings } from "@app/Core/coreTypes";
import { DependencyList, useCallback, useEffect, useMemo } from "react";

export default (handler: KeyboardMappingHandler, dependencies: DependencyList) => {
    const handlerCallback = useCallback(handler, [handler, ...dependencies]);

    const keysMapping = useMemo((): KeyboardMappings => {
        const newMapping: KeyboardMappings = {
            editor: {},
            game: {},
        };
        keyboardMappings.editor.forEach((x) => {
            newMapping.editor[x.name] = (event: KeyboardEvent) => {
                const hasCtrlKey = x.ctrlKey ? event.ctrlKey : true;
                const hasShifKey = x.shiftKey ? event.shiftKey : true;

                return hasCtrlKey && hasShifKey && event.code === x.code;
            };
        });

        return newMapping;
    }, []);

    useEffect(() => {
        const onKeyUpHandler = (event: KeyboardEvent) => {
            handlerCallback(keysMapping)(event);
        };

        window.addEventListener("keyup", onKeyUpHandler);

        return () => {
            window.removeEventListener("keyup", onKeyUpHandler);
        };
    }, [handlerCallback, keysMapping]);
};
