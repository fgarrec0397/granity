import defaultKeyboardMappings from "@engine/App/Core/configs/keyboardMappings";
import { DeepNonNullable, HasChildren } from "@granity/helpers";
import { createContext, Dispatch, FC, SetStateAction, useState } from "react";

import { EngineConfig } from "../../coreTypes";

export type ConfigContexEditorMainMenu = EngineConfig["editorMainMenu"];
export type ConfigContexEndpoints = NonNullable<DeepNonNullable<EngineConfig["endpoints"]>>;
export type ConfigContexKeyboardMapping = EngineConfig["keyboardMappings"];

export type ConfigContextModel = {
    keyboardMappings: ConfigContexKeyboardMapping;
    editorMainMenu: ConfigContexEditorMainMenu;
    endpoints: ConfigContexEndpoints;
    setKeyboardMappings: (() => void) | Dispatch<SetStateAction<ConfigContexKeyboardMapping>>;
    setEditorMainMenu: (() => void) | Dispatch<SetStateAction<ConfigContexEditorMainMenu>>;
    setEndpoints: (() => void) | Dispatch<SetStateAction<ConfigContexEndpoints>>;
};

export const defaultEnpoints: ConfigContexEndpoints = {
    files: {
        save: "/server/files",
        get: "/server/files",
        delete: "/server/files",
    },
    scenes: {
        save: "/server/scenes",
        get: "/server/scenes",
        delete: "/server/scenes",
    },
};

export const ConfigContext = createContext<ConfigContextModel>({
    keyboardMappings: defaultKeyboardMappings,
    editorMainMenu: [],
    endpoints: defaultEnpoints,
    setKeyboardMappings: () => {},
    setEditorMainMenu: () => {},
    setEndpoints: () => {},
});

type Props = HasChildren;

const ConfigContextProvider: FC<Props> = ({ children }) => {
    const [keyboardMappings, setKeyboardMappings] =
        useState<ConfigContexKeyboardMapping>(defaultKeyboardMappings);
    const [editorMainMenu, setEditorMainMenu] = useState<ConfigContexEditorMainMenu>([]);
    const [endpoints, setEndpoints] = useState<ConfigContexEndpoints>(defaultEnpoints);

    const providerValue: ConfigContextModel = {
        keyboardMappings,
        editorMainMenu,
        endpoints,
        setKeyboardMappings,
        setEditorMainMenu,
        setEndpoints,
    };

    return <ConfigContext.Provider value={providerValue}>{children}</ConfigContext.Provider>;
};

export default ConfigContextProvider;
