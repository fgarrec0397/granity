import defaultInputs from "@engine/App/Core/configs/inputsConfig";
import { DeepNonNullable, HasChildren } from "@granity/helpers";
import { createContext, Dispatch, FC, SetStateAction, useState } from "react";

import { EngineConfig } from "../../coreTypes";

export type ConfigContextEditorMainMenu = EngineConfig["editorMainMenu"];
export type ConfigContextEndpoints = NonNullable<DeepNonNullable<EngineConfig["endpoints"]>>;
export type ConfigContextInputsConfig = EngineConfig["inputsConfig"];

export type ConfigContextModel = {
    inputsConfig: ConfigContextInputsConfig;
    editorMainMenu: ConfigContextEditorMainMenu;
    endpoints: ConfigContextEndpoints;
    setInputsConfig: (() => void) | Dispatch<SetStateAction<ConfigContextInputsConfig>>;
    setEditorMainMenu: (() => void) | Dispatch<SetStateAction<ConfigContextEditorMainMenu>>;
    setEndpoints: (() => void) | Dispatch<SetStateAction<ConfigContextEndpoints>>;
};

// TODO - Check why these values are not overridable
export const defaultEnpoints: ConfigContextEndpoints = {
    files: {
        get: "/server/files",
        save: "/server/files",
        patch: "/server/files",
        delete: "/server/files",
    },
    app: {
        save: "/server/app",
        get: "/server/app",
        patch: "/server/app",
        delete: "/server/app",
    },
    processes: {
        generateJsxFromGlb: "/server/processes/runGltfjsx",
    },
};

export const ConfigContext = createContext<ConfigContextModel>({
    inputsConfig: defaultInputs,
    editorMainMenu: [],
    endpoints: defaultEnpoints,
    setInputsConfig: () => {},
    setEditorMainMenu: () => {},
    setEndpoints: () => {},
});

type Props = HasChildren;

const ConfigContextProvider: FC<Props> = ({ children }) => {
    const [inputsConfig, setInputsConfig] = useState<ConfigContextInputsConfig>(defaultInputs);
    const [editorMainMenu, setEditorMainMenu] = useState<ConfigContextEditorMainMenu>([]);
    const [endpoints, setEndpoints] = useState<ConfigContextEndpoints>(defaultEnpoints);

    const providerValue: ConfigContextModel = {
        inputsConfig,
        editorMainMenu,
        endpoints,
        setInputsConfig,
        setEditorMainMenu,
        setEndpoints,
    };

    return <ConfigContext.Provider value={providerValue}>{children}</ConfigContext.Provider>;
};

export default ConfigContextProvider;
