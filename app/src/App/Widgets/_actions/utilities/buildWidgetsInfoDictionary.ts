import { serializeVector3 } from "@app/Common/utilities";
import { Object3D } from "three";

import widgetsConstants from "../widgetsConstants";
import {
    SerializedWidgetObjectDictionaryItem,
    WidgetDictionary,
    WidgetDictionaryItem,
    WidgetOptionsValues,
    WidgetProperties,
    WidgetsInfoDictionary,
    WidgetsInfoDictionaryItem,
} from "../widgetsTypes";

export type WidgetsDictionaryBuilderOptions = {
    mesh?: Object3D;
    properties?: WidgetProperties;
    options?: WidgetOptionsValues;
};

/**
 *
 * Builds a widgetsInfoDictionary based on the given widgetsDictionary to fill the values
 *
 * @param widgets - The widgets taken to build the widgetsInfoDictionary
 * @returns - A WidgetsInfoDictionary
 */
export const buildWidgetsInfoDictionary = (widgets: WidgetDictionary) => {
    const widgetsInfoDictionary: WidgetsInfoDictionary = {};

    for (const key in widgets) {
        const dictionaryItem = buildWidgetInfoDictionaryItem(widgets[key]);

        widgetsInfoDictionary[dictionaryItem.id] = {
            id: dictionaryItem.id,
            properties: dictionaryItem.properties!,
            options: dictionaryItem.options!,
        };
    }

    return widgetsInfoDictionary;
};

/**
 *
 * Builds a widgetsInfoDictionary based on the given widgetsDictionaryItem to fill the values
 *
 * @param widget - The taken widget to build the widgetsInfoDictionaryItem
 * @param builderOptions - Overrides the widget options by passing your own options
 * @returns - A WidgetsInfoDictionaryItem
 */
export const buildWidgetInfoDictionaryItem = (
    widget: WidgetDictionaryItem,
    builderOptions?: WidgetsDictionaryBuilderOptions
): WidgetsInfoDictionaryItem => {
    const options = builderOptions?.options
        ? builderOptions?.options
        : buildWidgetInfoDictionaryOptions(widget);

    let widgetProperties: WidgetProperties = widgetsConstants.widgetDefaultProperties;

    // TODO - see if this is still used
    if (builderOptions?.mesh) {
        widgetProperties = buildWidgetDictionaryProperties(builderOptions.mesh);
    }

    if (builderOptions?.properties) {
        widgetProperties = builderOptions.properties;
    }

    return { id: widget.id!, properties: widgetProperties, options };
};

/**
 *
 * @param widget - The widget to build the options of the widgetsInfoDictionartItem
 * @returns - The options created from the given widget
 */
export const buildWidgetInfoDictionaryOptions = (
    widget: WidgetDictionaryItem | SerializedWidgetObjectDictionaryItem
) => {
    const options: WidgetOptionsValues = {};
    const widgetOptions = widget.widgetDefinition.options;

    if (widgetOptions?.length) {
        for (const option of widgetOptions) {
            options[option.name] = {
                fieldType: option.fieldType,
                value: option.defaultValue,
            };
        }
    }

    return options;
};

export const buildWidgetDictionaryProperties = (mesh: Object3D) => {
    return {
        position: serializeVector3(mesh.position),
        rotation: serializeVector3(mesh.rotation),
        scale: serializeVector3(mesh.scale),
    };
};
