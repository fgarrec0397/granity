import { FC } from "react";
import { AnyAction, Reducer } from "redux";
import { Object3D } from "three";
import { FeaturesState, FeaturesWidgetsProps } from "../../Features/collector";
import { UnionOfProperties } from "../Common/utils/typings";

/**
 * useWidgetsActions hook type
 */
export type UseWidgetsHook<HookReturnType> = {
    // TODO -- fix this type that breaks Scene.tsx
    [property: string]:
        | HookReturnType
        | WidgetSceneObject[]
        | WidgetSceneObject
        | WidgetProperties
        | ((widget: WidgetSceneObject) => void)
        | ((id: string) => void)
        | ((widgetProperties: WidgetProperties, updateOnlyProperties?: boolean) => void)
        | ((mesh: Object3D | undefined, updateOnlyProperties?: boolean) => void)
        | ((widgetOptions: WidgetOptionsValues) => void)
        | ((mesh: Object3D) => void)
        | null;
};

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
export interface WidgetModule<Props = FeaturesWidgetsProps> {
    id?: string;
    component: FC<Props>;
    reducer: Reducer<FeaturesUnionsTypes, AnyAction> | null;
    widgetDefinition: WidgetDefinition;
}

/**
 * Informations of a widget object on the scene
 */
export type WidgetSceneObject = Omit<WidgetModule, "reducer">;

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
