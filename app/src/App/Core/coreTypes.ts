import keyboardMappings from "./configs/keyboardMappings";

export type BaseApiParameter<T> = {
    isLoading: boolean;
    data: T;
    error: string;
};

// --- Key Bindings --- //

export type KeyboardApp<MappingType> = {
    editor: MappingType;
    game: MappingType;
};

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
    [key: typeof keyboardMappings.editor[number]["name"]]: {
        value: boolean;
        trigger: (event: KeyboardEvent) => boolean;
    };
};

export type EditorClientKeyMappings = {
    [key: typeof keyboardMappings.editor[number]["name"]]: boolean;
};

export type GameClientKeyMappings = {
    [key: typeof keyboardMappings.game[number]["name"]]: boolean;
};

export type ClientKeyMappings = EditorClientKeyMappings | GameClientKeyMappings;

export type KeyboardMappingHandler = (keyMapping: ClientKeyMappings) => void;

export type KeyboardType = keyof typeof keyboardMappings;
