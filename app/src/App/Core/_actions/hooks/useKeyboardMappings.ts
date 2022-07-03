import keyboardMappings from "@app/Core/configs/keyboardMappings";
import { defaultKeyMappingObj } from "@app/Core/coreConstants";
import { KeyboardMappingHandler, KeyboardMappings } from "@app/Core/coreTypes";
import { DependencyList, useCallback, useEffect, useMemo } from "react";

const callAllKeyMappedReferences = (keyMapped: KeyboardMappings, event: KeyboardEvent) => {
    for (const key in keyMapped.editor) {
        keyMapped.editor[key] = {
            ...keyMapped.editor[key],
            value: keyMapped.editor[key].reference(event),
        };
    }

    return keyMapped;
};

export default (handler: KeyboardMappingHandler, dependencies: DependencyList) => {
    const handlerCallback = useCallback(handler, [handler, ...dependencies]);

    const keysMapping = useMemo((): KeyboardMappings => {
        const newMapping = defaultKeyMappingObj;

        keyboardMappings.editor.forEach((x) => {
            newMapping.editor[x.name] = {
                reference: (event: KeyboardEvent) => {
                    const hasCtrlKey = x.ctrlKey ? event.ctrlKey : true;
                    const hasShifKey = x.shiftKey ? event.shiftKey : true;

                    return hasCtrlKey && hasShifKey && event.code === x.code;
                },
                value: false,
            };
        });

        return newMapping;
    }, []);

    useEffect(() => {
        const onKeyUpHandler = (event: KeyboardEvent) => {
            handlerCallback(callAllKeyMappedReferences(keysMapping, event));
        };

        window.addEventListener("keyup", onKeyUpHandler);

        return () => {
            window.removeEventListener("keyup", onKeyUpHandler);
        };
    }, [handlerCallback, keysMapping]);
};
