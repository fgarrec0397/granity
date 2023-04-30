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

// TODO - Check why these values are not overridable
export const defaultEnpoints: ConfigContexEndpoints = {
    files: {
        get: "/server/files",
        save: "/server/files",
        patch: "/server/files",
        delete: "/server/files",
    },
    scenes: {
        save: "/server/scenes",
        get: "/server/scenes",
        patch: "/server/scenes",
        delete: "/server/scenes",
    },
    app: {
        save: "/server/scenes",
        get: "/server/scenes",
        patch: "/server/scenes",
        delete: "/server/scenes",
    },
    processes: {
        generateJsxFromGlb: "/server/processes/runGltfjsx",
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
