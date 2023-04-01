import defaultKeyboardMappings from "@engine/App/Core/configs/keyboardMappings";
import { HasChildren } from "@granity/helpers";
import { createContext, Dispatch, FC, SetStateAction, useState } from "react";

import { EngineConfig } from "../../coreTypes";

type ConfigEditorMainMenu = EngineConfig["editorMainMenu"];
type ConfigEndpoints = EngineConfig["endpoints"];
type ConfigKeyboardMapping = EngineConfig["keyboardMappings"];

export type ConfigContextModel = {
    keyboardMappings: ConfigKeyboardMapping;
    editorMainMenu: ConfigEditorMainMenu;
    endpoints: ConfigEndpoints;
    setKeyboardMappings: (() => void) | Dispatch<SetStateAction<ConfigKeyboardMapping>>;
    setEditorMainMenu: (() => void) | Dispatch<SetStateAction<ConfigEditorMainMenu>>;
    setEndpoints: (() => void) | Dispatch<SetStateAction<ConfigEndpoints>>;
};

export const defaultEnpoints: ConfigEndpoints = {
    files: {
        save: "/server/files",
        get: "/server/files",
    },
    scenes: {
        save: "/server/scenes",
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
        useState<ConfigKeyboardMapping>(defaultKeyboardMappings);
    const [editorMainMenu, setEditorMainMenu] = useState<ConfigEditorMainMenu>([]);
    const [endpoints, setEndpoints] = useState<ConfigEndpoints>(defaultEnpoints);

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
