import { FieldType } from "@engine/App/Widgets/_actions/widgetsConstants";
import {
    BaseWidgetInfo,
    DefaultWidgetProps,
    Widget,
    WidgetBaseOptions,
    WidgetDictionaryItem,
    WidgetModule,
    WidgetOptions,
} from "@engine/App/Widgets/_actions/widgetsTypes";
import { Dictionary, UnionOfProperties, Vector3Array } from "@granity/helpers";
import { Slice } from "@reduxjs/toolkit";
import { FC, ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from "react";

/// -------------------------- Misc --------------------------- ///

export type HelpersTypes = {
    [key: string]: HelperTypeValue;
};

export type HelperTypeValue = string;

/// ---------------------- Game Widget ---------------------- ///

/**
 * Base widget type
 */
export type GameWidget<Props = DefaultWidgetProps, Ref = null, Options = WidgetOptions> = Omit<
    Widget<Props, Ref, Options>,
    "component"
> & {
    component: WidgetComponent<Props, Ref>;
    options?: Options[];
};

export type GameWidgetModule<Type = WidgetType.GameObject> = WidgetModule<Type> & {
    hasRef?: true;
    editorOptions?: WidgetObjectEditorOptions;
    isFrozen?: boolean;
};

/**
 * A component type of a widget
 */
export type WidgetComponent<Props = DefaultWidgetProps, Ref = null> =
    | FC<Props>
    | ForwardRefExoticComponent<PropsWithoutRef<Props> & RefAttributes<Ref>>;

/**
 * Widget options to set in the editor
 */
export type WidgetObjectEditorOptions = {
    helper?: ((options?: WidgetOptionsValues) => HelperTypeValue) | HelperTypeValue;
    gizmo?: boolean | GizmoConfig;
};

/**
 * Gizmo config object type
 */
export type GizmoConfig = {
    text: string;
};

/// --------------------- Widget Options ---------------------- ///

/**
 * All options allowed for the widget in the editor
 */
export type GameWidgetOptions = WidgetOptions | Vector3FieldOption;

export type Vector3FieldOption = WidgetBaseOptions<FieldType.Vector3, Vector3Array>;

/// ------------------- Widgets Dictionary -------------------- ///

/**
 * A dictionary containing informations about all widgets
 */
export type GameWidgetDictionary = Dictionary<GameWidgetDictionaryItem>;

/**
 * Informations of a widget
 */
export type GameWidgetDictionaryItem = Omit<WidgetModule, "reducer"> & {
    id: string;
};

/// -------------- Serialized Widgets Dictionary -------------- ///

/**
 * A dictionary containing informations about all widgets
 */
export type SerializedGameWidgetDictionary = Dictionary<SerializedGameWidgetDictionaryItem>;

/**
 * Informations of a widget
 */
export type SerializedGameWidgetDictionaryItem = Omit<
    WidgetDictionaryItem,
    "component" | "gizmo"
> & {
    gizmo: string;
};

/// ----------------- Widgets Info Dictionary ----------------- ///

/**
 * A dictionary containing editable informations about a WidgetObject
 */
export type GameWidgetInfoDictionary = Dictionary<GameWidgetInfoDictionaryItem>;

export type GameWidgetInfoDictionaryItem<TValue = string> = BaseWidgetInfo & {
    properties?: WidgetProperties;
    options?: WidgetOptionsValues<TValue>;
    isVisible: boolean;
};

export type WidgetOptionsValues<TValue = string> = Dictionary<{
    fieldType: FieldType;
    value: TValue;
}>;

export type WidgetProperties = {
    position: Vector3Array;
    rotation: Vector3Array;
    scale: Vector3Array;
};
