import { defaultKeyMappingObj } from "@engine/App/Core/_actions/coreConstants";
import useEditor from "@engine/App/Editor/_actions/hooks/useEditor";
import { DependencyList, useCallback, useEffect, useMemo, useState } from "react";

import { ClientInput, InputsMapping, InputsMappingHandler, InputsType } from "../inputsTypes";
import useConfig from "./useConfig";

const triggerAllMappedKeys = (
    keyMapped: InputsMapping,
    keyboardType: InputsType,
    event: KeyboardEvent
) => {
    const clientKeyMapped: ClientInput = {};

    for (const key in keyMapped[keyboardType]) {
        keyMapped[keyboardType][key] = {
            ...keyMapped[keyboardType][key],
            value: event ? keyMapped[keyboardType][key].trigger(event) : false,
        };

        clientKeyMapped[key] = keyMapped[keyboardType][key].value;
    }

    return clientKeyMapped;
};

export default (handler: InputsMappingHandler, dependencies: DependencyList) => {
    const handlerCallback = useCallback(handler, [handler, ...dependencies]);
    const [keyboardType, setKeyboardType] = useState<InputsType>("editor");
    const { isEditor } = useEditor();
    const { keyboardMappings } = useConfig();

    useEffect(() => {
        if (isEditor) {
            setKeyboardType("editor");
        } else {
            setKeyboardType("game");
        }
    }, [isEditor]);

    const keysMapping = useMemo((): InputsMapping => {
        const newMapping = defaultKeyMappingObj;

        keyboardMappings?.[keyboardType].forEach((x) => {
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
        // TODO - continue here. Add dynamically event according to the "event" property
        const onKeyUpHandler = (event: KeyboardEvent) => {
            handlerCallback(triggerAllMappedKeys(keysMapping, keyboardType, event));
        };

        window.addEventListener("keyup", onKeyUpHandler);

        return () => {
            window.removeEventListener("keyup", onKeyUpHandler);
        };
    }, [handlerCallback, keyboardType, keysMapping]);
};
