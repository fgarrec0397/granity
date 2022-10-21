import { Dictionary } from "@app/Common/commonTypes";
import { FeaturesWidgetsProps } from "@features/Widgets";
import { Slice } from "@reduxjs/toolkit";
import { FC, ForwardRefExoticComponent, PropsWithoutRef, ReactNode, RefAttributes } from "react";
import { Object3D } from "three";

import { FieldType, HelpersTypes } from "./widgetsConstants";

/**
 * Option for Select FieldType
 */
export interface SelectOptions {
    value: string;
    name: string;
}

type WidgetAdditionnalOptions = WidgetSelectionOptions;

export type WidgetOptionDefaultValue = string | number | boolean; // TODO - Readjust that in order to match the field type

export interface WidgetSelectionOptions {
    selectOptions?: SelectOptions[];
}

/**
 * Base interface for option object.
 */
export interface WidgetBaseOptions extends WidgetAdditionnalOptions {
    name: string;
    displayName: string;
    fieldType: FieldType;
    isVisible?: (options: WidgetBaseOptions[]) => boolean;
    defaultValue: WidgetOptionDefaultValue;
}

/**
 * All options allowed for the widget in the editor
 */
export type WidgetOptions = WidgetBaseOptions;

/**
 * Widget object definition. This information is displayed in the editor
 */
export interface WidgetDefinition {
    name: string;
    options?: WidgetOptions[];
}

/**
 * Widget options to set in the editor
 */
export type WidgetEditorOptions = {
    helper?: HelpersTypes;
    meshHolder?: ReactNode | Object3D;
};

export type WidgetComponent<Props, Ref> =
    | FC<Props>
    | ForwardRefExoticComponent<PropsWithoutRef<Props> & RefAttributes<Ref>>;

/**
 * Widget object that is exported from all widgets objects
 */
export interface WidgetModule<Props = FeaturesWidgetsProps, Ref = null> {
    component: WidgetComponent<Props, Ref>;
    hasRef?: true;
    reducer: Slice | null;
    editorOptions?: WidgetEditorOptions;
    widgetDefinition: WidgetDefinition;
}

/**
 * Informations of a widget object on the scene
 */
export type WidgetObjectsDictionaryItem<Props = FeaturesWidgetsProps> = Omit<
    WidgetModule<Props>,
    "reducer"
> & {
    id: string;
};

/**
 * A dictionary containing informations about all WidgetObjectsDictionary
 */
export type WidgetObjectsDictionary<Props = FeaturesWidgetsProps> = Dictionary<
    WidgetObjectsDictionaryItem<Props>
>;

/**
 * A serialized dictionary containing informations about all WidgetObjectsDictionary
 */
export type SerializedWidgetObjects<Props = FeaturesWidgetsProps> = Dictionary<
    SerializedWidgetSceneObject<Props>
>;

/**
 * A serialized version of WidgetObjectsDictionaryItem type
 */
export type SerializedWidgetSceneObject<Props = FeaturesWidgetsProps> = Omit<
    WidgetObjectsDictionaryItem<Props>,
    "component" | "meshHolder"
> & {
    meshHolder: string;
};

/**
 * A dictionary containing editable informations about a WidgetObjectsDictionaryItem
 */
export type WidgetsInfoDictionary = Dictionary<WidgetsInfoDictionaryItem>;

export type WidgetOptionsValues = Dictionary<{
    fieldType: FieldType;
    value: WidgetOptionDefaultValue;
}>;

export type WidgetsInfoDictionaryItem = {
    id: string;
    properties?: WidgetProperties;
    options?: WidgetOptionsValues;
};

export type WidgetProperties = {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
};
