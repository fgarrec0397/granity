import { ScenesDictionary } from "@engine/App/Scenes/_actions/scenesTypes";
import { WidgetModules } from "@engine/App/Widgets/_actions/widgetsTypes";
import { Dictionary } from "@granity/helpers";
import { ReactNode } from "react";

import keyboardMappings from "../configs/keyboardMappings";

// --- Store --- //

// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-empty-interface
export interface FeaturesState {} // This interface make sure module augmentation is possible

// --- Engine Configs --- //

export type EditorMainMenuItem = {
    text: string;
    onClick: () => void;
    icon?: ReactNode;
};

export type RestApiEnpoints = { get?: string; save?: string; patch?: string; delete?: string };

export type EngineEndpoints = {
    files?: RestApiEnpoints;
    scenes?: RestApiEnpoints;
    app?: RestApiEnpoints;
    processes?: {
        generateJsxFromGlb?: string;
    };
};

export type EngineConfig = {
    widgetsModules: WidgetModules[];
    keyboardMappings?: KeyboardKeys;
    editorMainMenu?: EditorMainMenuItem[];
    endpoints?: EngineEndpoints;
};

// --- Key Bindings --- //

export type KeyboardApp<MappingType> = Dictionary<MappingType>;

export type KeyboardKeys = KeyboardApp<Array<KeyboardKeysItem>>;

export type KeyboardKeysItem = {
    name: string;
    code: string;
    ctrlKey: boolean;
    shiftKey: boolean;
    preventDefault: boolean;
};

export type KeyboardMappings = KeyboardApp<KeyMappings>;

export type KeyMappings = {
    [key: (typeof keyboardMappings.editor)[number]["name"]]: {
        value: boolean;
        trigger: (event: KeyboardEvent) => boolean;
    };
};

export type EditorClientKeyMappings = {
    [key: (typeof keyboardMappings.editor)[number]["name"]]: boolean;
};

export type GameClientKeyMappings = {
    [key: (typeof keyboardMappings.game)[number]["name"]]: boolean;
};

export type ClientKeyMappings = EditorClientKeyMappings | GameClientKeyMappings;

export type KeyboardMappingHandler = (keyMapping: ClientKeyMappings) => void;

export type KeyboardType = keyof typeof keyboardMappings;

// --- API --- //

export type FetchStatus = "loading" | "success" | "error";

// --- App --- //

export type AppStatus = "pending" | "saved" | "published";

export type AppScenes = {
    scenes?: ScenesDictionary;
    editedAt: Date;
    name: string;
};

export type SerializedAppScenes = {
    scenes?: string;
    editedAt: Date;
    name: string;
};

export type App<ScenesType = AppScenes> = {
    savedScenes?: ScenesType;
    publishedScenes?: ScenesType;
    status?: AppStatus;
};
