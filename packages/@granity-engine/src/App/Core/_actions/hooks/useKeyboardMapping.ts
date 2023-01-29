import { defaultKeyMappingObj } from "@granity-engine/App/Core/_actions/coreConstants";
import {
    ClientKeyMappings,
    KeyboardMappingHandler,
    KeyboardMappings,
    KeyboardType,
} from "@granity-engine/App/Core/_actions/coreTypes";
import useEditor from "@granity-engine/App/Editor/_actions/hooks/useEditor";
import { DependencyList, useCallback, useEffect, useMemo, useState } from "react";

import useCore from "./useCore";

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
    const { keyboardMappings } = useCore();

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
    }, [keyboardMappings, keyboardType]);

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
