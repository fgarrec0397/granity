import { FieldType, WidgetType } from "@engine/App/Widgets/_actions/widgetsConstants";
import {
    DefaultWidgetProps,
    SerializedWidgetDictionaryItem,
    Widget,
    WidgetBaseOptions,
    WidgetComponent,
    WidgetInfoDictionary,
    WidgetModule,
    WidgetOptions,
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
    options?: Options[];
};

export type GameWidgetModule<Type extends WidgetType = WidgetType.GameObject> =
    WidgetModule<Type> & {
        hasRef?: true;
        editorOptions?: GameWidgetObjectEditorOptions;
        isFrozen?: boolean;
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
export type SerializedGameWidgetDictionaryItem = Omit<SerializedWidgetDictionaryItem, "gizmo"> & {
    gizmo: string;
};

/// ----------------- Widgets Info Dictionary ----------------- ///

/**
 * A dictionary containing editable informations about a WidgetObject
 */
export type GameWidgetInfoDictionary = Dictionary<GameWidgetInfoDictionaryItem>;

export type GameWidgetInfoDictionaryItem<TValue = string> = WidgetInfoDictionary & {
    properties?: GameWidgetProperties;
    options?: WidgetOptionsValues<TValue>;
    isVisible: boolean;
};

export type WidgetOptionsValues<TValue = string> = Dictionary<{
    fieldType: FieldType;
    value: TValue;
}>;

export type GameWidgetProperties = {
    position: Vector3Array;
    rotation: Vector3Array;
    scale: Vector3Array;
};
