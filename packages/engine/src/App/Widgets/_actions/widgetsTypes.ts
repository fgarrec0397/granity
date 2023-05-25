import { Dictionary, UnionOfProperties, Vector3Array } from "@granity/helpers";
import { Slice } from "@reduxjs/toolkit";
import { FC } from "react";

import { FieldType, WidgetType } from "./widgetsConstants";

/// ---------------- Types for external typing ---------------- ///

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface WidgetProps {}
export type DefaultWidgetProps = UnionOfProperties<WidgetProps>;

/// ---------------------- Widget Module ---------------------- ///

/**
 * Base widget type
 */
export type Widget<Props = DefaultWidgetProps, Options = WidgetOptions> = {
    component: WidgetComponent<Props>;
    reducer: Slice | null;
    name: string;
    options?: Options[];
};

export type WidgetModule<Type extends WidgetType = WidgetType.GameObject> = Widget & {
    type: Type;
};

/**
 * A component type of a widget
 */
export type WidgetComponent<Props = DefaultWidgetProps> = FC<Props>;

/// --------------------- Widget Options ---------------------- ///

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
export type WidgetBaseOptions<Type extends FieldType, TValue = string> = {
    name: string;
    displayName: string;
    fieldType: Type;
    defaultValue: TValue;
    isVisible?: ((options?: WidgetOptionsValues) => boolean | undefined) | boolean;
};

export type NumberFieldOption = WidgetBaseOptions<FieldType.Number, number>;

export type TextFieldOption = WidgetBaseOptions<FieldType.Text>;

export type CheckboxFieldOption = WidgetBaseOptions<FieldType.Checkbox, boolean>;

export type Vector3FieldOption = WidgetBaseOptions<FieldType.Vector3, Vector3Array>;

export type FileFieldOption = WidgetBaseOptions<FieldType.File, string>;

export type SelectionFieldOption = WidgetBaseOptions<FieldType.Select> & {
    selectOptions?: {
        value: string;
        name: string;
    }[];
};

/// ------------------- Widgets Dictionary -------------------- ///

/**
 * A dictionary containing informations about all widgets
 */
export type WidgetDictionary = Dictionary<WidgetDictionaryItem>;

/**
 * Informations of a widget
 */
export type WidgetDictionaryItem<Type extends WidgetType = WidgetType.GameObject> = Omit<
    WidgetModule<Type>,
    "reducer"
> & {
    id: string;
};

/// -------------- Serialized Widgets Dictionary -------------- ///

/**
 * A dictionary containing informations about all widgets
 */
export type SerializedWidgetDictionary = Dictionary<SerializedWidgetDictionaryItem>;

/**
 * Informations of a widget
 */
export type SerializedWidgetDictionaryItem = Omit<WidgetDictionaryItem, "component">;

/// ----------------- Widgets Info Dictionary ----------------- ///

/**
 * A dictionary containing editable informations about a WidgetObject
 */
export type WidgetInfoDictionary = Dictionary<WidgetInfoDictionaryItem>;

export type WidgetInfoDictionaryItem = {
    id: string;
    displayName?: string;
};

export type WidgetOptionsValues<TValue = string> = Dictionary<{
    fieldType: FieldType;
    value: TValue;
}>;
