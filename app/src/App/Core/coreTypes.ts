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
    ctrlKey?: boolean;
    shiftKey?: boolean;
};

export type KeyboardMappings = KeyboardApp<KeyMappings>;

export type KeyMappings = {
    [key: typeof keyboardMappings.editor[number]["name"]]: (event: KeyboardEvent) => boolean;
};

export type KeyboardMappingHandler = (
    keyMapping: KeyboardMappings
) => (event: KeyboardEvent) => void;
