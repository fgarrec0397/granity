import { Dictionary, UnionOfProperties } from "@granity/helpers";
import { Vector3Array } from "@react-three/rapier";
import { Slice } from "@reduxjs/toolkit";
import { FC, ForwardRefExoticComponent, PropsWithoutRef, ReactNode, RefAttributes } from "react";
import { Object3D } from "three";

import { FieldType, HelpersTypes, WidgetType } from "./widgetsConstants";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface WidgetProps {}

export type DefaultWidgetProps = UnionOfProperties<WidgetProps>;

/// ---------------------- Widget Module ---------------------- ///

/**
 * Base widget type
 */
export type Widget<Props = DefaultWidgetProps, Ref = null> = {
    component: WidgetComponent<Props, Ref>;
    reducer: Slice | null;
    name: string;
    options?: WidgetOptions[];
};

export type WidgetModules = WidgetObjectModule | WidgetUIModule;

/**
 * A component type of a widget
 */
export type WidgetComponent<Props = DefaultWidgetProps, Ref = null> =
    | FC<Props>
    | ForwardRefExoticComponent<PropsWithoutRef<Props> & RefAttributes<Ref>>;

/**
 * Option for Select FieldType
 */
export type SelectOptions = {
    value: string;
    name: string;
};

type WidgetAdditionnalOptions = WidgetSelectionOptions;

export type WidgetOptionDefaultValue = string | number | boolean; // TODO - Readjust that in order to match the field type

export type WidgetSelectionOptions = {
    selectOptions?: SelectOptions[];
};

/**
 * Base interface for option object.
 */
export type WidgetBaseOptions = WidgetAdditionnalOptions & {
    name: string;
    displayName: string;
    fieldType: FieldType;
    isVisible?: (options: WidgetBaseOptions[]) => boolean;
    defaultValue: WidgetOptionDefaultValue;
};

/**
 * All options allowed for the widget in the editor
 */
export type WidgetOptions = WidgetBaseOptions;

/// ---------------------- Widgets Dictionary ---------------------- ///

/**
 * A dictionary containing informations about all widgets
 */
export type WidgetDictionary<Props = DefaultWidgetProps> = Dictionary<WidgetDictionaryItem<Props>>;

/**
 * Informations of a widget
 */
export type WidgetDictionaryItem<Props = DefaultWidgetProps> =
    | WidgetObjectsDictionaryItem<Props>
    | WidgetUIDictionaryItem;

/// ---------------------- Widgets Dictionary ---------------------- ///

/**
 * A dictionary containing informations about all widgets
 */
export type SerializedWidgetDictionary<Props = DefaultWidgetProps> = Dictionary<
    SerializedWidgetDictionaryItem<Props>
>;

/**
 * Informations of a widget
 */
export type SerializedWidgetDictionaryItem<Props = DefaultWidgetProps> =
    | SerializedWidgetObjectDictionaryItem<Props>
    | SerializedWidgetUIDictionaryItem;

/// ---------------------- Widget Object Module ---------------------- ///

/**
 * A widget object that can be on the 3D scene.
 */
export type WidgetObjectModule<Props = DefaultWidgetProps, Ref = null> = Widget<Props, Ref> & {
    hasRef?: true;
    editorOptions?: WidgetObjectEditorOptions;
    type: WidgetType.GameObject;
};

/**
 * Widget options to set in the editor
 */
export type WidgetObjectEditorOptions = {
    helper?: HelpersTypes;
    meshHolder?: ReactNode | Object3D;
};

/// ---------------------- Widgets Object Dictionary ---------------------- ///

/**
 * A dictionary containing informations about all WidgetObjectsDictionary
 */
export type WidgetObjectsDictionary<Props = DefaultWidgetProps> = Dictionary<
    WidgetObjectsDictionaryItem<Props>
>;

/**
 * Informations of a widget object on the scene
 */
export type WidgetObjectsDictionaryItem<Props = DefaultWidgetProps> = Omit<
    WidgetObjectModule<Props>,
    "reducer"
> & {
    id: string;
};

/// ---------------------- Serialized Widgets Objects Dictionary ---------------------- ///

/**
 * A serialized dictionary containing informations about all WidgetObjectsDictionary
 */
export type SerializedWidgetObjectsDictionary<Props = DefaultWidgetProps> = Dictionary<
    SerializedWidgetObjectDictionaryItem<Props>
>;

/**
 * A serialized version of WidgetObjectsDictionaryItem type
 */
export type SerializedWidgetObjectDictionaryItem<Props = DefaultWidgetProps> = Omit<
    WidgetObjectsDictionaryItem<Props>,
    "component" | "meshHolder"
> & {
    meshHolder: string;
};

/// ---------------------- Widgets Info Dictionary ---------------------- ///

/**
 * A dictionary containing editable informations about all Widget types
 */
export type WidgetInfoDictionary = Dictionary<WidgetInfo>;

export type WidgetInfo = {
    id: string;
    displayName?: string;
};

/// ---------------------- Widgets Object Info Dictionary ---------------------- ///

/**
 * A dictionary containing editable informations about a WidgetObject
 */
export type WidgetObjectInfoDictionary = Dictionary<WidgetObjectInfo>;

export type WidgetObjectInfo = WidgetInfo & {
    properties?: WidgetProperties;
    options?: WidgetOptionsValues;
};

export type WidgetOptionsValues = Dictionary<{
    fieldType: FieldType;
    value: WidgetOptionDefaultValue;
}>;

export type WidgetProperties = {
    position: Vector3Array;
    rotation: Vector3Array;
    scale: Vector3Array;
};

/// ---------------------- Widgets UI Info Dictionary ---------------------- ///

export type WidgetUIInfoDictionary = Dictionary<WidgetUIInfo>;

export type WidgetUIInfo = WidgetInfo;

/// ---------------------- Widget UI Module ---------------------- ///

/**
 * Widget module to generate UI elements
 */
export type WidgetUIModule = Omit<Widget, "hasRef" | "editorOptions" | "type"> & {
    type: WidgetType.UI;
};

// /// ---------------------- Widget UI Dictionary ---------------------- ///

// /**
//  * A dictionary containing informations about all WidgetUIDictionaryItem
//  */
export type WidgetUIDictionary = Dictionary<WidgetUIDictionaryItem>;

// /**
//  * Informations of a UI widget
//  */
export type WidgetUIDictionaryItem = Omit<WidgetUIModule, "reducer"> & {
    id: string;
};

/// ---------------------- Serialized Widgets Objects Dictionary ---------------------- ///

/**
 * A serialized dictionary containing informations about all WidgetObjectsDictionary
 */
export type SerializedWidgetUIDictionary<Props = DefaultWidgetProps> = Dictionary<
    SerializedWidgetObjectDictionaryItem<Props>
>;

/**
 * A serialized version of WidgetObjectsDictionaryItem type
 */
export type SerializedWidgetUIDictionaryItem = Omit<
    WidgetUIDictionaryItem,
    "component" | "meshHolder"
>;
