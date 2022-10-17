import keyboardMappings from "@app/Core/configs/keyboardMappings";
import { defaultKeyMappingObj } from "@app/Core/coreConstants";
import {
    ClientKeyMappings,
    KeyboardMappingHandler,
    KeyboardMappings,
    KeyboardType,
} from "@app/Core/coreTypes";
import useEditor from "@app/Editor/_actions/hooks/useEditor";
import { DependencyList, useCallback, useEffect, useMemo, useState } from "react";

const triggerAllMappedKeys = (
    keyMapped: KeyboardMappings,
    keyboardType: KeyboardType,
    event: KeyboardEvent
) => {
    const clientKeyMapped: ClientKeyMappings = {};

    for (const key in keyMapped[keyboardType]) {
        keyMapped[keyboardType][key] = {
            ...keyMapped[keyboardType][key],
            value: event ? keyMapped[keyboardType][key].trigger(event) : false,
        };

        clientKeyMapped[key] = keyMapped[keyboardType][key].value;
    }

    return clientKeyMapped;
};

export default (handler: KeyboardMappingHandler, dependencies: DependencyList) => {
    const handlerCallback = useCallback(handler, [handler, ...dependencies]);
    const [keyboardType, setKeyboardType] = useState<KeyboardType>("editor");
    const { isEditor } = useEditor();

    useEffect(() => {
        if (isEditor) {
            setKeyboardType("editor");
        } else {
            setKeyboardType("game");
        }
    }, [isEditor]);

    const keysMapping = useMemo((): KeyboardMappings => {
        const newMapping = defaultKeyMappingObj;

        keyboardMappings[keyboardType].forEach((x) => {
            newMapping[keyboardType][x.name] = {
                trigger: (event: KeyboardEvent) => {
                    const hasCtrlKey = x.ctrlKey ? event.ctrlKey : !event.ctrlKey;
                    const hasShifKey = x.shiftKey ? event.shiftKey : !event.shiftKey;

                    return hasCtrlKey && hasShifKey && event.code === x.code;
                },
                value: false,
            };
        });

        return newMapping;
    }, [keyboardType]);

    useEffect(() => {
        const onKeyUpHandler = (event: KeyboardEvent) => {
            handlerCallback(triggerAllMappedKeys(keysMapping, keyboardType, event));
        };

        window.addEventListener("keyup", onKeyUpHandler);

        return () => {
            window.removeEventListener("keyup", onKeyUpHandler);
        };
    }, [handlerCallback, keyboardType, keysMapping]);
};
