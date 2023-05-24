import { Dictionary, UnionOfProperties, Vector3Array } from "@granity/helpers";
import { Slice } from "@reduxjs/toolkit";
import { FC, ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from "react";

import { FieldType } from "./widgetsConstants";

/// ---------------- Types for external typing ---------------- ///

/**
 * Additional props that applies for widgets in the editor
 */
export interface EditableWidget {
    position: Vector3Array;
    rotation: Vector3Array;
    scale: Vector3Array;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface WidgetProps extends EditableWidget {}
export type DefaultWidgetProps = UnionOfProperties<WidgetProps>;

/// -------------------------- Misc --------------------------- ///

export type HelpersTypes = {
    [key: string]: HelperTypeValue;
};

export type HelperTypeValue = string;

/// ---------------------- Widget Module ---------------------- ///

/**
 * Base widget type
 */
export type Widget<Props = DefaultWidgetProps, Ref = null, Options = WidgetOptions> = {
    component: WidgetComponent<Props, Ref>;
    reducer: Slice | null;
    name: string;
    options?: Options[];
};

export type WidgetModule<Props = DefaultWidgetProps, Ref = null, Options = WidgetOptions> = Widget<
    Props,
    Ref,
    Options
> & {
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
export type WidgetDictionaryItem = Omit<WidgetModule, "reducer"> & {
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
export type SerializedWidgetDictionaryItem = Omit<WidgetDictionaryItem, "component" | "gizmo"> & {
    gizmo: string;
};

/// ----------------- Widgets Info Dictionary ----------------- ///

export type BaseWidgetInfo = {
    id: string;
    displayName?: string;
};

/**
 * A dictionary containing editable informations about a WidgetObject
 */
export type WidgetInfoDictionary = Dictionary<WidgetInfoDictionaryItem>;

export type WidgetInfoDictionaryItem<TValue = string> = BaseWidgetInfo & {
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
