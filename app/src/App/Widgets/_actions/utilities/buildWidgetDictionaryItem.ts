import { serializeVector3 } from "@app/Common/utilities";
import { Object3D } from "three";

import {
    SerializedWidgetObjectDictionaryItem,
    WidgetDictionary,
    WidgetDictionaryItem,
    WidgetOptionsValues,
    WidgetProperties,
    WidgetsInfoDictionary,
    WidgetsInfoDictionaryItem,
} from "../widgetsTypes";

type WidgetsDictionaryBuilderOptions = {
    mesh?: Object3D;
    properties?: WidgetProperties;
    options?: WidgetOptionsValues;
};

// TODO - scalable widgets types - Review this entire file

export const buildWidgetsDictionary = (widgets: WidgetDictionary) => {
    const widgetsInfoDictionary: WidgetsInfoDictionary = {};

    for (const key in widgets) {
        const dictionaryItem = buildWidgetDictionaryItem(widgets[key]);

        widgetsInfoDictionary[dictionaryItem.id] = {
            id: dictionaryItem.id,
            properties: dictionaryItem.properties!,
            options: dictionaryItem.options!,
        };
    }

    return widgetsInfoDictionary;
};

export const buildWidgetDictionaryItem = (
    widget: WidgetDictionaryItem,
    builderOptions?: WidgetsDictionaryBuilderOptions
): WidgetsInfoDictionaryItem => {
    const options = builderOptions?.options
        ? builderOptions?.options
        : buildWidgetDictionaryOptions(widget);

    let widgetProperties: WidgetProperties | undefined = undefined;

    if (builderOptions?.mesh) {
        widgetProperties = buildWidgetDictionaryProperties(builderOptions.mesh);
    }

    if (builderOptions?.properties) {
        widgetProperties = builderOptions.properties;
    }

    return {
        id: widget.id!,
        options,
        ...(widgetProperties ? { properties: widgetProperties } : undefined), // TODO - scalable widgets types
    };
};

export const buildWidgetDictionaryOptions = (
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
