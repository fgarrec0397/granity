import { FC } from "react";
import { AnyAction, Reducer } from "redux";
import { FeaturesWidgetsProps, FeaturesState } from "../../Features/collector";
import { UnionOfProperties } from "../Common/utils/typings";

/**
 * Allowed Fieldtypes
 */
export enum FieldType {
    Text = "Text",
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
 * All Features reducers destructured as union types
 */
type FeaturesUnionsTypes = UnionOfProperties<FeaturesState>;

/**
 * Widget object that is exported from all widgets objects
 */
export interface IWidget<Props = FeaturesWidgetsProps> {
    id?: string;
    component: FC<Props>;
    reducer: Reducer<FeaturesUnionsTypes, AnyAction> | null;
    widgetDefinition: WidgetDefinition;
}

/**
 * Informations of a widget object on the scene
 */
export type WidgetSceneObject = Omit<IWidget, "reducer">;

export type WidgetsDictionary = {
    [id: string]: { properties: WidgetProperties; options: WidgetOptionsValues };
};

export type WidgetOptionsValues = {
    [name: string]: { fieldType: FieldType; value: WidgetOptionDefaultValue };
};

export type WidgetProperties = {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
};
