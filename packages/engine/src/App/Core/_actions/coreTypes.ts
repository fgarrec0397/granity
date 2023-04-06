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

export type EngineEndpoints = {
    files?: {
        get?: string;
        save?: string;
    };
    scenes?: {
        get?: string;
        save?: string;
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

export type FetchStatus = "isLoading" | "isSuccess" | "isError";
