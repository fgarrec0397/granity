import { serializeVector3 } from "@app/Common/utilities";
import { Object3D } from "three";

import widgetsConstants from "../widgetsConstants";
import {
    SerializedWidgetSceneObject,
    WidgetObjects,
    WidgetOptionsValues,
    WidgetProperties,
    WidgetSceneObject,
    WidgetsDictionary,
    WidgetsDictionaryItem,
} from "../widgetsTypes";

type WidgetsDictionaryBuilderOptions = {
    mesh?: Object3D;
    properties?: WidgetProperties;
    options?: WidgetOptionsValues;
};

export const buildWidgetsDictionary = (widgets: WidgetObjects) => {
    const widgetsDictionary: WidgetsDictionary = {};

    for (const key in widgets) {
        const dictionaryItem = buildWidgetDictionaryItem(widgets[key]);

        widgetsDictionary[dictionaryItem.id] = {
            properties: dictionaryItem.properties!,
            options: dictionaryItem.options!,
        };
    }

    return widgetsDictionary;
};

export const buildWidgetDictionaryItem = (
    widget: WidgetSceneObject,
    builderOptions?: WidgetsDictionaryBuilderOptions
): WidgetsDictionaryItem => {
    const options = builderOptions?.options
        ? builderOptions?.options
        : buildWidgetDictionaryOptions(widget);

    let widgetProperties: WidgetProperties = widgetsConstants.widgetDefaultProperties;

    if (builderOptions?.mesh) {
        widgetProperties = buildWidgetDictionaryProperties(builderOptions.mesh);
    }

    if (builderOptions?.properties) {
        widgetProperties = builderOptions.properties;
    }

    return { id: widget.id!, properties: widgetProperties, options };
};

export const buildWidgetDictionaryOptions = (
    widget: WidgetSceneObject | SerializedWidgetSceneObject
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
