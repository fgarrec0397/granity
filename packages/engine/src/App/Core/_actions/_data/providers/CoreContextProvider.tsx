import defaultKeyboardMappings from "@engine/App/Core/configs/keyboardMappings";
import { HasChildren } from "@granity/helpers";
import { createContext, Dispatch, FC, SetStateAction, useReducer, useState } from "react";

import { EngineConfig, KeyboardKeys } from "../../coreTypes";

export type CoreContextModel = {
    reducer: [CoreReducerState, Dispatch<CoreReducerAction>];
    keyboardMappings: KeyboardKeys;
    editorMainMenu: EngineConfig["editorMainMenu"];
    setKeyboardMappings: (() => void) | Dispatch<SetStateAction<KeyboardKeys>>;
    setEditorMainMenu: (() => void) | Dispatch<SetStateAction<EngineConfig["editorMainMenu"]>>;
};

export const CoreContext = createContext<CoreContextModel>({
    reducer: [{ onSave: () => {} }, () => {}],
    keyboardMappings: defaultKeyboardMappings,
    editorMainMenu: [],
    setKeyboardMappings: () => {},
    setEditorMainMenu: () => {},
});

export enum CoreAction {
    ON_SAVE = "ON_SAVE",
}

type CoreReducerAction = {
    type: CoreAction;
    payload?: EngineConfig["onSave"];
};

type CoreReducerState = {
    onSave: EngineConfig["onSave"];
};

const coreReducer = (state: CoreReducerState, action: CoreReducerAction) => {
    switch (action.type) {
        case "ON_SAVE":
            return { onSave: action.payload };
        default:
            return state;
    }
};

type Props = HasChildren;
const CoreContextProvider: FC<Props> = ({ children }) => {
    const reducer = useReducer(coreReducer, { onSave: () => {} });
    const [keyboardMappings, setKeyboardMappings] = useState<KeyboardKeys>(defaultKeyboardMappings);
    const [editorMainMenu, setEditorMainMenu] = useState<EngineConfig["editorMainMenu"]>([]);

    const providerValue: CoreContextModel = {
        reducer,
        keyboardMappings,
        editorMainMenu,
        setKeyboardMappings,
        setEditorMainMenu,
    };

    return <CoreContext.Provider value={providerValue}>{children}</CoreContext.Provider>;
};

export default CoreContextProvider;
