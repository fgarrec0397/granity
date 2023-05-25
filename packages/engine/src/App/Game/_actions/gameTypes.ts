import { FieldType, WidgetType } from "@engine/App/Widgets/_actions/widgetsConstants";
import {
    DefaultWidgetProps,
    SerializedWidgetDictionaryItem,
    Widget,
    WidgetComponent,
    WidgetDictionaryItem,
    WidgetInfoDictionaryItem,
    WidgetModule,
    WidgetOptions,
    WidgetOptionsValues,
} from "@engine/App/Widgets/_actions/widgetsTypes";
import { Dictionary, Vector3Array } from "@granity/helpers";
import { ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from "react";

/// -------------------------- Misc --------------------------- ///

/**
 * Additional props that applies for widgets in the editor
 */
export interface GameEditableWidget {
    position: Vector3Array;
    rotation: Vector3Array;
    scale: Vector3Array;
}

export type HelpersTypes = {
    [key: string]: HelperTypeValue;
};

export type HelperTypeValue = string;

/// ---------------------- Game Widget ---------------------- ///

/**
 * Base widget type
 */
export type GameWidget<Props = DefaultWidgetProps, Ref = null, Options = WidgetOptions> = Omit<
    Widget<Props, Options>,
    "component"
> & {
    component: GameWidgetComponent<Props, Ref>;
};

export type GameWidgetModule<
    Props = DefaultWidgetProps,
    Ref = null,
    Options = WidgetOptions
> = Omit<WidgetModule<WidgetType.GameObject, Props, Options>, "component"> & {
    component: GameWidgetComponent<Props, Ref>;
    hasRef?: true;
    editorOptions?: GameWidgetObjectEditorOptions;
};

/**
 * A component type of a widget
 */
export type GameWidgetComponent<Props = DefaultWidgetProps, Ref = null> =
    | WidgetComponent
    | ForwardRefExoticComponent<PropsWithoutRef<Props> & RefAttributes<Ref>>;

/**
 * Widget options to set in the editor
 */
export type GameWidgetObjectEditorOptions = {
    helper?: ((options?: WidgetOptionsValues) => HelperTypeValue) | HelperTypeValue;
    gizmo?: boolean | GameWidgetGizmoConfig;
};

/**
 * Gizmo config object type
 */
export type GameWidgetGizmoConfig = {
    text: string;
};

/// ------------------- Widgets Dictionary -------------------- ///

/**
 * A dictionary containing informations about all widgets
 */
export type GameWidgetDictionary = Dictionary<GameWidgetDictionaryItem>;

/**
 * Informations of a widget
 */
export type GameWidgetDictionaryItem = WidgetDictionaryItem;

/// -------------- Serialized Widgets Dictionary -------------- ///

/**
 * A dictionary containing informations about all widgets
 */
export type SerializedGameWidgetDictionary = Dictionary<SerializedGameWidgetDictionaryItem>;

/**
 * Informations of a widget
 */
export type SerializedGameWidgetDictionaryItem = Omit<SerializedWidgetDictionaryItem, "gizmo"> & {
    gizmo: string;
};

/// ----------------- Widgets Info Dictionary ----------------- ///

/**
 * A dictionary containing editable informations about a WidgetObject
 */
export type GameWidgetInfoDictionary = Dictionary<GameWidgetInfoDictionaryItem>;

export type GameWidgetInfoDictionaryItem<TValue = string> = WidgetInfoDictionaryItem<TValue> & {
    properties?: GameWidgetProperties;
};

export type GameWidgetProperties = {
    position: Vector3Array;
    rotation: Vector3Array;
    scale: Vector3Array;
};
