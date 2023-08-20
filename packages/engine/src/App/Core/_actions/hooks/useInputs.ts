import { defaultInputs } from "@engine/App/Core/_actions/coreConstants";
import useEditor from "@engine/App/Editor/_actions/hooks/useEditor";
import { clone } from "@granity/helpers";
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
    event?: EventType
) => {
    const clientKeyMapped: AppsClientInput = {};
    const eventsNameToReset: string[] = [];

    for (const key in keyMapped[keyboardType]) {
        keyMapped[keyboardType][key] = {
            ...keyMapped[keyboardType][key],
            value: event ? keyMapped[keyboardType][key].trigger(event as any) : false,
        };

        if (keyMapped[keyboardType][key].value && keyMapped[keyboardType][key].shouldResetValue) {
            eventsNameToReset.push(key);
        }

        clientKeyMapped[key] = keyMapped[keyboardType][key].value;
    }

    return { clientKeyMapped, eventsNameToReset };
};

const useInputs = <HandlerType extends InputsMappingHandler>(
    handler: HandlerType,
    dependencies: DependencyList
) => {
    const handlerCallback = useCallback(handler, [handler, ...dependencies]);
    const [keyboardType, setKeyboardType] = useState<InputsType>("editor");
    const [availableEvents, setAvailableEvents] = useState<(keyof WindowEventMap)[]>([]);
    const [clientInput, setClientInput] = useState<AppsClientInput>();
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

                    if (event.type !== x.event) {
                        return false;
                    }

                    if ("code" in event && "code" in x) {
                        return hasCtrlKey && hasShifKey && event.code === x.code;
                    }

                    if ("button" in event && "button" in x) {
                        return hasCtrlKey && hasShifKey && event.button === x.button;
                    }

                    return false;
                },
                value: false,
                shouldResetValue: x.isFire,
            };
        });

        if (eventsArray.length) {
            setAvailableEvents(eventsArray);
        }

        return newMapping;
    }, [inputsConfig, keyboardType]);

    const resetValues = useCallback(
        (clientKeyMapped: AppsClientInput, eventsNameToReset: string[]) => {
            if (!eventsNameToReset?.length) {
                return clientKeyMapped;
            }

            // wait a frame
            setTimeout(() => {
                const clonedClientKeyMapped = clone(clientKeyMapped);

                eventsNameToReset.forEach((x) => {
                    clonedClientKeyMapped[x] = false;
                });

                handlerCallback(clonedClientKeyMapped);
                setClientInput(clientKeyMapped);
            }, 30);
        },
        [handlerCallback]
    );

    useEffect(() => {
        const eventHandler = <EventType extends Event>(event: EventType) => {
            const { clientKeyMapped, eventsNameToReset } = triggerAllMappedKeys(
                keysMapping,
                keyboardType,
                event
            );
            handlerCallback(clientKeyMapped);
            setClientInput(clientKeyMapped);
            resetValues(clientKeyMapped, eventsNameToReset);
        };

        availableEvents.forEach((x) => {
            window.addEventListener(x, eventHandler);
        });

        return () => {
            availableEvents.forEach((x) => {
                window.removeEventListener(x, eventHandler);
            });
        };
    }, [availableEvents, handlerCallback, keyboardType, keysMapping, resetValues]);

    return clientInput;
};

export default useInputs;
