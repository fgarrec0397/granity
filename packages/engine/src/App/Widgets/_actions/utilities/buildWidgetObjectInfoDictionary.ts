import { serializeVector3 } from "@granity/helpers";
import { Object3D } from "@granity/three";

import widgetsConstants from "../widgetsConstants";
import {
    SerializedWidgetObjectDictionaryItem,
    WidgetDictionary,
    WidgetDictionaryItem,
    WidgetObjectInfo,
    WidgetObjectInfoDictionary,
    WidgetOptionsValues,
    WidgetProperties,
} from "../widgetsTypes";

export type WidgetsDictionaryBuilderOptions = {
    mesh?: Object3D;
    properties?: WidgetProperties;
    options?: WidgetOptionsValues;
};

/**
 *
 * Builds a widgetsObjectInfoDictionary based on the given widgetsDictionary to fill the values
 *
 * @param widgets - The widgets taken to build the widgetsObjectInfoDictionary
 * @returns - A WidgetObjectInfoDictionary
 */
export const buildWidgetObjectInfoDictionary = (widgets: WidgetDictionary) => {
    const widgetsObjectInfoDictionary: WidgetObjectInfoDictionary = {};

    for (const key in widgets) {
        const dictionaryItem = buildWidgetObjectInfo(widgets[key]);

        widgetsObjectInfoDictionary[dictionaryItem.id] = {
            ...dictionaryItem,
        };
    }

    return widgetsObjectInfoDictionary;
};

/**
 *
 * Builds a widgetsObjectInfoDictionary based on the given widgetsDictionaryItem to fill the values
 *
 * @param widget - The taken widget to build the widgetObjectInfo
 * @param builderOptions - Overrides the widget options by passing your own options
 * @returns - A WidgetObjectInfo
 */
export const buildWidgetObjectInfo = (
    widget: WidgetDictionaryItem,
    builderOptions?: WidgetsDictionaryBuilderOptions
): WidgetObjectInfo => {
    const options = builderOptions?.options
        ? builderOptions?.options
        : buildWidgetInfoDictionaryOptions(widget);

    let widgetProperties: WidgetProperties = widgetsConstants.widgetDefaultProperties;

    if (builderOptions?.mesh) {
        widgetProperties = buildWidgetDictionaryProperties(builderOptions.mesh);
    }

    if (builderOptions?.properties) {
        widgetProperties = builderOptions.properties;
    }

    return { id: widget.id!, properties: widgetProperties, options, isVisible: true };
};

/**
 *
 * @param widget - The widget to build the options of the widgetsInfoDictionartItem
 * @returns - The options created from the given widget
 */
export const buildWidgetInfoDictionaryOptions = (
    widget: WidgetDictionaryItem | SerializedWidgetObjectDictionaryItem
) => {
    const options: WidgetOptionsValues<any> = {};
    const widgetOptions = widget.options;

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
