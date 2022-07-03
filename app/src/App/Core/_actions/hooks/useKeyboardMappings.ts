import keyboardMappings from "@app/Core/configs/keyboardMappings";
import { KeyboardMappingHandler, KeyboardMappings } from "@app/Core/coreTypes";
import { DependencyList, useEffect, useState } from "react";

const callAllFunctions = (keyMapped: KeyboardMappings, event: KeyboardEvent) => {
    Object.values(keyMapped.editor).map((value) => {
        if (typeof value === "function") {
            value(event);
        }
    });

    return keyMapped;
};

const test = (): KeyboardMappings => {
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
    console.log(newMapping, "newMapping");

    return newMapping;
};

export default (handler: KeyboardMappingHandler, dependencies?: DependencyList | undefined) => {
    useEffect(() => {
        window.addEventListener("keyup", (event) => handler(test())(event));

        return () => {
            window.removeEventListener("keyup", (event) => handler(test())(event));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);
};
