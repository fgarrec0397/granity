import { Dictionary } from "@granity/helpers";

import inputsConfig from "../configs/inputsConfig";

/**
 * Input config object type
 */
export type InputsConfig = InputsConfigApp<InputsConfigAppItem[]>;

/**
 * Input config by app (editor, app)
 */
export type InputsConfigApp<MappingType> = Dictionary<MappingType>;

/**
 * Item of an input config by app object
 */
export type InputsConfigAppItem = InputKeyItem | InputMouseItem;

export type BaseInputItem<EventType extends keyof WindowEventMap> = {
    name: string;
    event: EventType;
    ctrlKey: boolean;
    shiftKey: boolean;
    preventDefault: boolean;
};

export type InputMouseItem = BaseInputItem<"mouseup">;

export type InputKeyItem = BaseInputItem<"keyup"> & {
    code: string;
};

export type InputsMapping = InputsConfigApp<TriggerableInputs>;

export type TriggerableInputs = {
    [key: (typeof inputsConfig.editor)[number]["name"]]: {
        value: boolean;
        trigger: (event: KeyboardEvent) => boolean;
    };
};

export type EditorClientInput = {
    [key: (typeof inputsConfig.editor)[number]["name"]]: boolean;
};

export type GameClientInput = {
    [key: (typeof inputsConfig.game)[number]["name"]]: boolean;
};

export type ClientInput = EditorClientInput | GameClientInput;

export type InputsMappingHandler = (keyMapping: ClientInput) => void;

export type InputsType = keyof typeof inputsConfig;
