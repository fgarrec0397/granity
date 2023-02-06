import { Dictionary } from "@granity/helpers";
import { ScenesDictionary, WidgetModules } from "@granity-engine/api";

import keyboardMappings from "../configs/keyboardMappings";

export type EngineConfig = {
    widgetsModules: WidgetModules[];
    keyboardMappings?: KeyboardKeys;
    onSave?: (scenes: ScenesDictionary | null) => Promise<{
        status: boolean;
        message: string;
    }>;
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
