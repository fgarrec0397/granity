import { GameWidgetProperties } from "@engine/App/Game/_actions/gameTypes";
import { serializeVector3 } from "@granity/helpers";
import { Object3D } from "@granity/three";

import {
    SerializedWidgetDictionaryItem,
    WidgetDictionary,
    WidgetDictionaryItem,
    WidgetInfoDictionary,
    WidgetInfoDictionaryItem,
    WidgetOptionsValues,
} from "../widgetsTypes";

export type WidgetsDictionaryBuilderOptions = {
    mesh?: Object3D;
    properties?: GameWidgetProperties;
    options?: WidgetOptionsValues;
};

/**
 *
 * Builds a widgetsInfoDictionary based on the given widgetsDictionary to fill the values
 *
 * @param widgets - The widgets taken to build the widgetsInfoDictionary
 * @returns - A WidgetInfoDictionary
 */
export const buildWidgetInfoDictionary = <WidgetDictionaryType extends WidgetDictionary>(
    widgets: WidgetDictionaryType
) => {
    const widgetsInfoDictionary: WidgetInfoDictionary = {};

    for (const key in widgets) {
        const dictionaryItem = buildWidgetInfo(widgets[key]);

        widgetsInfoDictionary[dictionaryItem.id] = {
            ...dictionaryItem,
        };
    }

    return widgetsInfoDictionary;
};

/**
 *
 * Builds a widgetsInfoDictionary based on the given widgetsDictionaryItem to fill the values
 *
 * @param widget - The taken widget to build the widgetObjectInfo
 * @param builderOptions - Overrides the widget options by passing your own options
 * @returns - A WidgetInfoDictionaryItem
 */
export const buildWidgetInfo = <WidgetDictionaryItemType extends WidgetDictionaryItem>(
    widget: WidgetDictionaryItemType,
    builderOptions?: WidgetsDictionaryBuilderOptions
): WidgetInfoDictionaryItem => {
    const options = builderOptions?.options
        ? builderOptions?.options
        : buildWidgetInfoDictionaryOptions(widget);

    const displayName = widget.name;

    return { id: widget.id!, options, displayName, isVisible: true };
};

/**
 *
 * @param widget - The widget to build the options of the widgetsInfoDictionartItem
 * @returns - The options created from the given widget
 */
export const buildWidgetInfoDictionaryOptions = (
    widget: WidgetDictionaryItem | SerializedWidgetDictionaryItem
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
