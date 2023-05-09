import { defaultInputs } from "@engine/App/Core/_actions/coreConstants";
import useEditor from "@engine/App/Editor/_actions/hooks/useEditor";
import { DependencyList, useCallback, useEffect, useMemo, useState } from "react";

import {
    AppsClientInput,
    InputsMappingHandler,
    InputsType,
    TriggerableInputsApp,
} from "../coreTypes";
import useConfig from "./useConfig";

const triggerAllMappedKeys = <EventType extends Event>(
    keyMapped: TriggerableInputsApp,
    keyboardType: InputsType,
    event: EventType
) => {
    const clientKeyMapped: AppsClientInput = {};

    for (const key in keyMapped[keyboardType]) {
        keyMapped[keyboardType][key] = {
            ...keyMapped[keyboardType][key],
            value: event ? keyMapped[keyboardType][key].trigger(event as any) : false,
        };

        clientKeyMapped[key] = keyMapped[keyboardType][key].value;
    }

    return clientKeyMapped;
};

const useInputs = <HandlerType extends InputsMappingHandler>(
    handler: HandlerType,
    dependencies: DependencyList
) => {
    const handlerCallback = useCallback(handler, [handler, ...dependencies]);
    const [keyboardType, setKeyboardType] = useState<InputsType>("editor");
    const [availableEvents, setAvailableEvents] = useState<(keyof WindowEventMap)[]>([]);
    const { isEditor } = useEditor();
    const { inputsConfig } = useConfig();

    useEffect(() => {
        if (isEditor) {
            setKeyboardType("editor");
        } else {
            setKeyboardType("game");
        }
    }, [isEditor]);

    const keysMapping = useMemo((): TriggerableInputsApp => {
        const newMapping = defaultInputs;
        const eventsArray: (keyof WindowEventMap)[] = [];

        inputsConfig?.[keyboardType].forEach((x) => {
            if (eventsArray.indexOf(x.event) === -1) {
                eventsArray.push(x.event);
            }

            newMapping[keyboardType][x.name] = {
                trigger: (event) => {
                    const hasCtrlKey = x.ctrlKey ? event.ctrlKey : !event.ctrlKey;
                    const hasShifKey = x.shiftKey ? event.shiftKey : !event.shiftKey;

                    if ("code" in event && "code" in x) {
                        return hasCtrlKey && hasShifKey && event.code === x.code;
                    }

                    if ("button" in event && "button" in x) {
                        return hasCtrlKey && hasShifKey && event.button === x.button;
                    }

                    return false;
                },
                value: false,
            };
        });

        if (eventsArray.length) {
            setAvailableEvents(eventsArray);
        }

        return newMapping;
    }, [inputsConfig, keyboardType]);

    useEffect(() => {
        const eventHandler = <EventType extends Event>(event: EventType) => {
            handlerCallback(triggerAllMappedKeys(keysMapping, keyboardType, event));
        };

        availableEvents.forEach((x) => {
            window.addEventListener(x, eventHandler);
        });

        return () => {
            availableEvents.forEach((x) => {
                window.removeEventListener(x, eventHandler);
            });
        };
    }, [availableEvents, handlerCallback, keyboardType, keysMapping]);
};

export default useInputs;
