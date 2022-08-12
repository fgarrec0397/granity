import { UnionOfProperties } from "@common/commonTypes";
import { FeaturesState, FeaturesWidgetsProps } from "@features/collector";
import { FC, ReactNode } from "react";
import { AnyAction, Reducer } from "redux";
import { Object3D } from "three";

/**
 * Allowed Fieldtypes
 */
export enum FieldType {
    Text = "Text",
    Number = "Number",
    Select = "Select",
}

/**
 * Option for Select FieldType
 */
export interface SelectOptions {
    value: string;
    name: string;
}

type WidgetAdditionnalOptions = WidgetSelectionOptions;

export type WidgetOptionDefaultValue = string | number; // TODO - Readjust that in order to match the field type

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
    meshHolder?: ReactNode | Object3D;
};

/**
 * All Features reducers destructured as union types
 */
type FeaturesUnionsTypes = UnionOfProperties<FeaturesState>;

/**
 * Widget object that is exported from all widgets objects
 */
export interface WidgetModule<Props = FeaturesWidgetsProps> {
    component: FC<Props>;
    reducer: Reducer<FeaturesUnionsTypes, AnyAction> | null;
    editorOptions?: WidgetEditorOptions;
    widgetDefinition: WidgetDefinition;
}

/**
 * Informations of a widget object on the scene
 */
export type WidgetSceneObject<Props = FeaturesWidgetsProps> = Omit<
    WidgetModule<Props>,
    "reducer"
> & {
    id: string;
};

/**
 * A dictionary containing informations about all WidgetObjects
 */
export type WidgetObjects<Props = FeaturesWidgetsProps> = {
    [id: string]: WidgetSceneObject<Props>;
};

/**
 * A serialized dictionary containing informations about all WidgetObjects
 */
export type SerializedWidgetObjects<Props = FeaturesWidgetsProps> = {
    [id: string]: SerializedWidgetSceneObject<Props>;
};

/**
 * A serialized version of WidgetSceneObject type
 */
export type SerializedWidgetSceneObject<Props = FeaturesWidgetsProps> = Omit<
    WidgetSceneObject<Props>,
    "component" | "meshHolder"
> & {
    meshHolder: string;
};

/**
 * A dictionary containing editable informations about a WidgetSceneObject
 */
export type WidgetsDictionary = {
    [id: string]: { properties: WidgetProperties; options: WidgetOptionsValues };
};

export type WidgetOptionsValues = {
    [name: string]: { fieldType: FieldType; value: WidgetOptionDefaultValue };
};

export type WidgetsDictionaryItem = {
    id: string;
    properties?: WidgetProperties;
    options?: WidgetOptionsValues;
};

export type WidgetProperties = {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
};
