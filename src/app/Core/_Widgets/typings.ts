import { FC } from "react";
import { AnyAction, Reducer } from "redux";
import { FeaturesWidgetsProps, FeaturesState } from "../../../Features/collector";
import { UnionOfProperties } from "../../Common/utils/typings";

/**
 * Allowed Fieldtypes
 */
export type FieldType = "Text" | "Select";

/**
 * Option for Select FieldType
 */
export interface SelectOptions {
    value: string;
    name: string;
}

/**
 * Base interface for option object.
 */
export interface WidgetBaseOptions {
    name: string;
    displayName: string;
    fieldType: FieldType;
    selectOptions?: SelectOptions[];
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
export interface IWidget {
    component: FC<FeaturesWidgetsProps>;
    reducer: Reducer<FeaturesUnionsTypes, AnyAction> | null;
    widgetDefinition: WidgetDefinition;
}
