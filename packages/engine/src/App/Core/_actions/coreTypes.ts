import { ScenesDictionary } from "@engine/App/Scenes/_actions/scenesTypes";
import { WidgetModule } from "@engine/App/Widgets/_actions/widgetsTypes";
import { Dictionary, RecursiveArrayOfIds, RecursiveArrayOfIdsItem } from "@granity/helpers";
import { ReactNode } from "react";

import inputsConfig from "../configs/inputsConfig";

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
    app?: RestApiEnpoints;
    processes?: {
        generateJsxFromGlb?: string;
    };
};

export type EngineConfig = {
    physicsEnabled?: boolean;
    widgetsModules: WidgetModule[];
    inputsConfig?: InputsConfig;
    editorMainMenu?: EditorMainMenuItem[];
    endpoints?: EngineEndpoints;
};

// --- Inputs --- //

/**
 * Input config object type
 */
export type InputsConfig = InputsConfigApp<InputsConfigAppItem[]>;

/**
 * Input config by app (editor, game)
 */
export type InputsConfigApp<MappingType> = Dictionary<MappingType>;

/**
 * Item of an input config by app object
 */
export type InputsConfigAppItem = InputKeyItem | InputMouseItem;

/**
 * Base type of an input config object
 */
export type BaseInputItem<EventType extends keyof WindowEventMap> = {
    name: string;
    event: EventType;
    ctrlKey: boolean;
    shiftKey: boolean;
    preventDefault: boolean;
};

/**
 * Mouse up event input config object
 */
export type InputMouseItem = BaseInputItem<"mouseup"> & {
    button: number;
};

/**
 * Key up event input config object
 */
export type InputKeyItem = BaseInputItem<"keyup"> & {
    code: string;
};

/**
 * A representation of the inputs config object that is responsible to trigger the event by app (editor, game)
 */
export type TriggerableInputsApp = InputsConfigApp<TriggerableInputs>;

/**
 * A representation of the inputs config object that is responsible to trigger the event
 */
export type TriggerableInputs = {
    [key: (typeof inputsConfig.editor)[number]["name"]]: {
        value: boolean;
        trigger: (
            event: WindowEventMap[(typeof inputsConfig)[keyof typeof inputsConfig][number]["event"]]
        ) => boolean;
    };
};

/**
 * Object that reflects the triggered event of the editor app
 */
export type EditorClientInput = {
    [key: (typeof inputsConfig.editor)[number]["name"]]: boolean;
};

/**
 * Object that reflects the triggered event of the game app
 */
export type GameClientInput = {
    [key: (typeof inputsConfig.game)[number]["name"]]: boolean;
};

/**
 * Object that reflects the triggered event in all apps
 */
export type AppsClientInput = EditorClientInput | GameClientInput;

/**
 * Handler given to the useIn
 */
export type InputsMappingHandler<ClientInputType extends AppsClientInput = AppsClientInput> = (
    input: ClientInputType
) => void | Promise<void>;

export type InputsType = keyof typeof inputsConfig;

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

// --- Files --- //

export type FilesData = {
    currentRootPath: string;
    folders: FileItem[];
    files: FileItem[];
};

export type FileItem = {
    path: string;
    name: string;
    type: string;
};

// --- Data --- //

export type IdsArray = RecursiveArrayOfIds<string>;
export type IdsArrayItem = RecursiveArrayOfIdsItem<string>;
