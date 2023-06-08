import { WidgetType } from "@engine/App/Widgets/_actions/widgetsConstants";
import {
    SerializedWidgetDictionaryItem,
    WidgetDictionaryItem,
    WidgetInfoDictionaryItem,
} from "@engine/App/Widgets/_actions/widgetsTypes";
import { Dictionary, EmptyObject, UnionOfProperties, Vector3Array } from "@granity/helpers";
import { Slice } from "@reduxjs/toolkit";
import { FC, ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from "react";

import { GameOptionsFieldTypes } from "./gameConstants";

/// ---------------- Types for external typing ---------------- ///

/**
 * Additional props that applies for widgets in the editor
 */
export interface GameEditableWidget {
    position: Vector3Array;
    rotation: Vector3Array;
    scale: Vector3Array;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GameWidgetProps extends GameEditableWidget {}
export type DefaultGameWidgetProps = UnionOfProperties<GameWidgetProps> | EmptyObject;

/// -------------------------- Misc --------------------------- ///

export type HelpersTypes = {
    [key: string]: HelperTypeValue;
};

export type HelperTypeValue = string;

/// ---------------------- GameWidget Module ---------------------- ///

/**
 * Base widget type
 */
export type GameWidget<Props = DefaultGameWidgetProps, Ref = null, Options = WidgetOptions> = {
    component: GameWidgetComponent<Props, Ref>;
    reducer: Slice | null;
    name: string;
    options?: Options[];
};

export type GameWidgetModule<
    Props = DefaultGameWidgetProps,
    Ref = null,
    Options = WidgetOptions
> = GameWidget<Props, Ref, Options> & {
    hasRef?: true;
    editorOptions?: GameWidgetEditorOptions;
    type: WidgetType.GameObject;
    isFrozen?: boolean;
};

/**
 * A component type of a widget
 */
export type GameWidgetComponent<Props = DefaultGameWidgetProps, Ref = null> =
    | FC<Props>
    | ForwardRefExoticComponent<PropsWithoutRef<Props> & RefAttributes<Ref>>;

/// --------------------- GameWidget Options ---------------------- ///

/**
 * All options allowed for the widget in the editor
 */
export type WidgetOptions =
    | CheckboxFieldOption
    | TextFieldOption
    | NumberFieldOption
    | Vector3FieldOption
    | FileFieldOption
    | SelectionFieldOption;

/**
 * Base interface for option object.
 */
export type WidgetBaseOptions<Type extends GameOptionsFieldTypes, TValue = string> = {
    name: string;
    displayName: string;
    fieldType: Type;
    defaultValue: TValue;
    isVisible?: ((options?: GameWidgetOptionsValues) => boolean | undefined) | boolean;
};

export type NumberFieldOption = WidgetBaseOptions<GameOptionsFieldTypes.Number, number>;

export type TextFieldOption = WidgetBaseOptions<GameOptionsFieldTypes.Text, string>;

export type CheckboxFieldOption = WidgetBaseOptions<GameOptionsFieldTypes.Checkbox, boolean>;

export type Vector3FieldOption = WidgetBaseOptions<GameOptionsFieldTypes.Vector3, Vector3Array>;

export type FileFieldOption = WidgetBaseOptions<GameOptionsFieldTypes.File, string>;

export type SelectionFieldOption = WidgetBaseOptions<GameOptionsFieldTypes.Select, string> & {
    selectOptions?: {
        value: string;
        name: string;
    }[];
};

/// ------------------ GameWidget Object Module ------------------- ///

/**
 * GameWidget options to set in the editor
 */
export type GameWidgetEditorOptions = {
    helper?: ((options?: GameWidgetOptionsValues) => HelperTypeValue) | HelperTypeValue;
    gizmo?: boolean | GizmoConfig;
};

/**
 * Gizmo config object type
 */
export type GizmoConfig = {
    text: string;
};

/// ---------------- Widgets Object Dictionary ---------------- ///

/**
 * A dictionary containing informations about all GameWidgetObjectsDictionary
 */
export type GameWidgetDictionary<Props = DefaultGameWidgetProps> = Dictionary<
    GameWidgetDictionaryItem<Props>
>;

/**
 * Informations of a widget object on the scene
 */
export type GameWidgetDictionaryItem<Props = DefaultGameWidgetProps> = WidgetDictionaryItem &
    Omit<GameWidgetModule<Props>, "reducer"> & {
        path: string;
        children: GameWidgetDictionary<Props>;
    };

/// -------------- Serialized Widgets Dictionary -------------- ///

/**
 * A dictionary containing informations about all widgets
 */
export type SerializedGameWidgetDictionary<Props = DefaultGameWidgetProps> = Dictionary<
    SerializedGameWidgetDictionaryItem<Props>
>;

/**
 * Informations of a widget
 */
export type SerializedGameWidgetDictionaryItem<Props = DefaultGameWidgetProps> =
    SerializedWidgetDictionaryItem &
        Omit<GameWidgetDictionaryItem<Props>, "editorOptions"> & {
            editorOptions: Omit<GameWidgetEditorOptions, "helper"> & {
                helper: string;
            };
        };

/**
 * A dictionary containing editable informations about a WidgetObject
 */
export type GameWidgetInfoDictionary = Dictionary<GameWidgetInfoDictionaryItem>;

export type GameWidgetInfoDictionaryItem<TValue = string> = WidgetInfoDictionaryItem & {
    properties?: GameWidgetProperties;
    options?: GameWidgetOptionsValues<TValue>;
    isVisible: boolean;
};

export type GameWidgetOptionsValues<TValue = string> = Dictionary<{
    fieldType: GameOptionsFieldTypes;
    value: TValue;
}>;

export type GameWidgetProperties = {
    position: Vector3Array;
    rotation: Vector3Array;
    scale: Vector3Array;
};

/// -------------- Game Widgets Actions Parameters -------------- ///

export type GameWidgetValueParameter<TValue = string> = Partial<
    Omit<GameWidgetInfoDictionaryItem<TValue>, "id">
>;
